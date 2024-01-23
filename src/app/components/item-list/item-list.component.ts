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
  public idToDelete: number = 0;
  public idToUpdate: number = 0;
  public currentPage = 1;
  public pageSize = 3; // Or another default value
  public totalCount: number = 0;
  public isLoading: boolean = false;
  public isPaginationVisible = true;
  public item : Item = new Item()
 
  public modalDeleteVisible: boolean = false;
  public modalEditVisible : boolean = false;

  public isValidName : boolean = false;
  public isValidType : boolean = false;
  public isValidDate : boolean = false;
  

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


  public showEditModal(item:Item) : void
  {

    this.modalEditVisible = true;
    this.idToUpdate = item.itemId;
    this.item = item;

  }
  public hideEditModal() : void
  {
    this.modalEditVisible = false;
  }

  public hideEditModalForEdit():void
  {
    this.isValidName= false;
    this.isValidType = false;
    this.isValidDate= false;

    if(!this.checkInputs())
      return;

    this.isLoading = true;
    //this.loadingService.show();
    this.item.itemId = this.idToUpdate;
    console.log(this.item);
    this.itemService.updateItem(this.item).subscribe({
      next: response => {
        this.toastr.success("Successfully updated");
        this.item.itemDate = null;
        this.item.itemId = 0;
        this.item.itemName = "";
        this.item.itemType = 0;
        //this.loadingService.hide();
        console.log("updated successful: ", response);
        this.isLoading = false;
        this.getItems(this.currentPage, this.pageSize);
        
        
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        console.log(this.item);
        this.isLoading = false;
        console.error("Error during delete:", err);
        this.toastr.error("Error occurred while adding");
        // Handle the error here
        this.item.itemDate = null;
        this.item.itemId = 0;
        this.item.itemName = "";
        this.item.itemType = 0;
      }
    });;

    this.modalEditVisible = false;

  }

  public checkInputs():boolean
  {
    let counter  = 0;
    if(this.item.itemDate == null)
    {
      ++counter;
      this.isValidDate = true;
    }
    if(this.item.itemName == "")
    {
      ++counter;
      this.isValidName = true;
    }
    if (this.item.itemType === 0 || this.item.itemType === null ) {
      ++counter;
      this.isValidType = true;
    }
    
    if(counter == 0)
      return true;

      return false;
  }

  public editItem( ) : void
  {

  }

  public showDeleteModal(son:number) : void
  {
    this.modalDeleteVisible = true;
    this.idToDelete = son;
   
  }
  public hideDeleteModal(son:number): void {
    this.modalDeleteVisible = false;
    if(son == 0 || this.idToDelete == 0)
      return;
    this.deleteItem(this.idToDelete);
  }


  public deleteItem(id : number): void
  {
  
      this.isLoading = true;

      this.itemService.deleteItem(id).subscribe({
        next: response => {
          this.isLoading = false;
          
          this.idToDelete = 0; // Reset the idToDelete after successful deletion
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
          this.idToDelete = 0;
          this.isLoading = false;
          console.error("Error during delete:", err);
          this.toastr.error("Error occurred while deleting");
        }
      });
      
   
  }





}
