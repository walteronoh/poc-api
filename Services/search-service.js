"use strict";

const connection = require("../Connections/connection");

const serviceDef = {
    getPatientByName,
    getReportByMonth,
    getPatientsByStatus
}

function getPatientByName(names) {
    return new Promise((resolve, reject) => {
        let query = `SELECT P.name,P.patientId,P.gender,P.phone_number,DATE_FORMAT(P.dob,"%Y-%m-%d") as dob, E.hiv_status FROM patients P join encounters E on (P.patientId = E.patientId) WHERE name LIKE '${names}%'`;
        connection.getPool().then((pool) => {
            pool.getConnection((err, connection) => {
                connection.query(query, (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                });
            });
        });
    });
}

function getReportByMonth(month) {
    return new Promise((resolve, reject) => {
        let query = `select L.name as location,DATE_FORMAT(E.encounter_datetime,"%M-%Y") as encounter_datetime,
         count(case when E.hiv_status='Positive' then E.hiv_status end) as positive,
         count(case when E.hiv_status='Negative' then E.hiv_status end) as negative, 
         count(case when E.hiv_status='Unknown' then E.hiv_status end) as unknowns
          from encounters E 
          join locations L on (E.location_id = L.id) 
          where date_format(E.encounter_datetime,"%M")='${month}' 
          group by location,encounter_datetime 
          order by E.encounter_datetime desc`;
        connection.getPool().then((pool) => {
            pool.getConnection((err, connection) => {
                connection.query(query, (err, rows) => {
                    if (err) reject(err);
                    resolve(rows)
                });
            });
        });
    });
}

function getPatientsByStatus(status, reportDate) {
    return new Promise((resolve, reject) => {
        let query = `select date_format(E.encounter_datetime,"%Y-%m-%d") as encounter_datetime, E.hiv_status as hiv_status, L.name as location, P.name as patient_name, P.age as age, P.gender as gender 
        from encounters E
        join locations L on(E.location_id = L.id)
        join patients P on(E.patientId = P.patientId) 
        where E.hiv_status='${status}' 
        && date_format(E.encounter_datetime,"%M-%Y")='${reportDate}'
        order by E.encounter_datetime desc`;
        connection.getPool().then((pool)=>{
            pool.getConnection((err,connection)=>{
                connection.query(query,(err,rows)=>{
                    if(err) reject(err);
                    resolve(rows);
                })
            })
        })
    })
}

module.exports = serviceDef;