import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Item } from '../../services/models/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../models/loadingService';
import { LoadingComponent } from '../loading/loading.component';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule, LoadingComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'] // Corrected to styleUrls
})
export class ItemListComponent implements OnInit {

  public items: Item[] = [];
  public idToDelete: number | null = null;
  public currentPage = 1;
  public pageSize = 4; // Or another default value
  public totalCount : number = 0;
  public isLoading : boolean = false;

  constructor(private toastr: ToastrService,private itemService: ItemService, private loadingService: LoadingService) { } // Injecting service through constructor

  ngOnInit() {
    
    this.getItems(this.currentPage, this.pageSize);
  }
  
  getItems(page: number, pageSize: number) {
    
    this.isLoading = true;

    this.itemService.getItemsByPagination(page, pageSize).subscribe(
      (data) => {

        this.isLoading = false;
        
        this.items = data.itemsPagination;
        this.totalCount = data.totalCount;
        console.log( localStorage.getItem('CURRENT_TOKEN') );
      
        // ... other logic
      },
      (error) => {
        console.error('Error fetching items', error);
        this.isLoading = false;
      }
    );
  }

  changePage(page: number): void {
    if (page < 1 || page > this.getTotalPages()) {
      return;
    }
    this.currentPage = page;
    this.getItems(this.currentPage, this.pageSize);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }
  


 

  public deleteItem(): void {
    
    this.isLoading = true;

    if (typeof this.idToDelete === "number" && this.idToDelete > 0) {
      this.itemService.deleteItem(this.idToDelete).subscribe({
        next: response => {

          this.isLoading = false;
          this.getItems(this.currentPage, this.pageSize);
            
          if(response == 0 || response == '0')
          {
            this.toastr.error("No such kind of item");
          }
          else
          {
            this.toastr.success("Successfully deleted");
          }
          
          // You can handle the response here, e.g., update the UI or a list
        },
        error: err => {
          this.isLoading = false;
          console.error("Error during delete:", err);
          this.toastr.error("Error occurred while deleting");
          
          // Handle the error here
        }
      });
    } else {
      console.log("Invalid idToDelete value");
    }
  }
  



}
