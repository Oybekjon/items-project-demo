import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable(
    {
        providedIn: 'root',
    }
)

export class TokenService{
    isAuthentification : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(){}

    setToken(token:string){
        localStorage.setItem('CURRENT_TOKEN', token);
    }

    getToken(): string | null {
        return localStorage.getItem('CURRENT_TOKEN') || null;
    }

}