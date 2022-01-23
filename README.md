# White Whale

White Whale is a web frontend for interacting with White Whale Smart Contracts. It is intended to be used with the [Terra Station Extension](https://terra.money/extension) plugin for Chromium browsers.

## Development

This project was bootstrapped with [Next.js](https://github.com/vercel/next.js).


## Quick Start

To get the frontend up and running quickly follow these steps 

### `npm install`
Change into the directory of the frontend repo and run npm install to get all the dependancies. 

### `npm run dev`

Runs the app in the development mode.

> Note: When running the app, we need to specify the location of an API for White Whale. For dev purposes this value will usually be: `NEXT_PUBLIC_TESTNET_GRAPHQL_URL=https://api-dev.whitewhale.money/graphql npm run dev` however you may also run the API repo locally and use its local URL instead of the hosted one for rapid prototyping

Precommit and prepush hooks are available with husky.
