const express = require('express');
const app = express();
const port = 3000;

// POST の JSON を読み取る
app.use(express.json());

// wasm モジュールを読み込み
const wasm = require('./wasm_module'); // wasm-pack の出力を参照

app.post('/greet', (req, res) => {
  console.log("path=", req.path);
  const name = req.body.name || 'Anonymous';
  const message = wasm.greet(name);
  res.send({ message });
});
app.get('/*', (req, res) => {
  console.log("get.path=", req.path);
  const message = wasm.get_handler(req.path);
  console.log("message=", message);
  //const obj = JSON.parse(message);
  //console.log(obj); 
  res.send(message);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


