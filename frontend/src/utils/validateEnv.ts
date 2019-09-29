import { cleanEnv, str } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        SERVER_API_URL: str(),
    });
}

export default validateEnv;