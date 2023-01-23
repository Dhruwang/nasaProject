const express = require("express")
const {httpGetAllPlanets} = require("./planets.controller")
planetsRouter = express.Router()

planetsRouter.get("/",httpGetAllPlanets)

module.exports = planetsRouter