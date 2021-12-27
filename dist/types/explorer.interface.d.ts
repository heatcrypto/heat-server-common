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
import { ModuleResponse } from '../module-response';
import { BalanceLookupResult } from './balance_lookup.interface';
import { CustomHeatAccountResult } from './custom_heat.interface';
import { BroadcastResult } from './broadcast.interface';
import { EstimateGasResult } from './estimate_gas.interface';
import { NonceLookupResult } from './nonce_lookup.interface';
import { TxidsLookupResult } from './txids_lookup.interface';
import { UtxoXpubLookupResult } from './utxo_xpub_lookup.interface';
import { XpubLookupRequestTokens, XpubLookupRequestType, XpubLookupResult } from './xpub_lookup.interface';
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
    /**
     * Standard module endpoints.
     * Custom - chain specific - endpoints have to be listed below in the custom section.
     */
    status?: (blockchain?: Blockchains) => Promise<ModuleResponse<NetworkStatusResult>>;
    networkFee?: (blockchain: Blockchains) => Promise<ModuleResponse<NetworkFeeResult>>;
    tokenDiscovery?: (blockchain: Blockchains, assetType: AssetTypes, addrXpub: string) => Promise<ModuleResponse<Array<TokenDiscoveryResult>>>;
    balanceLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string) => Promise<ModuleResponse<BalanceLookupResult>>;
    eventsLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, from: number, to: number, minimal?: boolean) => Promise<ModuleResponse<Array<EventLookupResult> | Array<string>>>;
    utxoLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string) => Promise<ModuleResponse<Array<UtxoLookupResult>>>;
    broadcast?: (blockchain: Blockchains, assetType: AssetTypes, transactionHex: string) => Promise<ModuleResponse<BroadcastResult>>;
    transactionStatus?: (blockchain: Blockchains, assetType: AssetTypes, addrXpub: string, transactionId: string) => Promise<ModuleResponse<TransactionStatusResult>>;
    resolveAlias?: (blockchain: Blockchains, assetType: AssetTypes, alias: string) => Promise<ModuleResponse<ResolveAliasResult>>;
    reverseResolveAlias?: (blockchain: Blockchains, assetType: AssetTypes, addrXpub: string) => Promise<ModuleResponse<ReverseResolveAliasResult>>;
    estimateGas?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, value: string, abi: string, from: string, gasLimit: string) => Promise<ModuleResponse<EstimateGasResult>>;
    nonceLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string) => Promise<ModuleResponse<NonceLookupResult>>;
    publicKey?: (blockchain: Blockchains, addrXpub: string) => Promise<ModuleResponse<PublicKeyLookupResult>>;
    txidsLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpubs: string[], to: number) => Promise<ModuleResponse<Array<TxidsLookupResult>>>;
    utxoXpubLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, confirmed: boolean, xpub: string) => Promise<ModuleResponse<UtxoXpubLookupResult>>;
    xpubLookup?: (blockchain: Blockchains, assetType: AssetTypes, assetId: string, tokens: XpubLookupRequestTokens, type: XpubLookupRequestType, xpub: string, from: number, to: number) => Promise<ModuleResponse<XpubLookupResult>>;
    /**
     * Custom endpoints.
     */
    customHeatAccount?: (blockchain: Blockchains, _addrXpub: string) => Promise<ModuleResponse<CustomHeatAccountResult>>;
}
