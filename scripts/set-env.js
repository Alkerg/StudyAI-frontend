const {writeFileSync, mkdirSync} = require('fs');
require('dotenv').config({ quiet: true });


const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const apiUrl = process.env.API_URL?.trim();

if(!apiUrl){
    throw new Error('API_URL is not set');
}


const envFileContent = `

export const environment = {
    apiUrl: "${apiUrl}"
};

`


mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);