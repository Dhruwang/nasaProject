const launches = new Map();
let latestFlightNumber = 100
const launch = {
    flightNumber:100,
    mission:"Kepler Exploration X",
    rocket : "Explorer IS1",
    launchDate : new Date("December 27, 2030"),
    target:"Kepler-442 b",
    customers : ["Dhruwang","NASA"],
    upcoming : true,
    success : true,
};

launches.set(launch.flightNumber,launch)

function existLaunchWithId(id){
    return launches.has(id)
}

function getAllLaunches(){
    console.log( Array.from(launches.values()))
    return Array.from(launches.values())
}
function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch,{
            success:true,
            upcoming:true,
            customers:["JD Industries","NASA"],
            flightNumber:latestFlightNumber,
        })
    )
}
function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;

}

module.exports = {
    existLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}