//import { Routes, Route, Link } from 'react-router-dom';
import {Link } from 'react-router-dom';
import React, { useState , useEffect } from 'react';

function Page() {
  return (
  <div>
    <a href="/" className="font-bold ms-4" > Home </a>
    <hr className="my-2" />
    <span className="ms-4"><strong>SheetApp</strong></span>
    <a href={`/sheettodo`} className="font-bold ms-4" > [ SheetTodo ] </a>
    <hr className="my-2" />
  </div>
  );
}
export default Page;
