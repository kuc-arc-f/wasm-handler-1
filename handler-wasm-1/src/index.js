const express = require('express');
const app = express();
const port = 3000;

// POST の JSON を読み取る
app.use(express.json());

// wasm モジュールを読み込み
const wasm = require('./wasm_module'); // wasm-pack の出力を参照

app.post('/greet', (req, res) => {
  const name = req.body.name || 'Anonymous';
  const message = wasm.greet(name);
  res.send({ message });
});
app.get('/', (req, res) => {
  const message = wasm.greet("WASM");
  res.send(message);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


