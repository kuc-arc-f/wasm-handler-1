const express = require('express');
import { renderToString } from 'react-dom/server';
import Top from './Top';
require('dotenv').config()

const app = express();

// POST の JSON を読み取る
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// wasm モジュールを読み込み
const wasm = require('../pkg/wasm_module'); // wasm-pack の出力を参照

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

app.get('/', (req, res) => {
  return res.send(renderToString(Top()));
  //const message = wasm.greet("foo");
  //res.send({ message });
});

app.get('/*', async (req, res) => {
  try{
    console.log("get.path=", req.path);
    const apikey = process.env.GOOGLE_AUTH_API_KEY;
    const sheet_id = process.env.SPREADSHEET_ID_1;
    const message = await wasm.get_handler(req.path, apikey , sheet_id);
    console.log("message=", message);
    const obj = JSON.parse(message);
    if(typeof obj === "object"){
      //const dataObj = JSON.parse(obj.data);
      //console.log(dataObj.values);
      if(obj.ret !== 200){
        throw new Error("response error");
      }
      return res.json({ret: 200, data: obj.data});
    }
    return res.json({ret: 200, data: ""});
  }catch(e){
    console.error(e);
    return res.json({ret: 500, text: "Internal Server Error"});
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


