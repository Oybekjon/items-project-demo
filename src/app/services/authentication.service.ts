import { Injectable, inject } from "@angular/core";
import { AuthenticationApiService } from "@@api/services";
import { Observable, map } from "rxjs";
import { TokenModel } from "./models/token.model";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    private authService: AuthenticationApiService = inject(AuthenticationApiService);

    public authenticate(username: string, password: string): Observable<TokenModel> {
        return this.authService.authenticate(username, password)
            .pipe(map(x => {
                const res = new TokenModel();
                res.accessToken = x.access_token;
                return res;
            }));
    }
}