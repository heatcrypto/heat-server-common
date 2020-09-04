import { Blockchains } from '../constants';
export interface PublicKeyLookupParam {
    /**
     * Enum of blockchain identifiers
     */
    blockchain: Blockchains;
    /**
     * Address or public key
     */
    addrXpub: string;
}
export interface PublicKeyLookupResult {
    publicKey: string;
}
