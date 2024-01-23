import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ItemModel } from "./models/item.model";
import { registerUserModel } from "./models/registerUser.model";
import { loginUserModel } from "./models/loginUser.model";

@Injectable({providedIn: "root"})
export class UserApiService
{
    private client:HttpClient = inject(HttpClient);

    private apiUrl = 'https://localhost:7274/api/Account';
   
    public addUser(user : registerUserModel ): Observable<any> {
        return this.client.post( this.apiUrl +  "/Register", user, { headers: { 'Content-Type': 'application/json' } })
    }

    public loginUser(user : loginUserModel ): Observable<any> {
        return this.client.post( this.apiUrl +  "/LogIn", user, { headers: { 'Content-Type': 'application/json' } })
    }

    




}