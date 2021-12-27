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
export declare class ExplorerBase implements ExplorerApi {
    readonly id: string;
    readonly protocol: string;
    readonly host: string;
    private readonly provider;
    readonly middleWare?: ExplorerMiddleware | undefined;
    private logger;
    constructor(id: string, protocol: string, host: string, provider: ModuleProvider, middleWare?: ExplorerMiddleware | undefined);
    private createContext;
    status(blockchain?: Blockchains): Promise<ModuleResponse<NetworkStatusResult>>;
    networkFee(blockchain: Blockchains): Promise<ModuleResponse<NetworkFeeResult>>;
    tokenDiscovery(blockchain: Blockchains, assetType: AssetTypes, addrXpub: string): Promise<ModuleResponse<Array<TokenDiscoveryResult>>>;
    balanceLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string): Promise<ModuleResponse<BalanceLookupResult>>;
    eventsLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, from: number, to: number, minimal?: boolean): Promise<ModuleResponse<Array<EventLookupResult> | Array<string>>>;
    utxoLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string): Promise<ModuleResponse<Array<UtxoLookupResult>>>;
    broadcast(blockchain: Blockchains, assetType: AssetTypes, transactionHex: string): Promise<ModuleResponse<BroadcastResult>>;
    transactionStatus(blockchain: Blockchains, assetType: AssetTypes, addrXpub: string, transactionId: string): Promise<ModuleResponse<TransactionStatusResult>>;
    resolveAlias(blockchain: Blockchains, assetType: AssetTypes, alias: string): Promise<ModuleResponse<ResolveAliasResult>>;
    reverseResolveAlias(blockchain: Blockchains, assetType: AssetTypes, addrXpub: string): Promise<ModuleResponse<ReverseResolveAliasResult>>;
    estimateGas(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string, value: string, abi: string, from: string, gasLimit: string): Promise<ModuleResponse<EstimateGasResult>>;
    nonceLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpub: string): Promise<ModuleResponse<NonceLookupResult>>;
    publicKey(blockchain: Blockchains, addrXpub: string): Promise<ModuleResponse<PublicKeyLookupResult>>;
    txidsLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, addrXpubs: string[], to: number): Promise<ModuleResponse<Array<TxidsLookupResult>>>;
    utxoXpubLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, confirmed: boolean, xpub: string): Promise<ModuleResponse<UtxoXpubLookupResult>>;
    xpubLookup(blockchain: Blockchains, assetType: AssetTypes, assetId: string, tokens: XpubLookupRequestTokens, type: XpubLookupRequestType, xpub: string, from: number, to: number): Promise<ModuleResponse<XpubLookupResult>>;
    /**
     * Custom endpoints.
     */
    customHeatAccount(blockchain: Blockchains, addrXpub: string): Promise<ModuleResponse<CustomHeatAccountResult>>;
}
