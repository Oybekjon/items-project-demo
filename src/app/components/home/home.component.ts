import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService, EmployeeService } from '@@services/services';
import { Employee } from '@@services/models/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  private authService: AuthenticationService = inject(AuthenticationService);
  private employeeService: EmployeeService = inject(EmployeeService);

  public employees: Employee[] = [];

  public ngOnInit(): void {
    this.authService.authenticate("hello", "world").subscribe(x => {
      console.log(x.accessToken);
    });

    this.employeeService.getEmployees().subscribe(x => {
      this.employees = x;
    });
  }
}
