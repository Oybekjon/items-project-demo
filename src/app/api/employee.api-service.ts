import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { EmployeeModel } from "./models/employee.model";

@Injectable({ providedIn: "root" })
export class EmployeeApiService {
    private client: HttpClient = inject(HttpClient);
    public getEmployees(): Observable<EmployeeModel[]> {
        return this.client.get<{ data: EmployeeModel[] }>("https://dummy.restapiexample.com/api/v1/employees")
            .pipe(map(x => x.data));
    }
}