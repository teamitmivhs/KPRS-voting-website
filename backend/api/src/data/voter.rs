use std::{collections::HashMap, sync::Arc};
use once_cell::sync::Lazy;
use tokio::sync::RwLock;

use crate::{db::{Voter, get_all_users}, util::{log_error, log_something}};


static USERS_DATA: Lazy<Arc<RwLock<HashMap<String, Vec<Voter>>>>> = Lazy::new(|| {
      Arc::new(RwLock::new(HashMap::new()))
});

pub async fn update_voters_data() {
      // Get the user data
      let db_all_users = get_all_users().await;
      let db_all_users = match db_all_users {
            Ok(data) => data,
            Err(err) => {
                  log_error("StaticData", format!("There's an error when trying to get all voters from postgres. Error: {}", err.to_string()).as_str());
                  return;
            }
      };

      let total_voters_data: usize = db_all_users.len();

      // Update the static users data
      {
            let mut locked_users_data = USERS_DATA.write().await;
            for db_user in db_all_users {
                  locked_users_data.entry(db_user.name.clone())
                          .and_modify(|data| {
                                  data.push(db_user.clone());
                          })
                          .or_insert(vec![db_user.clone()]);
            }
      }

      // Log the success message
      log_something("StaticData", format!("Static voters data successfully updated! [{} total of voters data!]", total_voters_data).as_str());
}

pub fn get_voters_data() -> Arc<RwLock<HashMap<String, Vec<Voter>>>> {
      USERS_DATA.clone()
}

pub async fn init_voters_data() {
      update_voters_data().await;
}
