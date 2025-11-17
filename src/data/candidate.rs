use tokio::sync::OnceCell;
use sqlx::{Pool, Postgres};

use crate::{db::get_all_candidates, util::log_something};


pub static CANDIDATES_DATA: OnceCell<Vec<String>> = OnceCell::const_new();

pub async fn get_candidates_data<'a>() -> &'a Vec<String> {
      let data = CANDIDATES_DATA.get_or_init(async || {
            // Get the database URL from environment variable
            let database_url: String = std::env::var("DATABASE_URL")
              .expect("DATABASE_URL must be set");
      
            // Get the pool to the database
            let pool: Pool<Postgres> = sqlx::postgres::PgPoolOptions::new()
                  .max_connections(10)
                  .connect(&database_url)
                  .await
                  .unwrap();

                  
            // Get the candidate data
            let db_all_candidates = get_all_candidates(&pool).await.unwrap();


            // Create a variable that can hold the data
            let mut candidates_data: Vec<String> = Vec::new();
            
            // Iterate each candidate in database
            for db_candidate in db_all_candidates {
                  candidates_data.push(db_candidate.name);
            }
      

            // Log the success message
            log_something("StaticData", "Static candidates data successfully initialized.");

            // Return the result
            candidates_data
      }).await;

      return &data;
}