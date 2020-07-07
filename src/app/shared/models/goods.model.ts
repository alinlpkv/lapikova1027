
export interface Mgoods {
    id?: number;
    name: string;
    amount: number;
    status: number;
}


export enum GoodStatus {
    bought,
    notBought,
}