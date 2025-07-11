import React from 'react';
import { Route, Routes } from 'react-router';
console.log('#app.tsx');

import Home from './client/home';
import About from './client/about';
import SheetTodo from './client/SheetTodo';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sheet_todo" element={<SheetTodo />} />
      
    </Routes>
  );
}

export default App;
