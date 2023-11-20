import fs from 'fs'
import neatCsv from 'neat-csv';

type ProfileInput = {
    profile: string;
};

function extractIds(profiles: ProfileInput[]): string[] {
    return profiles.map(({ profile }) => {
        // Extract the numeric ID using a regular expression
        const match = profile.match(/(\d+)$/);
        return match ? match[1] : '';
    }).filter(id => id !== ''); // Filter out any empty strings
}

const readData = () => {
    return fs.readFileSync('data.csv')
}

export default async () => {
    const data = await readData()
    const parsedData : ProfileInput[] = await neatCsv(data)
    return extractIds(parsedData)
}