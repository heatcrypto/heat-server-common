import { CallContext } from "./call_context.interface";
import { BalanceLookupParam, BalanceLookupResult } from './balance_lookup.interface';
import { ModuleResponse } from "../module-response";
import { EventLookupParam, EventLookupResult } from "./event_lookup.interface";
import { NetworkFeeParam, NetworkFeeResult } from "./network_fee.interface";
import { NetworkStatusParam, NetworkStatusResult } from "./network_status.interface";
import { PublicKeyLookupParam, PublicKeyLookupResult } from "./publickey_lookup.interface";
import { ResolveAliasParam, ResolveAliasResult, ReverseResolveAliasParam, ReverseResolveAliasResult } from "./alias_lookup.interface";
import { TokenDiscoveryParam, TokenDiscoveryResult } from "./token_discovery.interface";
import { TransactionStatusParam, TransactionStatusResult } from "./transaction_status.interface";
import { UtxoLookupParam, UtxoLookupResult } from "./utxo_lookup.interface";
import { BroadcastParam, BroadcastResult } from "./broadcast.interface";
import { CustomHeatAccountParam, CustomHeatAccountResult } from "./custom_heat.interface";
export interface ModuleProvider {
    balanceLookup?: (context: CallContext, param: BalanceLookupParam) => Promise<ModuleResponse<BalanceLookupResult>>;
    eventLookup?: (context: CallContext, param: EventLookupParam) => Promise<ModuleResponse<Array<EventLookupResult>>>;
    networkFee?: (context: CallContext, param: NetworkFeeParam) => Promise<ModuleResponse<NetworkFeeResult>>;
    networkStatus?: (context: CallContext, param: NetworkStatusParam) => Promise<ModuleResponse<NetworkStatusResult>>;
    publicKeyLookup?: (context: CallContext, param: PublicKeyLookupParam) => Promise<ModuleResponse<PublicKeyLookupResult>>;
    resolveAlias?: (context: CallContext, param: ResolveAliasParam) => Promise<ModuleResponse<ResolveAliasResult>>;
    reverseResolveAlias?: (context: CallContext, param: ReverseResolveAliasParam) => Promise<ModuleResponse<ReverseResolveAliasResult>>;
    tokenDiscovery?: (context: CallContext, param: TokenDiscoveryParam) => Promise<ModuleResponse<Array<TokenDiscoveryResult>>>;
    transactionStatus?: (context: CallContext, param: TransactionStatusParam) => Promise<ModuleResponse<TransactionStatusResult>>;
    utxoLookup?: (context: CallContext, param: UtxoLookupParam) => Promise<ModuleResponse<Array<UtxoLookupResult>>>;
    broadcast?: (context: CallContext, param: BroadcastParam) => Promise<ModuleResponse<BroadcastResult>>;
    customHeatAccount?: (context: CallContext, param: CustomHeatAccountParam) => Promise<ModuleResponse<CustomHeatAccountResult>>;
}
