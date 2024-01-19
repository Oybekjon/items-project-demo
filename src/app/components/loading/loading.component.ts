import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../models/loadingService';

import { CommonModule } from '@angular/common';
import { LoadingOrchestrator } from '../models/loading-orchestrator';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.less'
})
export class LoadingComponent implements OnInit{

  public isLoading: boolean = false;
 

  constructor(private loadingService: LoadingService) {}

  ngOnInit() 
  {

    LoadingOrchestrator.signaller.subscribe((x) => {
      this.isLoading = x;
    });

    /*
    this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
    */
  }

  
}
