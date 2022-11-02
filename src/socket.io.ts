// import TravelCtrl from "./controller/travel.controller";

export default (io: any) => {
    // Middlewares para socket
    /*
    io.use((socket: any, next: any) => {
        console.log(socket);
        next();
    })
    */

    io.on('connection', (socket: any) => {
        console.log("socket");
    });
}