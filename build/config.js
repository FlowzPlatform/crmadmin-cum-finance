import Env from './env';
console.log("CCCCCCCCCCCCCCCCCCCCCCCCC ", process.env.serviceUrl)
let config = {
    env: Env,
    serviceUrl: process.env.serviceUrl
};
export default config;
