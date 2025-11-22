use dashmap::DashMap;
use tokio::sync::OnceCell;
use sqlx::{Pool, Postgres};

use crate::{db::get_all_users, util::{log_error, log_something}};


pub static USERS_DATA: OnceCell<DashMap<String, String>> = OnceCell::const_new();

pub async fn get_voters_data<'a>() -> &'a DashMap<String, String> {
      let data = USERS_DATA.get_or_init(async || {
            // Get the database URL from environment variable
            let database_url: String = std::env::var("DATABASE_URL")
              .expect("DATABASE_URL must be set");
      
            // Get the pool to the database
            let pool: Result<Pool<Postgres>, sqlx::Error> = sqlx::postgres::PgPoolOptions::new()
                  .max_connections(10)
                  .connect(&database_url)
                  .await;
            let pool = match pool {
                  Ok(pool_obj) => pool_obj,
                  Err(err) => {
                        log_error("StaticData", format!("There's an error when getting pool from postgres. Error: {}", err.to_string()).as_str());
                        return DashMap::new();
                  }
            };

                  
            // Get the user data
            let db_all_users = get_all_users(&pool).await;
            let db_all_users = match db_all_users {
                  Ok(data) => data,
                  Err(err) => {
                        log_error("StaticData", format!("There's an error when trying to get all voters from postgres. Error: {}", err.to_string()).as_str());
                        return DashMap::new();
                  }
            };


            // Create a variable that can hold the data
            let users_data: DashMap<String, String> = DashMap::new();
            
            // Iterate each users in database
            for db_user in db_all_users {
                  users_data.insert(db_user.name, db_user.token);
            }
      

            // Log the success message
            log_something("StaticData", "Static users data successfully initialized.");

            // Return the result
            users_data
      }).await;

      return &data;
}