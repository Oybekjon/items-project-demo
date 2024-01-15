import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { UserRegister } from "./models/userRegister";
import { UserApiService } from "../api/User.api-service";
import { UserLogin } from "./models/userLogin";

@Injectable({ providedIn: "root" })
export class UserService {
    private userRegisterApiService: UserApiService = inject(UserApiService);
        
    public addUser(newUser : UserRegister): Observable<any> {

        return this.userRegisterApiService.addUser(newUser);

    }

    public loginUser(loginUser : UserLogin): Observable<any> {

        return this.userRegisterApiService.loginUser(loginUser);

    }


   
}