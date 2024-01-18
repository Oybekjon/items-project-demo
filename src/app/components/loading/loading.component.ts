import { Component } from '@angular/core';
import { LoadingService } from '../models/loadingService';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.less'
})
export class LoadingComponent {

  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
  }
}
