URL = "http://localhost:8000"

async function httpGetPlanets() {
  const response = await fetch(`${URL}/planets`)
  return await response.json()
}
// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${URL}/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  })
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${URL}/launches`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(launch)
      },
    )
  }
  catch (err) {
    return{
      ok:false
    }
  }
}
// Delete launch with given ID.
async function httpAbortLaunch(id) {
    return await fetch(`${URL}/launches/${id}`,
    {method:"delete"})
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};