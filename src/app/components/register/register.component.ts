import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserRegister } from '../../services/models/userRegister';
import { Router } from '@angular/router';
import { LoadingService } from '../models/loadingService';
import { LoadingComponent } from '../loading/loading.component';
import { ToastrService } from 'ngx-toastr';


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
  public isValidEmail : boolean = false;
  public isValidPassword : boolean = false;

 

  constructor( private toastr: ToastrService,private userService : UserService, private router: Router, private loadingService: LoadingService ) {}


  public registerUser() : void{

    this.isValidEmail = false;
    this.isValidPassword = false;

    if(!this.checkInputs())
      return;

    this.isLoading = true;

    this.userService.addUser(this.userRegister).subscribe({
      next: response => {
        
        this.isLoading = false;
        this.toastr.success("Successfully registered");
        
        
        this.router.navigate(['/login']);
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        
        this.isLoading = false;
        if(err.status == 404 || err.status == '404')
        {
          this.toastr.error("This email has been already registered");
        }
        else
        {
          this.toastr.error("Error occurred while registering (password and email should not be same)");
        }


        console.error("Error during delete:", err.status);
        
        // Handle the error here
      }
    });;
  }

  checkInputs():boolean
  {
    let counter  = 0;
    if(!this.userRegister.email.endsWith("@gmail.com"))
    {
      ++counter;
      this.isValidEmail = true;
    }
    if(this.userRegister.password.length < 8)
    {
      ++counter;
      this.isValidPassword = true;
    }
    
    if(counter == 0)
      return true;

      return false;
  }
}
