"use strict";

const mysql = require("mysql");
const dbConfig = require("../config/db-config.json");

const pool = mysql.createPool(
   dbConfig.mysql
);

const def = {
    getPool
}

function getPool(){
    return new Promise((resolve,reject)=>{
        resolve(pool)
    })
}

module.exports = def;
