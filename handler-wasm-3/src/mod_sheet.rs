use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::{future_to_promise, spawn_local};
use serde::{Serialize, Deserialize};
use reqwest::Error;
use js_sys::Promise;
use std::io::Read;

#[derive(Serialize, Deserialize)]
struct GenericResponse {
    ret: u16,
    data: String,
}

/**
*
* @param
*
* @return
*/
pub async fn get_sheet_list_handler(pathname: &str) -> String {
    println!("get_sheet_list_handler.path= {}", pathname);
    let url = "https://kuc-arc-f.com/";
    let client = reqwest::Client::new();
    let response = client.get(url).send().await;
    println!("response: {:?}", response);

    let data = GenericResponse {
        data: "get_sheet_list_handler".to_string(),
        ret: 200,
    };
    serde_json::to_string(&data).unwrap()
}
