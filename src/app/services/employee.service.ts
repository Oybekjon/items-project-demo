import { Observable, map } from "rxjs";
import { Employee } from "./models/employee";
import { EmployeeApiService } from "@@api/employee.api-service";
import { Injectable, inject } from "@angular/core";
import { EmployeeModel } from "@@api/models/employee.model";

@Injectable({ providedIn: "root" })
export class EmployeeService {
    private employeeApiService: EmployeeApiService = inject(EmployeeApiService);
    public getEmployees(): Observable<Employee[]> {
        return this.employeeApiService.getEmployees()
            .pipe(map(x => {
                const result: Employee[] = [];
                for (let i = 0; i < x.length; i++) {
                    result.push(this.toModel(x[i]));
                }
                return result;
            }));
    }

    private toModel(apiModel: EmployeeModel): Employee {
        const result = new Employee();
        result.employeeAge = apiModel.employee_age;
        result.employeeName = apiModel.employee_name;
        result.employeeSalary = apiModel.employee_salary;
        result.id = apiModel.id;
        result.profileImage = apiModel.profile_image;
        return result;
    }
}