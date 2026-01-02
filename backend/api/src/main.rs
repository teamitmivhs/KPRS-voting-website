use actix_cors::Cors;
use actix_web::{App, HttpServer, http, middleware::from_fn, web};
use deadpool_redis::{Config as RedisConfig, Runtime as RedisRuntime};
use kprs_web_api::{
    data::{
        admin::init_admin_data, candidate::init_candidates_data, vote::init_votes_count,
        voter::init_voters_data,
    },
    db::init_db,
    middleware::middleware,
    routes::{
        admin::{
            admin_check_api, admin_login_api, admin_reset_api, admin_token_api, admin_votes_api,
            admin_votes_simple_api,
        }, candidate::candidate_get_api, voter::{voter_check_api, voter_get_api, voter_logout_api, voter_vote_api}, ws::live_votes_data
    },
    util::log_something,
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Setup dotenv (used for development, use docker env for production)
    // dotenvy::from_filename("../.env").unwrap();
    // dotenvy::dotenv().unwrap();

    // Setup SurrealDB
    init_db().await;

    // Setup Static Data
    init_voters_data().await;
    init_votes_count().await;
    init_candidates_data().await;
    init_admin_data().await;

    // Setup Redis
    let redis_url: String = std::env::var("SERVER_REDIS_URL").unwrap();

    let redis_configuration: RedisConfig = RedisConfig {
        url: Some(redis_url),
        connection: None,
        ..Default::default()
    };

    let redis_pool = redis_configuration
        .create_pool(Some(RedisRuntime::Tokio1))
        .unwrap();

    // Setup HTTP Server
    let server_port: u16 = std::env::var("SERVER_PORT")
        .unwrap()
        .parse::<u16>()
        .unwrap();
    let server_host: String = std::env::var("SERVER_HOST").unwrap().to_string();
    let allowed_origin: String = std::env::var("SERVER_ALLOWED_ORIGIN").unwrap().to_string();

    log_something("DEBUG", allowed_origin.as_str());
    log_something("Setup", "Server Start!");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(allowed_origin.as_str())
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::CONTENT_TYPE, http::header::COOKIE])
            .supports_credentials()
            .max_age(3600);

        App::new()
            // State
            .app_data(web::Data::new(redis_pool.clone()))

            // Middleware
            .wrap(from_fn(middleware))
            .wrap(cors)

            // Voter related API
            .service(voter_get_api)
            .service(voter_vote_api)
            .service(voter_logout_api)
            .service(voter_check_api)

            // Admin related API
            .service(admin_login_api)
            .service(admin_reset_api)
            .service(admin_token_api)
            .service(admin_votes_api)
            .service(admin_votes_simple_api)
            .service(admin_check_api)

            // Candidate related API
            .service(candidate_get_api)

            // WebSocket live connectio
            .service(live_votes_data)
    })
    .bind((server_host.as_str(), server_port))?
    .run()
    .await
}
