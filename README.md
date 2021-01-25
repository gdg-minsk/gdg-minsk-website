[![Netlify Status](https://api.netlify.com/api/v1/badges/4da67b35-1236-4f91-9def-305590d72ac7/deploy-status)](https://app.netlify.com/sites/gdg-minsk-2/deploys)


## Commands

* `npm start` - build Gatsby code and run server
* `npm run build` - just build to analyze errors

## Potential Issues

If you see strange errors related to config or schema, like graphQL tries to read some not existing in schema field, try first running: `npm update`.

Sometimes, outdated dependencies cause gatsby builder DO NOT build config (don't know why), but build everythign else.
