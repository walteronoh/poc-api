const Hapi = require("@hapi/hapi");
const patientService = require("./Services/search-service");

const init = async () => {

    const server = Hapi.server({
        host: "localhost",
        port: 8080
    });

    server.route([
        {
            path: "/patientSearch",
            method: "GET",
            handler: (request, h) => {
                const name = request.query.name;
                return patientService.getPatientByName(name);
            }
        },
        {
            path:"/monthReport",
            method:"GET",
            handler:(request,h)=>{
                const month = request.query.month;
                return patientService.getReportByMonth(month);
            }
        },
        {
            path:"/patientsStatus",
            method:"GET",
            handler:(request,h)=>{
                const patient_status = request.query.status;
                const month_year = request.query.reportDate;
                return patientService.getPatientsByStatus(patient_status,month_year);
            }
        }
    ])

    await server.start();

    console.log(`Server running on ${server.info.uri}`);

    process.on("unhandledRejection", (err) => {
        console.log(err);
    });
}

init();