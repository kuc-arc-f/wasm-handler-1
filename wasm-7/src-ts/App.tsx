import React from 'react';
import { Route, Routes } from 'react-router';
console.log('#app.tsx');

import Home from './client/home';
import About from './client/about';
import SheetTodo from './client/SheetTodo';
import Todo11 from './client/todo11';
import Todo16 from './client/todo16';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sheet_todo" element={<SheetTodo />} />
      <Route path="/todo11" element={<Todo11 />} />
      <Route path="/todo16" element={<Todo16 />} />
      
    </Routes>
  );
}

export default App;
