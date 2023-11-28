import { Blockchains } from '../constants';
export interface AddressExistsLookupParam {
    /**
     * Enum of blockchain identifiers
     */
    blockchain: Blockchains;
    /**
     * Address or public key
     */
    addrXpub: string;
}
export interface AddressExistsLookupResult {
    exists: boolean;
}
