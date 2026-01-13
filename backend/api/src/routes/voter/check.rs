use actix_web::{HttpRequest, HttpResponse, post};

use crate::{util::verify_voter_token};


#[post("/voter/check")]
pub async fn post(req: HttpRequest) -> HttpResponse {
      // Get the user token from request cookies
      let cookie_user_token = req.cookie("voter_token");
      let cookie_user_token = match cookie_user_token {
          Some(data) => data.value().to_string(),
          None => {
              return HttpResponse::Unauthorized().finish();
          }
      };


      // Verify the token from checking into the Redis database
      let _ = match verify_voter_token(cookie_user_token.as_str()).await {
            Ok(_) => (),
            Err(response) => {
                  return response;
            }
      };


      HttpResponse::Ok().finish()
}
