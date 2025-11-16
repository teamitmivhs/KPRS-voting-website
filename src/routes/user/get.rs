use actix_web::{HttpResponse, Responder, cookie::Cookie, post, web};
use redis::{AsyncCommands, RedisError};
use serde::Deserialize;
use deadpool_redis::Pool as RedisPool;
use crate::{data::user::USERS_DATA, util::log_error};

#[derive(Deserialize)]
struct UserData {
      fullname: String,
      token: String
}

#[post("/user/get")]
pub async fn post(pool: web::Data<RedisPool>, data: web::Json<UserData>) -> impl Responder {      
      // Get the targetted user data token
      let data = data.into_inner();
      let target_user_fullname = data.fullname;
      let target_user_token = data.token;
      
      // Check in the users hashmap
      let data_user_token = USERS_DATA.get(&target_user_fullname);
      let data_user_token = match data_user_token {
            Some(data) => data,
            None => {
                  return HttpResponse::NotFound();
            }
      };
      
      // Check in the Redis if the token is resetted
      let mut redis_connection = pool.get().await.unwrap();
      let redis_user_token_result: Result<Option<String>, RedisError> = redis_connection.hget("token_reset", target_user_fullname).await;
      let redis_user_token_maybe = match redis_user_token_result {
            Ok(data) => data,
            Err(err) => {
                  log_error("UserGet", err.to_string().as_str());
                  return HttpResponse::InternalServerError();
            }
      };

      // Check for token in Redis
      if let Some(redis_user_token) = &redis_user_token_maybe && &target_user_token != redis_user_token {
            return HttpResponse::Unauthorized();
      }
      
      // If there's no targetted user token in redis check with the default data user token
      if redis_user_token_maybe.is_none() && &target_user_token != data_user_token { 
            return HttpResponse::Unauthorized();
      }

      
      // Create response object and add cookie 
      let cookie_user_token = Cookie::build("user_token", target_user_token)
            .path("/")
            .secure(true)
            .http_only(true)
            .finish();


      // Return the response
      HttpResponse::Ok()
                  .cookie(cookie_user_token)
                  .take()
}