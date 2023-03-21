import { ExplorerApi, ExplorerMiddleware } from "./types/explorer.interface";
import { ModuleProvider } from "./types/module_provider.interface";
import { Blockchains, AssetTypes } from "./constants";
import { ModuleResponse } from "./module-response";
import { NetworkStatusResult } from "./types/network_status.interface";
import { CustomHeatAccountResult } from "./types/custom_heat.interface";
import { NetworkFeeResult } from "./types/network_fee.interface";
import { TokenDiscoveryResult } from "./types/token_discovery.interface";
import { BalanceLookupResult } from "./types/balance_lookup.interface";
import { EventLookupResult } from "./types/event_lookup.interface";
import { UtxoLookupResult } from "./types/utxo_lookup.interface";
import { TransactionStatusResult } from "./types/transaction_status.interface";
import { ResolveAliasResult, ReverseResolveAliasResult } from "./types/alias_lookup.interface";
import { PublicKeyLookupResult } from "./types/publickey_lookup.interface";
import { BroadcastResult } from "./types/broadcast.interface";
import { EstimateGasResult } from "./types/estimate_gas.interface";
import { NonceLookupResult } from "./types/nonce_lookup.interface";
import { TxidsLookupResult } from "./types/txids_lookup.interface";
import { XpubLookupRequestTokens, XpubLookupRequestType, XpubLookupResult } from "./types/xpub_lookup.interface";
import { UtxoXpubLookupResult } from "./types/utxo_xpub_lookup.interface";
import { CustomFimkDgsGoodResult } from "./types/custom_fimk.interface";
import { CoreOptions } from "request";
import { MonitoredRequestMonitor } from "./monitored-request-monitor";
export declare type CreateCoreOptions = (label: string) => CoreOptions;
export declare class ExplorerBase implements ExplorerApi {
    readonly id: string;
    readonly protocol: string;
    readonly host: string;
    private readonly provider;
    readonly middleWare?: ExplorerMiddleware | undefined;
    private readonly createCoreOptions?;
    private logger;
    constructor(id: string, protocol: string, host: string, provider: ModuleProvider, middleWare?: ExplorerMiddleware | undefined, createCoreOptions?: CreateCoreOptions | undefined);
    private createContext;
    status(blockchain?: Blockchains, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<NetworkStatusResult>>;
    networkFee(blockchain: Blockchains, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<NetworkFeeResult>>;
    tokenDiscovery(blockchain: Blockchains, assetType: AssetTypes, addrXpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<Array<TokenDiscoveryResult>>>;
    balanceLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<BalanceLookupResult>>;
    eventsLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, from: number, to: number, minimal?: boolean, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<Array<EventLookupResult> | Array<string>>>;
    utxoLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<Array<UtxoLookupResult>>>;
    broadcast(blockchain: Blockchains, assetType: AssetTypes, transactionHex: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<BroadcastResult>>;
    transactionStatus(blockchain: Blockchains, assetType: AssetTypes, addrXpub: string, transactionId: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<TransactionStatusResult>>;
    resolveAlias(blockchain: Blockchains, assetType: AssetTypes, alias: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<ResolveAliasResult>>;
    reverseResolveAlias(blockchain: Blockchains, assetType: AssetTypes, addrXpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<ReverseResolveAliasResult>>;
    estimateGas(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, value: string, abi: string, from: string, gasLimit: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<EstimateGasResult>>;
    nonceLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<NonceLookupResult>>;
    publicKey(blockchain: Blockchains, addrXpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<PublicKeyLookupResult>>;
    txidsLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpubs: string[], to: number, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<Array<TxidsLookupResult>>>;
    utxoXpubLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, confirmed: boolean, xpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<Array<UtxoXpubLookupResult>>>;
    xpubLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, tokens: XpubLookupRequestTokens, type: XpubLookupRequestType, xpub: string, from: number, to: number, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<XpubLookupResult>>;
    /**
     * Custom endpoints.
     */
    customHeatAccount(blockchain: Blockchains, addrXpub: string, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<CustomHeatAccountResult>>;
    customFimkDgsGood(blockchain: Blockchains, goods: string, includeCounts?: boolean | undefined, monitor?: MonitoredRequestMonitor): Promise<ModuleResponse<CustomFimkDgsGoodResult>>;
}
