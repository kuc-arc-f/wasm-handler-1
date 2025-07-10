use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::{future_to_promise, spawn_local};
use serde::{Serialize, Deserialize};
//use js_sys::Promise;
//use reqwest::Error;
//use std::collections::HashMap;

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
pub fn greet_async(name: String) -> js_sys::Promise {
    // future_to_promise は Rust の Future を JavaScript の Promise に変換します。
    future_to_promise(async move {
        // 結果の文字列を作成
        let result = format!("Hello from Rust (async), {}!", name);

        // 結果をJsValueに変換して返す
        // OkはPromiseのresolve、ErrはPromiseのrejectに対応します。
        Ok(JsValue::from_str(&result))
    })
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
#[wasm_bindgen]
pub fn hoge(name: &str) -> String {
    println!("path= {}", name);
    format!("hoge= {}!", name)
}

/**
*
* @param
*
* @return
*/
#[wasm_bindgen]
pub fn get_handler(pathname: String, apikey: String, sheet_id: String) -> js_sys::Promise {
    future_to_promise(async move {
        let mut ret = "";
        println!("path= {}", pathname);
        if pathname == "/foo" {
            let r1 = get_foo_handler(&pathname);
            ret = &r1;
            println!("ret= {}", ret);
            return Ok(JsValue::from_str(&ret))
        }
        if pathname == "/bar" {
            let r1 = get_bar_handler(&pathname);
            ret = &r1;
            return Ok(JsValue::from_str(&ret))
        }
        if pathname == "/get_sheet_list" {
            println!("get_sheet_list_handler.path= {}", pathname);
            let urlparam3 = "/values/シート1!A1:C100?key=";
            let urlparam4 = apikey;
            let url = format!("{}{}{}{}", "https://sheets.googleapis.com/v4/spreadsheets/", sheet_id, urlparam3, urlparam4);
            let resp = reqwest::get(url)
            .await?
            .text()
            .await?;
            //.json::<HashMap<String, String>>()
            //.await?;
            let data = GenericResponse {
                data: resp.to_string(),
                ret: 200,
            };
            let out = serde_json::to_string(&data).unwrap();
            return Ok(JsValue::from_str(&out))
        }
        let data = GenericResponse {
            data: "NOT FOUND".to_string(),
            ret: 404,
        };
        let out = serde_json::to_string(&data).unwrap();
        Ok(JsValue::from_str(&out))
    })
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

