use actix_web::HttpResponse;
use time::{OffsetDateTime, macros::{format_description, offset}};
use rand::Rng;

use crate::{data::{admin::get_all_admin_data, voter::get_voters_data}, db::{Admin, Voter}};

static DATETIME_FMT: &[time::format_description::FormatItem<'static>] = format_description!("[hour]:[minute]:[second]");

pub fn get_time() -> String {
      let utc = OffsetDateTime::now_utc();
      let result_time = utc.to_offset(offset!(+7)).format(DATETIME_FMT);

      match result_time {
            Ok(data) => data.to_string(),
            Err(err) => {
                  log_error("Util", format!("There's an error when get the current time. Error: {}", err.to_string()).as_str());
                  String::from("--:--:--")
            }
      }
}

pub fn log_something(scope_title: &str, message: &str) {
      println!("[{}] [{}] {}", get_time(), scope_title, message);
}

pub fn log_error(scope_title: &str, message: &str) {
      println!("[{}] [ERROR] [{}] {}", get_time(), scope_title, message);
}

static TOKEN_LENGTH: usize = 5;

pub fn generate_token() -> String {
      let mut result: String = String::new();
      let mut rng = rand::rng();

      // Iterate for each characters
      // for i in 65..(65+52) {
      //       if i > 25 { i += 6; }

      // }
      for i in 0..=(TOKEN_LENGTH) {
            let mut random_index = rng.random_range(65..(65+52));
            if random_index > 90 { random_index += 6; }

            if let Some(data) = char::from_u32(random_index) {
                  result.insert(i, data);
            }
            else {
                  result.insert(i, 'A');
            }
      }

      result
}
pub async fn verify_voter_token<T: AsRef<str>>(target_user_token: T) -> Result<Voter, HttpResponse> {
      let target_user_token: &str = target_user_token.as_ref();

      // Verify the token from checking into the redis database
      let static_voter_data_maybe: Option<Voter> = (async ||{
        let static_voters_data = get_voters_data();
        let locked_static_voters_data = static_voters_data.read().await;
        for voter_list in locked_static_voters_data.iter() {
                let voter_data_maybe = voter_list.1.iter().find(|data| data.token.as_str() == target_user_token);
                match voter_data_maybe {
                        Some(data) => {
                                return Some(data.clone())
                        },
                        None => ()
                }
        }
        None
      })().await;

      // Verify the token
      let target_voter_data: Voter = match static_voter_data_maybe {
              Some(voter_data) => voter_data,
              None => {
                    log_error("PostVote", "There's no voter data from either Static data and Redis data but the condition passes!");
                    return Err(HttpResponse::Unauthorized().finish());
              }
      };

      Ok(target_voter_data)
}

pub async fn verify_admin_token<T: AsRef<str>>(target_admin_token: T) -> Result<Admin, HttpResponse> {
      // Get the static admin token
      let target_admin_token: &str = target_admin_token.as_ref();
      let static_admin_data = get_all_admin_data();
      let locked_static_admin_data = static_admin_data.read().await;
      let admin_data: Option<&Admin> = locked_static_admin_data.iter().find(|data| {
            match &data.1.admin_session_token {
                  Some(token) => {
                        token.as_str() == target_admin_token
                  },
                  None => {
                        return false;
                  }
            }
      }).map(|data| data.1);


      match admin_data {
            Some(data) => Ok(data.clone()),
            None => Err(HttpResponse::Unauthorized().finish())
      }
}
