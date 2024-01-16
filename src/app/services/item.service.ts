import { Injectable, inject } from "@angular/core";
import { ItemApiService } from "../api/item.api-service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Item } from "./models/item";
import { ItemModel } from "../api/models/item.model";
import { itemPagination } from "./models/itemPagination";

@Injectable({ providedIn: "root" })
export class ItemService {
    private itemApiService: ItemApiService = inject(ItemApiService);
    
    public getItems(): Observable<Item[]> {
        return this.itemApiService.getItems()
            .pipe(map(items => items.map(item => this.toModel(item))));
    }

    public getItemsByPagination(offset: number, limit: number ): Observable<itemPagination>{
        
        offset--;
        offset = offset * limit;
        return this.itemApiService.getItemsByPagination(offset, limit);
        //.pipe(map(items => items.map(item => this.toModel(item))));
    }

    public deleteItem(itemId: number): Observable<any> {
        return this.itemApiService.deleteItem(itemId);
    }

    public addItem(item : Item): Observable<any> {

        return this.itemApiService.addItem({
            itemDate: item.itemDate,
            itemId: item.itemId,
            itemName: item.itemName,
            itemType: item.itemType
        });
    }


    public toModel(apiModel: ItemModel): Item {
        const newItem = new Item();
        newItem.itemId = apiModel.itemId;
        newItem.itemDate = apiModel.itemDate;
        newItem.itemName = apiModel.itemName;
        newItem.itemType = apiModel.itemType;

        return newItem;

    }
}