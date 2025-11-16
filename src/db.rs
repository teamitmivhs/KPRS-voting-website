use sqlx::{FromRow, Pool, Postgres};

#[derive(FromRow)]
pub struct User {
    pub token: String,
    pub name: String,
}

pub async fn get_all_users(pool: &Pool<Postgres>) -> sqlx::Result<Vec<User>> {
      sqlx::query_as::<_, User>(
          "SELECT token, name FROM voters"
      )
      .fetch_all(pool)
      .await
}

pub async fn get_user_by_token(pool: &Pool<Postgres>, token: String) -> sqlx::Result<User> {
    sqlx::query_as::<_, User>(
        "SELECT token, name FROM voters WHERE token = $1"
    )
    .bind(token)
    .fetch_one(pool)
    .await
}
