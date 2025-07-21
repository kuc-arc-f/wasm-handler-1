import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import { BrowserRouter } from "react-router";
import App from './client/home'

ReactDOM.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
console.log('createRoot')
