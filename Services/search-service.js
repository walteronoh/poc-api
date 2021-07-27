"use strict";

const connection = require("../Connections/connection");

const serviceDef = {
    getPatientByName,
    getReportByMonth
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

function getReportByMonth(month){
    return new Promise((resolve,reject)=>{
        let query = `SELECT * FROM encounters WHERE DATE_FORMAT(encounter_datetime,"%M")='${month}'`;
        connection.getPool().then((pool)=>{
            pool.getConnection((err,connection)=>{
                connection.query(query,(err,rows)=>{
                    if(err) reject(err);
                    resolve(rows)
                });
            });
        });
    });
}

module.exports = serviceDef;