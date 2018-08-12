# CrowdLending
Blockchain based Crowd Lending and Borrowing Platform for Individuals, ICO's, Governments etc

Steps to run CrowdLending Platform Locally
- `cd CrowdLending/dapp/`
- `npm run blockchain`  - Run local Blockchain
- `cd node_modules/@dharmaprotocol/contracts`
- `./scripts/deploy_development.sh` - Run script to compile, migrate, link, build, generate artifacts
- Modifify scripts/prepare_dist.sh according to path of tsc
- `./scripts/prepare_dist.sh - Run` script to prepare dist folder which will be picked by dharma.js
- `cd CrowdLending/dapp/`
- `npm start` - run this command to bring up the ui at 3000 port.
