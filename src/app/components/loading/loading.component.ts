import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../models/loadingService';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.less'
})
export class LoadingComponent implements OnInit{

  isLoading: boolean = true;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() 
  {
    this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
  }

  
}
