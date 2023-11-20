import axios from 'axios'
import { parseJwt } from '../libs/utils';

export default class BaseHTB {
    private username: string;
    private password: string;
    private access_token: string;

    constructor(uname: string, pass: string) {
        this.username = uname;
        this.password = pass;
    }

    public login = async () => {
        this.access_token = await this.getAccessToken(this.username, this.password);
    }

    public accessCreds = () => {
        return this.access_token
    }

    public getAccessToken = async (email: string, password: string): Promise<string> => {
		return new Promise(async function(resolve, reject) {
			try {
                const response = await axios
                    .post("https://www.hackthebox.com/api/v4/login", {
                        email,
                        password,
                        remember: true
                    }, {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            "User-Agent": "HTB-CLI"
                        }
                    });
                console.warn(
                    `Acquired API v4 Session (Valid until ${new Date(parseJwt(response.data.message.access_token).exp * 1000).toLocaleString()})`
                );
                resolve(response.data.message.access_token);
            } catch (err) {
                console.warn(err);
                console.warn("Could not get session:", err.status);
                reject(err);
            }
		})
	}    
}