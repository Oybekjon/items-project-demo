import { Component, OnInit, numberAttribute } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  imports: [RouterModule, FormsModule, CommonModule, LoadingComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'] // Corrected to styleUrls
})
export class ItemListComponent implements OnInit {

  public items: Item[] = [];
  public idToDelete: number | null = null;
  public currentPage = 1;
  public pageSize = 4; // Or another default value
  public totalCount: number = 0;
  public isLoading: boolean = false;
  public isPaginationVisible = true;

  constructor(private router: Router, private toastr: ToastrService, private itemService: ItemService, private loadingService: LoadingService) { } // Injecting service through constructor

  public ngOnInit(): void {

    const token = localStorage.getItem('CURRENT_TOKEN');

    if(token === null)
    {
      this.router.navigate(['/register']);
      return;
    }

    this.getItems(this.currentPage, this.pageSize);
   
  }

  getItems(page: number, pageSize: number) {

    this.isLoading = true;
    
    this.itemService.getItemsByPagination(page, pageSize).subscribe(
      (data) => {

        this.isLoading = false;

        this.items = data.itemsPagination;
        this.totalCount = data.totalCount;
        console.log(localStorage.getItem('CURRENT_TOKEN'));
        this.makePaginationVisible(this.totalCount, this.pageSize);

      },
      (error) => {
        console.error('Error fetching items', error);
        this.isLoading = false;
      }
    );
  }

  public makePaginationVisible(totalCount1:number, pageSize1:number):void
  {
    if(Math.ceil(totalCount1 / pageSize1) == 1)
    {
      this.isPaginationVisible = false;

    }
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
          
          this.idToDelete = null; // Reset the idToDelete after successful deletion
          if ((this.totalCount - 1) % this.pageSize == 0) {
            this.changePage(this.currentPage - 1);
          }
          else
            this.getItems(this.currentPage, this.pageSize);

          if (response == 0 || response == '0') {
            this.toastr.error("No such kind of item");
          } else {
            this.toastr.success("Successfully deleted");
            //this.idToDelete = null; // Reset the idToDelete after successful deletion
          }
        },
        error: err => {
          this.isLoading = false;
          console.error("Error during delete:", err);
          this.toastr.error("Error occurred while deleting");
        }
      });
    } else {
      console.log("Invalid idToDelete value");
    }
  }





}
