import { ExplorerApi, ExplorerMiddleware } from "./types/explorer.interface";
import { CallContext } from "./types/call_context.interface";
import { ModuleProvider } from "./types/module_provider.interface";
import { PrefixLogger } from "./prefix-logger";
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
import { MonitoredRequest } from "./monitored-request";
import { BroadcastResult } from "./types/broadcast.interface";
import { LoggerService } from "./types/logger.interface";
import { createLogger } from "./logger-adapter";
import { EstimateGasResult } from "./types/estimate_gas.interface";
import { NonceLookupResult } from "./types/nonce_lookup.interface";
import { TxidsLookupResult } from "./types/txids_lookup.interface";
import { XpubLookupRequestTokens, XpubLookupRequestType, XpubLookupResult } from "./types/xpub_lookup.interface";
import { UtxoXpubLookupResult } from "./types/utxo_xpub_lookup.interface";
import { CustomFimkDgsGoodResult } from "./types/custom_fimk.interface";
import { CoreOptions } from "request";
import { JsonRpc } from "./json-rpc";
import { isFunction } from "lodash";
import { MonitoredRequestMonitor } from "./monitored-request-monitor";

export type CreateCoreOptions = (label: string) => CoreOptions;

export class ExplorerBase implements ExplorerApi {
  private logger: LoggerService;

  constructor(
    public readonly id: string,
    public readonly protocol: string,
    public readonly host: string,
    private readonly provider: ModuleProvider,
    public readonly middleWare?: ExplorerMiddleware,
    private readonly createCoreOptions?: CreateCoreOptions,
  ) {
    const logger = createLogger()
    this.logger = new PrefixLogger(logger, this.id)
  }

  private createContext(label: string, monitor?: MonitoredRequestMonitor): CallContext {
    const req = new MonitoredRequest(createLogger(), label, monitor);
    const endpoint = `${this.protocol}://${this.host}`;
    const options = isFunction(this.createCoreOptions) ? this.createCoreOptions(label) : {}
    const jsonRpc = new JsonRpc(req, endpoint, options)
    let context: CallContext = {
      host: this.host,
      protocol: this.protocol,
      logger: this.logger,
      req: req,
      jsonRpc: jsonRpc,
      middleWare: this.middleWare,
      createCoreOptions: this.createCoreOptions,
    }
    return context
  }

