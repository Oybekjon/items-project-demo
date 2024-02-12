import { Injectable, inject } from "@angular/core";
import { ItemApiService } from "../api/item.api-service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Item } from "./models/item";
import { ItemModel } from "../api/models/item.model";
import { itemPagination } from "./models/itemPagination";
import { SubFilter } from "../components/models/sub-filter";

@Injectable({ providedIn: "root" })
export class ItemService {
    private itemApiService: ItemApiService = inject(ItemApiService);

    public getItems(): Observable<Item[]> {
        return this.itemApiService.getItems()
            .pipe(map(items => items.map(item => this.toModel(item))));
    }

    public getItemsByPagination(offset: number, limit: number, filters?: {
        'Filter.Logic': string;
        'Filter.Filters': Array<SubFilter>;
    }, sort?:  { dir?: string, field: string }): Observable<itemPagination> {
        return this.itemApiService.getItemsByPagination(offset, limit, filters, sort)
            .pipe(map(x => {
                const vm = new itemPagination();
                vm.totalCount = x.totalCount;
                vm.itemsPagination = x.itemsPagination.map(y => {
                    const item = new Item();
                    if (y.itemDate)
                        item.itemDate = new Date(y.itemDate);
                    item.itemId = y.itemId;
                    item.itemName = y.itemName;
                    item.itemType = y.itemType;
                    return item;
                });
                return vm;
            }));
        /* Don't leave dead code! */
    }

    public deleteItem(itemId: number): Observable<any> {
        return this.itemApiService.deleteItem(itemId);
    }

    public addItem(item: Item): Observable<any> {
        if (item.itemDate)
            return this.itemApiService.addItem({
                itemDate: item.itemDate.toISOString(),
                itemId: item.itemId,
                itemName: item.itemName,
                itemType: item.itemType
            });
        throw new Error("Date is not provided")
    }

    public updateItem(item: Item): Observable<any> {
        if (item.itemDate)
            return this.itemApiService.updateItem({
                itemDate: item.itemDate.toISOString(),
                itemId: item.itemId,
                itemName: item.itemName,
                itemType: item.itemType
            });
        throw new Error("Date is not provided")
    }

    public toModel(apiModel: ItemModel): Item {
        const newItem = new Item();
        newItem.itemId = apiModel.itemId;
        if (apiModel.itemDate)
            newItem.itemDate = new Date(apiModel.itemDate);
        newItem.itemName = apiModel.itemName;
        newItem.itemType = apiModel.itemType;
        return newItem;

    }
}