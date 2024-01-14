export interface ItemModel {
    itemId: number;
    itemName: string;
    itemType: number; // or string, depending on what itemType represents
    itemDate: Date | null; // Assuming it's a date in ISO format
}
