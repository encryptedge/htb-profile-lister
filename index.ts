import 'dotenv/config';
import './config/env';

import HTB from './app/main';

const instance = new HTB();

await instance.init()
const allProfileData = await instance.fetchProfiles()
const rankInfo = await instance.fetchRanks(allProfileData)

console.log(rankInfo)