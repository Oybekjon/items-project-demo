import { ItemModel } from "./item.model";

export interface ItemPaginationModel {
    totalCount: number;
    items : ItemModel[];
}