
import { HttpService } from "@nestjs/axios";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { stringify } from "querystring";
import { AuthService } from "../auth.service";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private authService: AuthService, private http: HttpService) {
        super({
            authorizationURL: `${process.env.AUTHORIZATION_URL} ${stringify({
                clientID : process.env.FORTYTWO_APP_ID,
                redirect_uri : process.env.CALLBACK_URL,
                response_type : 'code',
                scope: 'public'
            })}`,
			tokenURL        : process.env.TOKEN_URL,
			clientID        : process.env.FORTYTWO_APP_ID,
			clientSecret    : process.env.FORTYTWO_APP_SECRET,
			callbackURL     : process.env.CALLBACK_URL,
			scope           : 'public',

        });
    }

    async validate(
        accessToken: string,
        refreshToken: string) : Promise<any> {
            try {
                const { data } = await this.http.axiosRef.get('https://api.intra.42.fr/v2/me', {
                    headers: { Authorization: `Bearer ${ accessToken }` },
                });
                return data;
            } catch (error) {
                throw new UnauthorizedException()
            }
        }
}