import ReactDOM from 'react-dom/client'
import React from 'react'

function App() {
  return (
  <div>
    <h1 className="text-3xl font-bold">hello!</h1>
    <hr />
    <span>Hi , WASM + React</span>
  </div>
  );
}
ReactDOM.createRoot(document.getElementById('app')).render(
    <App />
)
console.log('createRoot')
