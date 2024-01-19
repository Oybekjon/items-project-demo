import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserRegister } from '../../services/models/userRegister';
import { Router } from '@angular/router';
import { LoadingService } from '../models/loadingService';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,RouterModule, FormsModule,CommonModule,LoadingComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent   {
  
  

  public userRegister : UserRegister = new UserRegister();
  public isLoading : boolean = false;

 

  constructor( private userService : UserService, private router: Router, private loadingService: LoadingService ) {}


  public registerUser() : void{
    this.isLoading = true;
    //this.loadingService.show();
    this.userService.addUser(this.userRegister).subscribe({
      next: response => {
        this.isLoading = false;
        console.log("Response data ", response);
        this.loadingService.hide()
        this.router.navigate(['/login']);
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });;
  }




}
