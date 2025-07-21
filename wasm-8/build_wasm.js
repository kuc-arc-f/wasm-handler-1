//import path from "path";
//import fs from "fs";
//import { exec } from'child_process';
const path = require("path");
const fs = require("fs");
//const { exec } = require('child_process');

const directoryPath = './pkg';
const targetFiles = [];
//
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  files.forEach(file => {
    const vEnd = file.endsWith(".wasm");
    if(vEnd) {
     targetFiles.push(file);
    }
    const jEnd = file.endsWith(".js");
    if(jEnd) {
     targetFiles.push(file);
    }

  });
//console.log(targetFiles);
  targetFiles.forEach(file => {
    console.log("target=", `${directoryPath}/${file}`);
    fs.copyFile(`${directoryPath}/${file}`, `dist/${file}`, (err) => {
      if (err) {
        console.error('ファイルのコピー中にエラーが発生しました:', err);
        return;
      }
      //console.log('ファイルが正常にコピーされました。');
    });
  });
});
