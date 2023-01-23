const { parse } = require('csv-parse');
const fs = require('fs');
const mongoose = require('mongoose')
const planets = require("./planets.mongo")

const habitablePlanets = [];

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        function isHabitable(planet) {
        return planet['koi_disposition'] == 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
    }

    fs.createReadStream("./src/models/Kepler-Data.csv")
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async(data) => {
            if (isHabitable(data)) {
                savePlanets(data);
            }
        })
        .on('err', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', (end) => {
            resolve()
        })
    })
    

}
async function getAllPlanets(){
    return await planets.find({})
}
async function savePlanets(planet) {
    await planets.updateOne({
        keplerName : planet.kepler_name,
    },
    {
        keplerName : planet.kepler_name,
    },
    {
        upsert : true,
    });
}


module.exports = {
    loadPlanetsData,
    getAllPlanets,
}