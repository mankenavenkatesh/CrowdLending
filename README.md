# CrowdLending
Blockchain based Crowd Lending and Borrowing Platform for Individuals, ICO's, Governments etc

## Problem Statement
#### Creditors Perspective 
- There is no platform for Financiers to Crowdlend loans at global level.

#### Debitors Perspective 
- There is no platform for Corporate Bonds, IDO's, Individuals to get loans from multiple lenders. 
- There is no platform to raise initial capital for Companies, ICO's for small duration of time without giving stake

##Solution 
`We have built a Crowdlend Platform on top of Dharma Protocol where
 Debitors Can request loans specifiying Principal Amount, Interest Rate, Duration etc.
 Multiple Lenders can lend money in small amount for small duration and gain interests on lent money.`


## Steps to run CrowdLending Platform Locally
- `cd CrowdLending/dapp/`
- `npm run blockchain`  - Run local Blockchain
- `cd node_modules/@dharmaprotocol/contracts`
- `./scripts/deploy_development.sh` - Run script to compile, migrate, link, build, generate artifacts
- Modifify scripts/prepare_dist.sh according to path of tsc
- `./scripts/prepare_dist.sh - Run` script to prepare dist folder which will be picked by dharma.js
- `cd CrowdLending/dapp/`
- `npm start` - run this command to bring up the ui at 3000 port.
