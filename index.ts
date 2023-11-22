import 'dotenv/config';
import './config/env';

import HTB from './app/main';
import { generateReport } from './libs/generate_report';

const instance = new HTB();

await instance.init()
const allProfileData = await instance.fetchProfiles()
const rankInfo = await instance.fetchRanks(allProfileData)

generateReport(rankInfo)