use crate::{
    data::voter::get_voters_data,
    db::Voter,
    util::{log_error, log_something},
};
use actix_web::{HttpResponse, cookie::Cookie, post, web};
use serde::Deserialize;

#[derive(Deserialize)]
struct UserData {
    fullname: String,
    token: String,
}

#[post("/voter/get")]
pub async fn post(data: web::Json<UserData>) -> HttpResponse {
    // Get the targetted user data token
    let data = data.into_inner();
    let target_user_fullname = data.fullname;
    let target_user_token = data.token;

    // Check in the users hashmap
    let static_voters_data = get_voters_data();
    let locked_static_voters_data = static_voters_data.read().await;
    let static_voter_data = locked_static_voters_data.get(&target_user_fullname);
    let static_voter_data = match static_voter_data {
        Some(data) => data,
        None => {
            return HttpResponse::NotFound().finish();
        }
    };

    // Verify the token
    let target_voter_data: Option<Voter> = (|target_user_token: &String| {
        for voter_data in static_voter_data {
            if &voter_data.token == target_user_token {
                return Some(voter_data.clone());
            }
        }
        None
    })(&target_user_token);

    if target_voter_data.is_none() {
        return HttpResponse::Unauthorized().finish();
    }

    // Create response object and add cookie
    let cookie_user_token = Cookie::build("voter_token", target_user_token)
        .path("/")
        .secure(true)
        .http_only(true)
        .finish();

    // Return the response
    HttpResponse::Ok()
        .cookie(cookie_user_token)
        .json(target_voter_data)
}
