import { Blockchains } from '../constants';
export interface CustomHeatAccountParam {
    blockchain: Blockchains;
    addrXpub: string;
}
export interface CustomHeatAccountResult {
    id: string;
    publicKey: string;
    unconfirmedBalance: string;
    effectiveBalance: string;
    currentLessee: string;
    currentLesseeName: string;
    currentLeasingHeightFrom: number;
    currentLeasingHeightTo: number;
    nextLessee: string;
    nextLesseeName: string;
    nextLeasingHeightFrom: number;
    nextLeasingHeightTo: number;
}
