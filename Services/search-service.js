"use strict";

const connection = require("../Connections/connection");

const patientServiceDef = {
    getPatientByName
}

function getPatientByName(names){
    return new Promise((resolve,reject)=>{
        let query = `SELECT name,patientId,gender,phone_number,DATE_FORMAT(dob,"%Y-%m-%d") as dob FROM patients WHERE name LIKE '${names}%'`;
        connection.getPool().then((pool)=>{
            pool.getConnection((err,connection)=>{
                connection.query(query,(err,rows)=>{
                    if(err) reject(err);
                    resolve(rows);
                });
            });
        });
    });
}

module.exports = patientServiceDef;