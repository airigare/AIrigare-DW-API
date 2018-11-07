# airigare-api

API app airigare-api providing read/write services:
- /mikmakAPI/airigare/weatherDW/last24hours
- /mikmakAPI/airigare/Station/Status
- /mikmakAPI/airigare/Station/getInstructions

## Run locally

1. Install [Node.js and npm](https://nodejs.org/)
1. Run `npm install`
1. Run `npm start`
1. Visit [http://localhost:3000](http://localhost:3000)

## Run in the cloud

1. Install the [cf CLI](https://github.com/cloudfoundry/cli#downloads)
1. Run `cf push airigare-api -m 128M -n airigare-api -u none`
1. Visit the given URL
