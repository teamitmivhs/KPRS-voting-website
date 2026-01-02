use actix_web::{HttpRequest, HttpResponse, get, web};
use deadpool_redis::Pool as RedisPool;

use crate::{
    data::candidate::get_candidates_data,
    db::{Campus, Candidate},
    util::verify_voter_token,
};

#[get("/voter/candidate")]
pub async fn get(req: HttpRequest, redis_pool: web::Data<RedisPool>) -> HttpResponse {
    // Get admin or voter token from request cookie
    let voter_token = req.cookie("voter_token");
    let voter_token: String = match voter_token {
        Some(token) => token.value().to_string(),
        None => {
            return HttpResponse::Unauthorized().finish();
        }
    };

    // Verify voter token
    let voter_campus: Campus = match verify_voter_token(voter_token.as_str(), &redis_pool).await {
        Ok(data) => data.campus,
        Err(response) => {
            return response;
        }
    };

    // Get the candidate data
    let mut result_candidate_data: Vec<Candidate> = Vec::new();
    let static_candidate_data: &Vec<Candidate> = get_candidates_data().await;

    for candidate_data in static_candidate_data {
        if candidate_data.campus == voter_campus {
            result_candidate_data.push(candidate_data.clone());
        }
    }

    // Return the candidates data
    HttpResponse::Ok().json(result_candidate_data)
}
