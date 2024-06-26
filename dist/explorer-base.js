"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplorerBase = void 0;
var prefix_logger_1 = require("./prefix-logger");
var monitored_request_1 = require("./monitored-request");
var logger_adapter_1 = require("./logger-adapter");
var json_rpc_1 = require("./json-rpc");
var lodash_1 = require("lodash");
var ExplorerBase = /** @class */ (function () {
    function ExplorerBase(id, protocol, host, provider, middleWare, createCoreOptions, monitoredRequestFactory) {
        this.id = id;
        this.protocol = protocol;
        this.host = host;
        this.provider = provider;
        this.middleWare = middleWare;
        this.createCoreOptions = createCoreOptions;
        this.monitoredRequestFactory = monitoredRequestFactory;
        var logger = (0, logger_adapter_1.createLogger)();
        this.logger = new prefix_logger_1.PrefixLogger(logger, this.id);
    }
    /**
     * Only if the MonitoredRequestFactory created this explorers MonitoredRequest
     * it will be returned from this method. This allows external apps to access
     * the MonitoredRequest and inspect its current job-queue.
     */
    ExplorerBase.prototype.getFactoryManagedMonitoredRequest = function () {
        return this.factoryManagedMonitoredRequest;
    };
    ExplorerBase.prototype.getOrCreateMonitoredRequest = function (logger, prefix, monitor) {
        if (this.monitoredRequestFactory) {
            if (!this.factoryManagedMonitoredRequest) {
                var overriddenPrefix = 'Shared Instance';
                this.factoryManagedMonitoredRequest = this.monitoredRequestFactory.createMonitoredRequest(logger, overriddenPrefix, monitor);
            }
            return this.factoryManagedMonitoredRequest;
        }
        return new monitored_request_1.MonitoredRequest(logger, prefix, monitor);
    };
    ExplorerBase.prototype.createContext = function (label, monitor) {
        // const req = new MonitoredRequest(createLogger(), label, monitor);
        var req = this.getOrCreateMonitoredRequest((0, logger_adapter_1.createLogger)(), label, monitor);
        var endpoint = "".concat(this.protocol, "://").concat(this.host);
        var options = (0, lodash_1.isFunction)(this.createCoreOptions)
            ? this.createCoreOptions(label)
            : {};
        var jsonRpc = new json_rpc_1.JsonRpc(req, endpoint, options);
        var context = {
            host: this.host,
            protocol: this.protocol,
            logger: this.logger,
            req: req,
            jsonRpc: jsonRpc,
            middleWare: this.middleWare,
            createCoreOptions: this.createCoreOptions,
        };
        return context;
    };
    ExplorerBase.prototype.blockLookup = function (blockchain, height, monitor) {
        var blockLookup = this.provider.blockLookup;
        if (!blockLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return blockLookup(this.createContext("Block", monitor), {
            blockchain: blockchain,
            height: height,
        });
    };
    ExplorerBase.prototype.status = function (blockchain, monitor) {
        var networkStatus = this.provider.networkStatus;
        if (!networkStatus) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return networkStatus(this.createContext("Status", monitor), { blockchain: blockchain });
    };
    ExplorerBase.prototype.networkFee = function (blockchain, monitor) {
        var networkFee = this.provider.networkFee;
        if (!networkFee) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return networkFee(this.createContext("Fee", monitor), { blockchain: blockchain });
    };
    ExplorerBase.prototype.tokenDiscovery = function (blockchain, assetType, addrXpub, monitor) {
        var tokenDiscovery = this.provider.tokenDiscovery;
        if (!tokenDiscovery) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return tokenDiscovery(this.createContext("Token", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.balanceLookup = function (blockchain, assetType, assetId, addrXpub, monitor) {
        var balanceLookup = this.provider.balanceLookup;
        if (!balanceLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return balanceLookup(this.createContext("Balance", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.eventsLookup = function (blockchain, assetType, assetId, addrXpub, from, to, minimal, monitor) {
        var eventLookup = this.provider.eventLookup;
        if (!eventLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return eventLookup(this.createContext("Event", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
            from: from,
            to: to,
            minimal: minimal,
        });
    };
    ExplorerBase.prototype.utxoLookup = function (blockchain, assetType, assetId, addrXpub, monitor) {
        var utxoLookup = this.provider.utxoLookup;
        if (!utxoLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return utxoLookup(this.createContext("Utxo", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.broadcast = function (blockchain, assetType, transactionHex, monitor) {
        var broadcast = this.provider.broadcast;
        if (!broadcast) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return broadcast(this.createContext("Broadcast", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            transactionHex: transactionHex,
        });
    };
    ExplorerBase.prototype.transactionStatus = function (blockchain, assetType, addrXpub, transactionId, includeHex, monitor) {
        var transactionStatus = this.provider.transactionStatus;
        if (!transactionStatus) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return transactionStatus(this.createContext("TxStatus", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            addrXpub: addrXpub,
            transactionId: transactionId,
            includeHex: includeHex,
        });
    };
    ExplorerBase.prototype.resolveAlias = function (blockchain, assetType, alias, monitor) {
        var resolveAlias = this.provider.resolveAlias;
        if (!resolveAlias) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return resolveAlias(this.createContext("Resolve", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            alias: alias,
        });
    };
    ExplorerBase.prototype.reverseResolveAlias = function (blockchain, assetType, addrXpub, monitor) {
        var reverseResolveAlias = this.provider.reverseResolveAlias;
        if (!reverseResolveAlias) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return reverseResolveAlias(this.createContext("Reverse", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.estimateGas = function (blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit, monitor) {
        var estimateGas = this.provider.estimateGas;
        if (!estimateGas) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return estimateGas(this.createContext("Estimate", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
            value: value,
            abi: abi,
            from: from,
            gasLimit: gasLimit,
        });
    };
    ExplorerBase.prototype.nonceLookup = function (blockchain, assetType, assetId, addrXpub, monitor) {
        var nonceLookup = this.provider.nonceLookup;
        if (!nonceLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return nonceLookup(this.createContext("Nonce", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.publicKey = function (blockchain, addrXpub, monitor) {
        var publicKeyLookup = this.provider.publicKeyLookup;
        if (!publicKeyLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return publicKeyLookup(this.createContext("PublicKey", monitor), {
            blockchain: blockchain,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.txidsLookup = function (blockchain, assetType, assetId, addrXpubs, to, monitor) {
        var txidsLookup = this.provider.txidsLookup;
        if (!txidsLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return txidsLookup(this.createContext("Txids", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpubs: addrXpubs,
            to: to,
        });
    };
    ExplorerBase.prototype.utxoXpubLookup = function (blockchain, assetType, assetId, confirmed, xpub, monitor) {
        var utxoXpubLookup = this.provider.utxoXpubLookup;
        if (!utxoXpubLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return utxoXpubLookup(this.createContext("Utxo xpub", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            confirmed: confirmed,
            xpub: xpub,
        });
    };
    ExplorerBase.prototype.xpubLookup = function (blockchain, assetType, assetId, tokens, type, xpub, from, to, monitor) {
        var xpubLookup = this.provider.xpubLookup;
        if (!xpubLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return xpubLookup(this.createContext("Xpub", monitor), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            tokens: tokens,
            type: type,
            xpub: xpub,
            from: from,
            to: to,
        });
    };
    ExplorerBase.prototype.addressExistsLookup = function (blockchain, addrXpub, monitor) {
        var addressExistsLookup = this.provider.addressExistsLookup;
        if (!addressExistsLookup) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return addressExistsLookup(this.createContext("Address exists", monitor), {
            blockchain: blockchain,
            addrXpub: addrXpub,
        });
    };
    /**
     * Custom endpoints.
     */
    ExplorerBase.prototype.customHeatAccount = function (blockchain, addrXpub, monitor) {
        var customHeatAccount = this.provider.customHeatAccount;
        if (!customHeatAccount) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return customHeatAccount(this.createContext("HeatAccount", monitor), {
            blockchain: blockchain,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.customFimkDgsGood = function (blockchain, goods, includeCounts, monitor) {
        var customFimkDgsGood = this.provider.customFimkDgsGood;
        if (!customFimkDgsGood) {
            return Promise.resolve({ error: "Not implemented" });
        }
        return customFimkDgsGood(this.createContext("FimkDgsGood", monitor), {
            blockchain: blockchain,
            goods: goods,
            includeCounts: includeCounts == true,
        });
    };
    return ExplorerBase;
}());
exports.ExplorerBase = ExplorerBase;
