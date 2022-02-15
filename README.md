# White Whale

White Whale is a web frontend for interacting with White Whale Smart Contracts. It is intended to be used with the [Terra Station Extension](https://terra.money/extension) plugin for Chromium browsers.

Documentation for the White Whale protocol as well as a number of guides for using the frontend can be found here: 

- [Docs Home](https://white-whale-defi-platform.github.io/docs/)
- [WebApp Guide](https://white-whale-defi-platform.github.io/docs/user-guide/WebApp/)
- [Swapping](https://white-whale-defi-platform.github.io/docs/user-guide/Swap/)
- [Governance Staking](https://white-whale-defi-platform.github.io/docs/user-guide/Staking/)
- [Governance Proposals](https://white-whale-defi-platform.github.io/docs/user-guide/Proposals-Voting/)
- [Providing Liquidity](https://white-whale-defi-platform.github.io/docs/user-guide/Liquidity/)


## Development

This project was bootstrapped with [Next.js](https://github.com/vercel/next.js).

## Quick Start

To get the frontend up and running quickly follow these steps 

### `npm install`
Change into the directory of the frontend repo and run npm install to get all the dependencies. 

### `npm run dev`

Runs the app in the development mode.

> Note: When running the app, we need to specify the location of an API for White Whale. For dev purposes this value will usually be: `NEXT_PUBLIC_TESTNET_GRAPHQL_URL=https://api-dev.whitewhale.money/graphql npm run dev` however you may also run the API repo locally and use its local URL instead of the hosted one for rapid prototyping

Precommit and prepush hooks are available with husky.

### Hackathon 

Take a look [here](https://devpost.com/software/white-whale) to see our original entry to the hackathon which started the protocol. 