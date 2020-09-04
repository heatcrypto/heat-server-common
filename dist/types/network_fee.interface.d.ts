import { Blockchains } from '../constants';
export interface NetworkFeeParam {
    /**
     * Enum of blockchain identifiers
     */
    blockchain?: Blockchains;
}
export interface NetworkFeeResult {
    /**
     * Gas price in wei units
     */
    gasPriceWei?: string;
    /**
     * Recommended number of satoshis per byte
     */
    satByte?: string;
}
