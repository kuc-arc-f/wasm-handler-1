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

/*
*
* @param
*
* @return
*/
app.post('/api/chat', async (req: any, res: any) => {
  try {
    const body = req.body;
    //console.log(body)
    const item = {
      appName: body.appName,
      userId: body.userId,
      sessionId: body.sessionId,
      newMessage: {
        role: "user",
        parts: [{
          text: body.messages 
        }]
      }
    };
    console.log(item)
    const sendBody = JSON.stringify(item);	
    const url = process.env.ADK_API_URL;	
    console.log("url=", url);
    const message = await wasm.post_external_api(url + "/run", sendBody);
    const obj = JSON.parse(message)
    //console.log(obj);
    if(typeof obj === "object"){
      if(!obj.body){
        if(obj.status !== 200){
          throw new Error("body = null");
        }else{
          return res.json({ret: 200, data: null });
        }
      }
      const dataObj = JSON.parse(obj.body);
      //console.log(dataObj);
      if(obj.status !== 200){
        throw new Error("response error");
      }
      const outIndex = dataObj.length - 1;
      console.log("#outIndex=", outIndex);
      console.log("artifact:");
      if(dataObj[outIndex]){
        const target = dataObj[outIndex].content;
        console.log(target.parts);
        if(target.parts[0]){
          console.log("text=", target.parts[0].text);
          return res.send({ret: 200, text: target.parts[0].text});
        }else{
          console.log("text= NULL");
        }
      }      
      return res.send({ret: 200, text: ""});
    }
    res.json({message});
  } catch (error) {
    res.sendStatus(500);
  }
});
/*
*
* @param
*
* @return
*/
app.post('/api/adk_init', async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log(body)
    const urlBase = process.env.ADK_API_URL;	
    const path = urlBase + `/apps/${body.appName}/users/${body.userId}/sessions/${body.sessionId}`;	
    const sendBody = JSON.stringify({});
    const message = await wasm.post_external_api(path, sendBody);
    const obj = JSON.parse(message)
    //console.log(obj);
    if(typeof obj === "object"){
      if(!obj.body){
        if(obj.status !== 200){
          throw new Error("body = null");
        }else{
          return res.json({ret: 200, data: null });
        }
      }
      const dataObj = JSON.parse(obj.body);
      console.log(dataObj);
      if(obj.status !== 200){
        throw new Error("response error");
      }
      return res.json({ret: 200, data: dataObj});
    }
    res.json({message});
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
/*
*
* @param
*
* @return
*/
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

/*
*
* @param
*
* @return
*/
app.post('/api/post_send', async (req, res) => {
  try{  
    console.log("path=", req.path);
    const body = req.body;
    console.log(body);
    const url = process.env.EXTERNAL_API_URL + body.external_api_path;
    console.log("url=", url);
    const sendBody = JSON.stringify(body);
    const message = await wasm.post_external_api(url, sendBody);
    const obj = JSON.parse(message)
    //console.log(obj);
    if(typeof obj === "object"){
      if(!obj.body){
        if(obj.status !== 200){
          throw new Error("body = null");
        }else{
          return res.json({ret: 200, data: null });
        }
      }
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

// SPA
app.get('/*', (req, res) => {
  return res.send(renderToString(Top()));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