  status(
    blockchain?: Blockchains,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<NetworkStatusResult>> {
    const { networkStatus } = this.provider
    if (!networkStatus) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return networkStatus(this.createContext('Status', monitor), { blockchain })
  }

  networkFee(
    blockchain: Blockchains,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<NetworkFeeResult>> {
    const { networkFee } = this.provider
    if (!networkFee) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return networkFee(this.createContext('Fee', monitor), { blockchain })
  }

  tokenDiscovery(
    blockchain: Blockchains,
    assetType: AssetTypes,
    addrXpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<Array<TokenDiscoveryResult>>> {
    const { tokenDiscovery } = this.provider
    if (!tokenDiscovery) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return tokenDiscovery(this.createContext('Token', monitor), {
      blockchain, assetType, addrXpub
    })
  }

  balanceLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<BalanceLookupResult>> {
    const { balanceLookup } = this.provider
    if (!balanceLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return balanceLookup(this.createContext('Balance', monitor), {
      blockchain, assetType, assetId, addrXpub
    })
  }

  eventsLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpub: string,
    from: number,
    to: number,
    minimal?: boolean,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<Array<EventLookupResult> | Array<string>>> {
    const { eventLookup } = this.provider
    if (!eventLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return eventLookup(this.createContext('Event', monitor), {
      blockchain,
      assetType,
      assetId,
      addrXpub,
      from,
      to,
      minimal,
    })
  }

  utxoLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<Array<UtxoLookupResult>>> {
    const { utxoLookup } = this.provider
    if (!utxoLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return utxoLookup(this.createContext('Utxo', monitor), {
      blockchain,
      assetType,
      assetId,
      addrXpub
    })
  }

  broadcast(
    blockchain: Blockchains,
    assetType: AssetTypes,
    transactionHex: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<BroadcastResult>> {
    const { broadcast } = this.provider
    if (!broadcast) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return broadcast(this.createContext('Broadcast', monitor), {
      blockchain,
      assetType,
      transactionHex
    })
  }

  transactionStatus(
    blockchain: Blockchains,
    assetType: AssetTypes,
    addrXpub: string,
    transactionId: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<TransactionStatusResult>> {
    const { transactionStatus } = this.provider
    if (!transactionStatus) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return transactionStatus(this.createContext('TxStatus', monitor), {
      blockchain,
      assetType,
      addrXpub,
      transactionId,
    })
  }

  resolveAlias(
    blockchain: Blockchains,
    assetType: AssetTypes,
    alias: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<ResolveAliasResult>> {
    const { resolveAlias } = this.provider
    if (!resolveAlias) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return resolveAlias(this.createContext('Resolve', monitor), {
      blockchain,
      assetType,
      alias
    })
  }

  reverseResolveAlias(
    blockchain: Blockchains,
    assetType: AssetTypes,
    addrXpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<ReverseResolveAliasResult>> {
    const { reverseResolveAlias } = this.provider
    if (!reverseResolveAlias) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return reverseResolveAlias(this.createContext('Reverse', monitor), {
      blockchain, assetType, addrXpub
    })
  }

  estimateGas(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpub: string,
    value: string,
    abi: string,
    from: string,
    gasLimit: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<EstimateGasResult>> {
    const { estimateGas } = this.provider
    if (!estimateGas) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return estimateGas(this.createContext('Estimate', monitor), {
      blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit
    })
  }

  nonceLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<NonceLookupResult>> {
    const { nonceLookup } = this.provider
    if (!nonceLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return nonceLookup(this.createContext('Nonce', monitor), {
      blockchain, assetType, assetId, addrXpub,
    })
  }

  publicKey(
    blockchain: Blockchains,
    addrXpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<PublicKeyLookupResult>> {
    const { publicKeyLookup } = this.provider
    if (!publicKeyLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return publicKeyLookup(this.createContext('PublicKey', monitor), {
      blockchain, addrXpub
    })
  }

  txidsLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpubs: string[],
    to: number,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<Array<TxidsLookupResult>>> {
    const { txidsLookup } = this.provider
    if (!txidsLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return txidsLookup(this.createContext('Txids', monitor), {
      blockchain,
      assetType,
      assetId,
      addrXpubs,
      to,
    })
  }

  utxoXpubLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    confirmed: boolean,
    xpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<Array<UtxoXpubLookupResult>>> {
    const { utxoXpubLookup } = this.provider
    if (!utxoXpubLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return utxoXpubLookup(this.createContext('Utxo xpub', monitor), {
      blockchain,
      assetType,
      assetId,
      confirmed,
      xpub,
    })
  }

  xpubLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    tokens: XpubLookupRequestTokens,
    type: XpubLookupRequestType,
    xpub: string,
    from: number,
    to: number,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<XpubLookupResult>> {
    const { xpubLookup } = this.provider
    if (!xpubLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return xpubLookup(this.createContext('Xpub', monitor), {
      blockchain,
      assetType,
      assetId,
      tokens,
      type,
      xpub,
      from,
      to,
    })
  }

  /**
   * Custom endpoints.
   */

  customHeatAccount(
    blockchain: Blockchains,
    addrXpub: string,
    monitor?: MonitoredRequestMonitor
  ): Promise<ModuleResponse<CustomHeatAccountResult>> {
    const { customHeatAccount } = this.provider
    if (!customHeatAccount) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return customHeatAccount(this.createContext('HeatAccount', monitor), {
      blockchain,
      addrXpub
    })
  }

  customFimkDgsGood(
    blockchain: Blockchains, 
    goods: string, 
    includeCounts?: boolean | undefined,
    monitor?: MonitoredRequestMonitor
  ) : Promise<ModuleResponse<CustomFimkDgsGoodResult>> {
    const { customFimkDgsGood } = this.provider
    if (!customFimkDgsGood) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return customFimkDgsGood(this.createContext('FimkDgsGood', monitor), {
      blockchain,
      goods,
      includeCounts: includeCounts == true,
    })
  }
}