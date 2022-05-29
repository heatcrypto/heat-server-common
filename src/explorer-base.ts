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

export class ExplorerBase implements ExplorerApi {
  private logger: LoggerService;

  constructor(
    public readonly id: string,
    public readonly protocol: string,
    public readonly host: string,
    private readonly provider: ModuleProvider,
    public readonly middleWare?: ExplorerMiddleware,
  ) {
    const logger = createLogger()
    this.logger = new PrefixLogger(logger, this.id)
  }

  private createContext(label: string): CallContext {
    let context: CallContext = {
      host: this.host,
      protocol: this.protocol,
      logger: this.logger,
      req: new MonitoredRequest(createLogger(), label),
      middleWare: this.middleWare
    }
    return context
  }

  status(
    blockchain?: Blockchains,
  ): Promise<ModuleResponse<NetworkStatusResult>> {
    const { networkStatus } = this.provider
    if (!networkStatus) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return networkStatus(this.createContext('Status'), { blockchain })
  }

  networkFee(
    blockchain: Blockchains,
  ): Promise<ModuleResponse<NetworkFeeResult>> {
    const { networkFee } = this.provider
    if (!networkFee) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return networkFee(this.createContext('Fee'), { blockchain })
  }

  tokenDiscovery(
    blockchain: Blockchains,
    assetType: AssetTypes,
    addrXpub: string,
  ): Promise<ModuleResponse<Array<TokenDiscoveryResult>>> {
    const { tokenDiscovery } = this.provider
    if (!tokenDiscovery) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return tokenDiscovery(this.createContext('Token'), {
      blockchain, assetType, addrXpub
    })
  }

  balanceLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpub: string,
  ): Promise<ModuleResponse<BalanceLookupResult>> {
    const { balanceLookup } = this.provider
    if (!balanceLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return balanceLookup(this.createContext('Balance'), {
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
  ): Promise<ModuleResponse<Array<EventLookupResult> | Array<string>>> {
    const { eventLookup } = this.provider
    if (!eventLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return eventLookup(this.createContext('Event'), {
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
  ): Promise<ModuleResponse<Array<UtxoLookupResult>>> {
    const { utxoLookup } = this.provider
    if (!utxoLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return utxoLookup(this.createContext('Utxo'), {
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
  ): Promise<ModuleResponse<BroadcastResult>> {
    const { broadcast } = this.provider
    if (!broadcast) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return broadcast(this.createContext('Broadcast'), {
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
  ): Promise<ModuleResponse<TransactionStatusResult>> {
    const { transactionStatus } = this.provider
    if (!transactionStatus) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return transactionStatus(this.createContext('TxStatus'), {
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
  ): Promise<ModuleResponse<ResolveAliasResult>> {
    const { resolveAlias } = this.provider
    if (!resolveAlias) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return resolveAlias(this.createContext('Resolve'), {
      blockchain,
      assetType,
      alias
    })
  }

  reverseResolveAlias(
    blockchain: Blockchains,
    assetType: AssetTypes,
    addrXpub: string,
  ): Promise<ModuleResponse<ReverseResolveAliasResult>> {
    const { reverseResolveAlias } = this.provider
    if (!reverseResolveAlias) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return reverseResolveAlias(this.createContext('Reverse'), {
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
  ): Promise<ModuleResponse<EstimateGasResult>> {
    const { estimateGas } = this.provider
    if (!estimateGas) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return estimateGas(this.createContext('Estimate'), {
      blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit
    })
  }

  nonceLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpub: string,
  ): Promise<ModuleResponse<NonceLookupResult>> {
    const { nonceLookup } = this.provider
    if (!nonceLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return nonceLookup(this.createContext('Nonce'), {
      blockchain, assetType, assetId, addrXpub,
    })
  }

  publicKey(
    blockchain: Blockchains,
    addrXpub: string,
  ): Promise<ModuleResponse<PublicKeyLookupResult>> {
    const { publicKeyLookup } = this.provider
    if (!publicKeyLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return publicKeyLookup(this.createContext('PublicKey'), {
      blockchain, addrXpub
    })
  }

  txidsLookup(
    blockchain: Blockchains,
    assetType: AssetTypes,
    assetId: string,
    addrXpubs: string[],
    to: number,
  ): Promise<ModuleResponse<Array<TxidsLookupResult>>> {
    const { txidsLookup } = this.provider
    if (!txidsLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return txidsLookup(this.createContext('Txids'), {
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
  ): Promise<ModuleResponse<Array<UtxoXpubLookupResult>>> {
    const { utxoXpubLookup } = this.provider
    if (!utxoXpubLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return utxoXpubLookup(this.createContext('Utxo xpub'), {
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
  ): Promise<ModuleResponse<XpubLookupResult>> {
    const { xpubLookup } = this.provider
    if (!xpubLookup) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return xpubLookup(this.createContext('Xpub'), {
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
  ): Promise<ModuleResponse<CustomHeatAccountResult>> {
    const { customHeatAccount } = this.provider
    if (!customHeatAccount) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return customHeatAccount(this.createContext('HeatAccount'), {
      blockchain,
      addrXpub
    })
  }

  customFimkDgsGood(
    blockchain: Blockchains, 
    goods: string, 
    includeCounts?: boolean | undefined,
  ) : Promise<ModuleResponse<CustomFimkDgsGoodResult>> {
    const { customFimkDgsGood } = this.provider
    if (!customFimkDgsGood) {
      return Promise.resolve({ error: 'Not implemented' })
    }
    return customFimkDgsGood(this.createContext('FimkDgsGood'), {
      blockchain,
      goods,
      includeCounts: includeCounts == true,
    })
  }
}