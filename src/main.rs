use actix_web::{App, HttpServer, middleware::from_fn, web};
use kprs_web_api::{data::user::get_users_data, middleware::middleware, routes::user::{user_get_api, user_reset_api, user_vote_api}, util::log_something};
use deadpool_redis::{Config as RedisConfig, Runtime as RedisRuntime};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Setup dotenv
    dotenvy::dotenv().unwrap();
    
    // Setup Static Data
    get_users_data().await;

    
    // Setup Redis
    let redis_configuration: RedisConfig = RedisConfig {
        url: Some(String::from("redis://127.0.0.1/")),
        connection: None,
        ..Default::default()
    };

    let redis_pool = redis_configuration.create_pool(Some(RedisRuntime::Tokio1)).unwrap();

    // Setup HTTP Server
    log_something("Setup", "Starting...");
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(redis_pool.clone()))
            .wrap(from_fn(middleware))
            .service(user_get_api)
            .service(user_reset_api)
            .service(user_vote_api)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
