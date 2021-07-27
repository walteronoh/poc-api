const Hapi = require("@hapi/hapi");
const patientService = require("./Services/search-service");

const init = async () => {

    const server = Hapi.server({
        host: "localhost",
        port: 8000
    });

    server.route([
        {
            path: "/patientSearch",
            method: "GET",
            handler: (request, h) => {
                const name = request.query.name;
                return patientService.getPatientByName(name);
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