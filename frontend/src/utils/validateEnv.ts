import { cleanEnv, url } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        SERVER_API_URL: url(),
    });
}

export default validateEnv;