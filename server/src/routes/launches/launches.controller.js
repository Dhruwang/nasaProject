const {getAllLaunches, addNewLaunch,existLaunchWithId,abortLaunchById} = require("../../models/launches.model")

function httpGetAllLaunches(req,res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req,res){
    const launch = req.body
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target ) {
        return res.status(400).json({
            error:"Missing fields"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"invalid date"
        })
    }
    addNewLaunch(launch)
    return res.status(201).json(launch)
}

function httpAbortLaunch(req,res){
    launchId = Number(req.params.id)
    if (!existLaunchWithId(launchId)) {
        return res.status(404).json({
            error:"launch not found"
        })
    }
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,httpAddNewLaunch,httpAbortLaunch
}