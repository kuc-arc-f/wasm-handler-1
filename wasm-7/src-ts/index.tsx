const express = require('express');
import { renderToString } from 'react-dom/server';
import Top from './Top';
require('dotenv').config()

const app = express();

// POST の JSON を読み取る
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//console.log(process.env)

// wasm モジュールを読み込み
const wasm = require('../pkg/wasm_module'); // wasm-pack の出力を参照

app.post('/api/get_send', async (req, res) => {
  try{  
    console.log("path=", req.path);
    const body = req.body;
    console.log(body)
    const url = process.env.EXTERNAL_API_URL + body.external_api_path;
    console.log("url=", url);
    const message = await wasm.get_external_api(url);
    const obj = JSON.parse(message)
    //console.log(obj);
    if(typeof obj === "object"){
      const dataObj = JSON.parse(obj.body);
      if(obj.status !== 200){
        throw new Error("response error");
      }
      return res.json({ret: 200, data: dataObj});
    }
    res.send({ message });
  }catch(e){
    console.error(e);
    return res.json({ret: 500, text: "Internal Server Error"});
  }
});

app.post('/api/post_send', async (req, res) => {
  try{  
    console.log("path=", req.path);
    const body = req.body;
    console.log(body);
    const url = process.env.EXTERNAL_API_URL + body.external_api_path;
    console.log("url=", url);
    const sendBody = JSON.stringify(body);
    const message = await wasm.post_external_api(url, sendBody);
    console.log(message)
    const obj = JSON.parse(message)
    console.log(obj);
    if(typeof obj === "object"){
      const dataObj = JSON.parse(obj.body);
      console.log(dataObj);
      if(obj.status !== 200){
        throw new Error("response error");
      }
      return res.json({ret: 200, data: dataObj});
    }
    res.json({message});
  }catch(e){
    console.error(e);
    return res.json({ret: 500, text: "Internal Server Error"});
  }
});

app.post('/greet', (req, res) => {
  console.log("path=", req.path);
  const name = req.body.name || 'Anonymous';
  const message = wasm.greet(name);
  res.send({ message });
});
app.get('/foo', (req, res) => {
  const message = wasm.greet("foo");
  res.send({ message });
});

app.get('/greet_async', async (req, res) => {
  console.log("get.path=", req.path);
  const promise = wasm.greet_async("Node.js");
  const result = await promise;
  console.log(`Node.js: Rustから結果を受け取りました: "${result}"`);
  res.send("OK");
});

app.get('/get_sheet_list', async(req, res) => {
  try{
    console.log("get.path=", req.path);
    const apikey = process.env.GOOGLE_AUTH_API_KEY;
    const sheet_id = process.env.SPREADSHEET_ID_1;
    const message = await wasm.get_handler(req.path, apikey , sheet_id);
    //console.log("message=", message);
    const obj = JSON.parse(message);
    if(typeof obj === "object"){
      const dataObj = JSON.parse(obj.data);
      //console.log(dataObj.values);
      if(obj.ret !== 200){
        throw new Error("response error");
      }
      return res.json({ret: 200, data: dataObj});
    }
    return res.json({ret: 200, data: ""});
  }catch(e){
    console.error(e);
    return res.json({ret: 500, text: "Internal Server Error"});
  }
});

// SPA
app.get('/*', (req, res) => {
  return res.send(renderToString(Top()));
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


