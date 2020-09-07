import { Blockchains, AssetTypes } from '../constants';
import { RateLimiterClass } from '../rate_limiter.class';
import { NetworkStatusResult } from './network_status.interface';
import { NetworkFeeResult } from './network_fee.interface';
import { TokenDiscoveryResult } from './token_discovery.interface';
import { EventLookupResult } from './event_lookup.interface';
import { UtxoLookupResult } from './utxo_lookup.interface';
import { TransactionStatusResult } from './transaction_status.interface';
import { ResolveAliasResult, ReverseResolveAliasResult } from './alias_lookup.interface';
import { PublicKeyLookupResult } from './publickey_lookup.interface';
export interface ExplorerMiddleware {
    getAddress?(address: string): string;
    getNetworkFee?(input: string): {
        gasPriceWei?: string;
        satByte?: string;
    };
}
export interface ExplorerApi {
    middleWare?: ExplorerMiddleware;
    rateLimiter?: RateLimiterClass;
    host: string;
    status?: (blockchain?: Blockchains) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: NetworkStatusResult;
    }>;
    networkFee?: (blockchain: Blockchains) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: NetworkFeeResult;
    }>;
    tokenDiscovery?: (blockchain: Blockchains, assetType: AssetTypes, addrXpub: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: Array<TokenDiscoveryResult>;
    }>;
    balanceLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: string;
        exists?: boolean;
    }>;
    eventsLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, from: number, to: number, minimal?: boolean) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: Array<EventLookupResult> | Array<string>;
    }>;
    utxoLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: Array<UtxoLookupResult>;
    }>;
    broadcast?: (blockchain: Blockchains, assetType: AssetTypes, transactionHex: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: {
            errorMessage: string;
        } | {
            transactionId: string;
        };
    }>;
    transactionStatus?: (blockchain: Blockchains, assetType: AssetTypes, addrXpub: string, transactionId: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: TransactionStatusResult;
    }>;
    resolveAlias?: (blockchain: Blockchains, assetType: AssetTypes, alias: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: ResolveAliasResult;
    }>;
    reverseResolveAlias?: (blockchain: Blockchains, assetType: AssetTypes, addrXpub: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: ReverseResolveAliasResult;
    }>;
    publicKey?: (blockchain: Blockchains, addrXpub: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: PublicKeyLookupResult;
    }>;
    customHeatAccount?: (blockchain: Blockchains, _addrXpub: string) => Promise<{
        rateLimitted?: boolean;
        error?: string;
        value?: {
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
        };
    }>;
}
