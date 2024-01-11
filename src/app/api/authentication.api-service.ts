import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationModel } from "./models/models";

@Injectable({ providedIn: "root" })
export class AuthenticationApiService {
    public authenticate(username: string, password: string): Observable<AuthenticationModel> {
        return new Observable(s => {
            if (username == "hello" && password == "world") {
                s.next({
                    access_token: "token",
                    expires_in: 1400
                });
            }
            else {
                s.error("Invalid credentials");
            }
        });
    }
}