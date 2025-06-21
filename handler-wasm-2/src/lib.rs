use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct MyData {
    data: String,
    ret: i32,
}
#[derive(Serialize, Deserialize)]
struct GenericResponse {
    ret: u16,
    data: String,
}


#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn get_handler(pathname: &str) -> String {
    println!("path= {}", pathname);
    let mut ret = "";
    if pathname == "/foo" {
        let r1 = get_foo_handler(pathname);
        ret = &r1;
        return ret.to_string();
    }
    if pathname == "/bar" {
        let r1 = get_bar_handler(pathname);
        ret = &r1;
        return ret.to_string();
    }
    let data = GenericResponse {
        data: "NOT FOUND".to_string(),
        ret: 404,
    };
    serde_json::to_string(&data).unwrap()
}

pub fn get_foo_handler(pathname: &str) -> String {
    println!("get_foo_test.path={}", pathname);
    let data = GenericResponse {
        data: "get_foo_handler".to_string(),
        ret: 200,
    };
    serde_json::to_string(&data).unwrap()
}

pub fn get_bar_handler(pathname: &str) -> String {
    println!("get_bar_handler.path= {}", pathname);
    let data = GenericResponse {
        data: "get_bar_handler".to_string(),
        ret: 200,
    };
    serde_json::to_string(&data).unwrap()
}

