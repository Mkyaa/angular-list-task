export interface Item {
    dataReference?: number;
    cardType?: number;
    cardTypeDefinition?: string;
    code: string;
    name: string;
    unitsetCode: string; 
    auxilCode: string; 
}

export interface ItemsResponse {
    totalElement: number;
    maxPage: number;
    currentPage: number;
    rows: Item[];
}