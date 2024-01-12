import { Injectable, inject } from "@angular/core";
import { ItemApiService } from "../api/item.api-service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import {Item} from "./models/item";
import { ItemModel } from "../api/models/item.model";

@Injectable({providedIn: "root"})
export class ItemService{
    private itemApiService : ItemApiService = inject(ItemApiService);

    public getItems():Observable<Item[]>{
        return this.itemApiService.getItems()
        .pipe(map(items => items.map(item => this.toModel(item))));
    }

    private toModel(apiModel : ItemModel) : Item{
        const newItem = new Item();
        newItem.id = apiModel.id;
        newItem.itemDate = apiModel.item_date;
        newItem.itemName = apiModel.item_name;
        newItem.itemType = apiModel.item_type;

        return newItem;
        
    }
}