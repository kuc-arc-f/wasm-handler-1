//import Head from '../components/Head'
import React from 'react'

function Home() {
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >home</h1>
    <hr />
    <a href="/todo11">[ todo11 ]</a>
    {/* <a href="/todo16">[ todo16 ]</a> */}
    <a href="/sheet_todo">[ sheet_todo ]</a>
    <a href="/about">[ about ]</a>
  </div>
  );
}

export default Home;