import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationOrchestrator } from '../models/authentication-orchestrator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit {
  public modalLogOutVisible: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(private toastr: ToastrService){};

  public showLogOutModal(): void {
    this.modalLogOutVisible = true;
  }

  public hideLogOutModal(): void {
    this.modalLogOutVisible = false;
  }

  public ngOnInit(): void {
    const token = localStorage.getItem('CURRENT_TOKEN');
    if (token) {
      this.isLoggedIn = true;
    }
    AuthenticationOrchestrator.signaller.subscribe((x) => {
      this.isLoggedIn = x;
    });
  }



  public saveLogOutChanges(): void {
    this.toastr.success("Successfully logged out");
    localStorage.removeItem('CURRENT_TOKEN');
    this.isLoggedIn = false;
    AuthenticationOrchestrator.signaller.next(false);
    this.modalLogOutVisible = false;

  }



}
