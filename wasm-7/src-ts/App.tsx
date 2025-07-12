import React from 'react';
import { Route, Routes } from 'react-router';
console.log('#app.tsx');

import Home from './client/home';
import About from './client/about';
import SheetTodo from './client/SheetTodo';
import Todo11 from './client/todo11';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sheet_todo" element={<SheetTodo />} />
      <Route path="/todo11" element={<Todo11 />} />
      
    </Routes>
  );
}

export default App;
