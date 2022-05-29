import { Blockchains } from '../constants';
export interface CustomFimkDgsGoodParam {
    blockchain: Blockchains;
    goods: string;
    includeCounts: boolean;
}
export interface CustomFimkDgsGoodResult {
    goods: string;
    name: string;
    description: string;
    quantity: number;
    priceNQT: string;
    seller: string;
    tags: string;
    delisted: boolean;
    timestamp: number;
    numberOfPurchases: number;
    numberOfPublicFeedbacks: number;
}
