import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Item } from '../../services/models/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'] // Corrected to styleUrls
})
export class ItemListComponent implements OnInit {

  public items: Item[] = [];
  public idToDelete: number | null = null;
  public currentPage = 1;
  public pageSize = 5; // Or another default value
  public totalCount : number = 0;

  constructor(private itemService: ItemService) { } // Injecting service through constructor

  ngOnInit() {
    
    this.getItems(this.currentPage, this.pageSize);
  }
  
  getItems(page: number, pageSize: number) {
    this.itemService.getItemsByPagination(page, pageSize).subscribe(
      (data) => {
        this.items = data.itemsPagination;
        this.totalCount = data.totalCount;
        console.log( localStorage.getItem('CURRENT_TOKEN') );
        // ... other logic
      },
      (error) => {
        console.error('Error fetching items', error);
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
    if (typeof this.idToDelete === "number" && this.idToDelete > 0) {
      this.itemService.deleteItem(this.idToDelete).subscribe({
        next: response => {
         
          this.getItems(this.currentPage, this.pageSize);
          // You can handle the response here, e.g., update the UI or a list
        },
        error: err => {
          console.error("Error during delete:", err);
          alert("Deletion was unsuccessful" );
          // Handle the error here
        }
      });
    } else {
      console.log("Invalid idToDelete value");
    }
  }
  



}
