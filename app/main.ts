import BaseClass from "./base"
import MemberIDs from "../modifiers/extract"
import htbClient from "../libs/htb_client";

interface IHTBProfile {
    profile: {
        id: number,
        sso_id: number | null,
        name: string,
        system_owns: number,
        user_owns: number,
        user_bloods: number,
        system_bloods: number,
        team: {
            id: number,
            name: string,
            ranking: number,
            avatar: string
        },
        respects: number,
        rank: string,
        rank_id: number,
        current_rank_progress: number,
        next_rank: string,
        next_rank_points: number,
        rank_ownership: string,
        rank_requirement: number,
        ranking: number,
        avatar: string,
        timezone: string,
        points: number,
        country_name: string,
        country_code: string,
        university_name: string,
        description: string | null,
        github: string | null,
        linkedin: string | null,
        twitter: string | null,
        website: string | null
    }
}

export default class HTB {
    private HTBBase: BaseClass;

    constructor() {
        this.HTBBase = new BaseClass(process.env.HTB_EMAIL, process.env.HTB_PASSWORD)
    }

    public init = async () => {
        await this.HTBBase.login()
    }

    public fetchProfiles = async (): Promise<IHTBProfile[]> => {
        const IDs = await MemberIDs()
        const fetchedData : IHTBProfile[] = []

        for (const id of IDs){
            const data = await this.fetchProfileByID(id) as IHTBProfile
            fetchedData.push(data)
        }

        return fetchedData
    }

    public fetchRanks = (data: IHTBProfile[]) => {
        const dataToReturn: any = []
        for (const info of data){
            dataToReturn.push({
                name: info.profile.name,
                rank: info.profile.rank
            })
        }
        return dataToReturn
    }

    public fetchRank = (data: IHTBProfile) => {
        return data.profile.rank
    }

    public fetchProfileByID = async (id: string) => {
        return htbClient(this.HTBBase.accessCreds())
            .get("https://www.hackthebox.com/api/v4/profile/"+ id)
            .then(({data}) => {
                return data
            })
            .catch((err) => {
                throw new Error(err)
            })
    }
}