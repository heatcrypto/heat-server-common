import { CallContext } from "./call_context.interface"
import { BalanceLookupParam, BalanceLookupResult } from './balance_lookup.interface'
import { ModuleResponse } from "../module-response"
import { EventLookupParam, EventLookupResult } from "./event_lookup.interface"
import { NetworkFeeParam, NetworkFeeResult } from "./network_fee.interface"
import { NetworkStatusParam, NetworkStatusResult } from "./network_status.interface"
import { PublicKeyLookupParam, PublicKeyLookupResult } from "./publickey_lookup.interface"
import { ResolveAliasParam, ResolveAliasResult, ReverseResolveAliasParam, ReverseResolveAliasResult } from "./alias_lookup.interface"
import { TokenDiscoveryParam, TokenDiscoveryResult } from "./token_discovery.interface"
import { TransactionStatusParam, TransactionStatusResult } from "./transaction_status.interface"
import { UtxoLookupParam, UtxoLookupResult } from "./utxo_lookup.interface"
import { BroadcastParam, BroadcastResult } from "./broadcast.interface"
import { CustomHeatAccountParam, CustomHeatAccountResult } from "./custom_heat.interface"
import { EstimateGasParam, EstimateGasResult } from "./estimate_gas.interface"
import { NonceLookupParam, NonceLookupResult } from "./nonce_lookup.interface"
import { TxidsLookupParam, TxidsLookupResult } from "./txids_lookup.interface"
import { UtxoXpubLookupParam, UtxoXpubLookupResult } from "./utxo_xpub_lookup.interface"
import { XpubLookupParam, XpubLookupResult } from "./xpub_lookup.interface"
import { CustomFimkDgsGoodParam, CustomFimkDgsGoodResult } from "./custom_fimk.interface"
import { AddressExistsLookupParam, AddressExistsLookupResult } from "./address_exists_lookup.interface"

export interface ModuleProvider {
  balanceLookup?: (context: CallContext, param: BalanceLookupParam) => Promise<ModuleResponse<BalanceLookupResult>> 
  broadcast?: (context: CallContext, param: BroadcastParam) => Promise<ModuleResponse<BroadcastResult>>
  eventLookup?: (context: CallContext, param: EventLookupParam) => Promise<ModuleResponse<Array<EventLookupResult>>>
  networkFee?: (context: CallContext, param: NetworkFeeParam) => Promise<ModuleResponse<NetworkFeeResult>> 
  networkStatus?: (context: CallContext, param: NetworkStatusParam) => Promise<ModuleResponse<NetworkStatusResult>> 
  publicKeyLookup?: (context: CallContext, param: PublicKeyLookupParam) => Promise<ModuleResponse<PublicKeyLookupResult>> 
  resolveAlias?: (context: CallContext, param: ResolveAliasParam) => Promise<ModuleResponse<ResolveAliasResult>>
  reverseResolveAlias?: (context: CallContext, param: ReverseResolveAliasParam) => Promise<ModuleResponse<ReverseResolveAliasResult>>
  estimateGas?: (context: CallContext, param: EstimateGasParam) => Promise<ModuleResponse<EstimateGasResult>>  
  tokenDiscovery?: (context: CallContext, param: TokenDiscoveryParam) => Promise<ModuleResponse<Array<TokenDiscoveryResult>>>
  transactionStatus?: (context: CallContext, param: TransactionStatusParam) => Promise<ModuleResponse<TransactionStatusResult>>
  utxoLookup?: (context: CallContext, param: UtxoLookupParam) => Promise<ModuleResponse<Array<UtxoLookupResult>>>
  nonceLookup?: (context: CallContext, param: NonceLookupParam) => Promise<ModuleResponse<NonceLookupResult>>
  txidsLookup?: (context: CallContext, param: TxidsLookupParam) => Promise<ModuleResponse<Array<TxidsLookupResult>>>
  utxoXpubLookup?: (context: CallContext, param: UtxoXpubLookupParam) => Promise<ModuleResponse<Array<UtxoXpubLookupResult>>>
  xpubLookup?: (context: CallContext, param: XpubLookupParam) => Promise<ModuleResponse<XpubLookupResult>>
  addressExistsLookup?: (context: CallContext, param: AddressExistsLookupParam) => Promise<ModuleResponse<AddressExistsLookupResult>>

  /* Custom modules */
  customHeatAccount?: (context: CallContext, param: CustomHeatAccountParam) => Promise<ModuleResponse<CustomHeatAccountResult>>
  customFimkDgsGood?: (context: CallContext, param: CustomFimkDgsGoodParam) => Promise<ModuleResponse<CustomFimkDgsGoodResult>>
}