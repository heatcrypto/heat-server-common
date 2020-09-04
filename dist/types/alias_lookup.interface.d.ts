import { Blockchains, AssetTypes } from '../constants';
/**
 * Resolve alias
 */
export interface ResolveAliasParam {
    /**
     * Enum of blockchain identifiers
     */
    blockchain: Blockchains;
    /**
     * Enum of asset or token types
     */
    assetType: AssetTypes;
    /**
     * Alias
     */
    alias: string;
}
/**
 * Reverse resolve alias
 */
export interface ReverseResolveAliasParam {
    /**
     * Enum of blockchain identifiers
     */
    blockchain: Blockchains;
    /**
     * Enum of asset or token types
     */
    assetType: AssetTypes;
    /**
     * Address or public key
     */
    addrXpub: string;
}
/**
 * Resolve alias
 */
export interface ResolveAliasResult {
    addrXpub: string;
    isPermanent: boolean;
}
/**
 * Reverse resolve alias
 */
export interface ReverseResolveAliasResult {
    alias: string;
    isPermanent: boolean;
}
