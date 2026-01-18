use std::{collections::HashMap, sync::Arc};

use actix_web::{HttpRequest, HttpResponse, get, web};
use actix_ws::handle;
use futures_util::StreamExt;
use surrealdb::Uuid;
use tokio::sync::RwLock;

use crate::{data::live_clients::get_live_clients, util::{log_something, verify_admin_token}};

#[get("/ws/votes")]
pub async fn ws_handler(req: HttpRequest, body: web::Payload) -> actix_web::Result<HttpResponse> {
    // Verify admin
    let admin_cookie = req.cookie("admin_session_token");
    let admin_cookie: String = match admin_cookie {
        Some(cookie) => cookie.value().to_string(),
        None => {
            return Ok(HttpResponse::Unauthorized().finish());
        }
    };
    log_something("DEBUG", format!("Admin: {}", admin_cookie).as_str());
    let admin_data = verify_admin_token(admin_cookie.as_str()).await;
    if let Err(response) = admin_data {
        return Ok(response);
    }

    // Handle Websocket connection
    let (response, mut session, mut msg_stream) = handle(&req, body)?;

    let client_id: String = Uuid::new_v4().to_string();
    {
        let live_clients: Arc<RwLock<HashMap<String, actix_ws::Session>>> = get_live_clients();
        let mut locked_write_live_clients = live_clients.write().await;
        if locked_write_live_clients.len() > 5 {
            return Ok(HttpResponse::TooManyRequests().finish());
        }
        locked_write_live_clients.insert(client_id.clone(), session.clone());
    }

    // Handle messages
    actix_web::rt::spawn(async move {
        while let Some(Ok(msg)) = msg_stream.next().await {
            match msg {
                actix_ws::Message::Ping(bytes) => {
                    let _ = session.pong(&bytes).await;
                }
                _ => (),
            }
        }

        let live_clients: Arc<RwLock<HashMap<String, actix_ws::Session>>> = get_live_clients();
        let mut locked_write_live_clients = live_clients.write().await;
        log_something("DEBUG", "WELLL");
        locked_write_live_clients.remove(&client_id);
    });

    Ok(response)
}
