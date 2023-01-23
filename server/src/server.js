const http = require("http")
const app = require("./app")
const mongoose = require("mongoose")

const { loadPlanetsData } = require("./models/planets.model")
MONGO_URL = "mongodb+srv://dhruwang19:dhruwang@cluster0.ciyl7y8.mongodb.net/test"
const PORT =  8000

const server = http.createServer(app)

mongoose.set('strictQuery', true);

mongoose.connection.once("open",()=>{
    console.log("Connetion is ready");
})


mongoose.connection.on("error",(err)=>{
    console.error(err);
})
async function startServer() {
    await mongoose.connect(MONGO_URL);
    
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}...`)
    })
}

startServer()