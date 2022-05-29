"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplorerBase = void 0;
var prefix_logger_1 = require("./prefix-logger");
var monitored_request_1 = require("./monitored-request");
var logger_adapter_1 = require("./logger-adapter");
var ExplorerBase = /** @class */ (function () {
    function ExplorerBase(id, protocol, host, provider, middleWare) {
        this.id = id;
        this.protocol = protocol;
        this.host = host;
        this.provider = provider;
        this.middleWare = middleWare;
        var logger = (0, logger_adapter_1.createLogger)();
        this.logger = new prefix_logger_1.PrefixLogger(logger, this.id);
    }
    ExplorerBase.prototype.createContext = function (label) {
        var context = {
            host: this.host,
            protocol: this.protocol,
            logger: this.logger,
            req: new monitored_request_1.MonitoredRequest((0, logger_adapter_1.createLogger)(), label),
            middleWare: this.middleWare
        };
        return context;
    };
    ExplorerBase.prototype.status = function (blockchain) {
        var networkStatus = this.provider.networkStatus;
        if (!networkStatus) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return networkStatus(this.createContext('Status'), { blockchain: blockchain });
    };
    ExplorerBase.prototype.networkFee = function (blockchain) {
        var networkFee = this.provider.networkFee;
        if (!networkFee) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return networkFee(this.createContext('Fee'), { blockchain: blockchain });
    };
    ExplorerBase.prototype.tokenDiscovery = function (blockchain, assetType, addrXpub) {
        var tokenDiscovery = this.provider.tokenDiscovery;
        if (!tokenDiscovery) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return tokenDiscovery(this.createContext('Token'), {
            blockchain: blockchain,
            assetType: assetType,
            addrXpub: addrXpub
        });
    };
    ExplorerBase.prototype.balanceLookup = function (blockchain, assetType, assetId, addrXpub) {
        var balanceLookup = this.provider.balanceLookup;
        if (!balanceLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return balanceLookup(this.createContext('Balance'), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub
        });
    };
    ExplorerBase.prototype.eventsLookup = function (blockchain, assetType, assetId, addrXpub, from, to, minimal) {
        var eventLookup = this.provider.eventLookup;
        if (!eventLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return eventLookup(this.createContext('Event'), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
            from: from,
            to: to,
            minimal: minimal,
        });
    };
    ExplorerBase.prototype.utxoLookup = function (blockchain, assetType, assetId, addrXpub) {
        var utxoLookup = this.provider.utxoLookup;
        if (!utxoLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return utxoLookup(this.createContext('Utxo'), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub
        });
    };
    ExplorerBase.prototype.broadcast = function (blockchain, assetType, transactionHex) {
        var broadcast = this.provider.broadcast;
        if (!broadcast) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return broadcast(this.createContext('Broadcast'), {
            blockchain: blockchain,
            assetType: assetType,
            transactionHex: transactionHex
        });
    };
    ExplorerBase.prototype.transactionStatus = function (blockchain, assetType, addrXpub, transactionId) {
        var transactionStatus = this.provider.transactionStatus;
        if (!transactionStatus) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return transactionStatus(this.createContext('TxStatus'), {
            blockchain: blockchain,
            assetType: assetType,
            addrXpub: addrXpub,
            transactionId: transactionId,
        });
    };
    ExplorerBase.prototype.resolveAlias = function (blockchain, assetType, alias) {
        var resolveAlias = this.provider.resolveAlias;
        if (!resolveAlias) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return resolveAlias(this.createContext('Resolve'), {
            blockchain: blockchain,
            assetType: assetType,
            alias: alias
        });
    };
    ExplorerBase.prototype.reverseResolveAlias = function (blockchain, assetType, addrXpub) {
        var reverseResolveAlias = this.provider.reverseResolveAlias;
        if (!reverseResolveAlias) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return reverseResolveAlias(this.createContext('Reverse'), {
            blockchain: blockchain,
            assetType: assetType,
            addrXpub: addrXpub
        });
    };
    ExplorerBase.prototype.estimateGas = function (blockchain, assetType, assetId, addrXpub, value, abi, from, gasLimit) {
        var estimateGas = this.provider.estimateGas;
        if (!estimateGas) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return estimateGas(this.createContext('Estimate'), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
            value: value,
            abi: abi,
            from: from,
            gasLimit: gasLimit
        });
    };
    ExplorerBase.prototype.nonceLookup = function (blockchain, assetType, assetId, addrXpub) {
        var nonceLookup = this.provider.nonceLookup;
        if (!nonceLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return nonceLookup(this.createContext('Nonce'), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpub: addrXpub,
        });
    };
    ExplorerBase.prototype.publicKey = function (blockchain, addrXpub) {
        var publicKeyLookup = this.provider.publicKeyLookup;
        if (!publicKeyLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return publicKeyLookup(this.createContext('PublicKey'), {
            blockchain: blockchain,
            addrXpub: addrXpub
        });
    };
    ExplorerBase.prototype.txidsLookup = function (blockchain, assetType, assetId, addrXpubs, to) {
        var txidsLookup = this.provider.txidsLookup;
        if (!txidsLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return txidsLookup(this.createContext('Txids'), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            addrXpubs: addrXpubs,
            to: to,
        });
    };
    ExplorerBase.prototype.utxoXpubLookup = function (blockchain, assetType, assetId, confirmed, xpub) {
        var utxoXpubLookup = this.provider.utxoXpubLookup;
        if (!utxoXpubLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return utxoXpubLookup(this.createContext('Utxo xpub'), {
            blockchain: blockchain,
            assetType: assetType,
            assetId: assetId,
            confirmed: confirmed,
            xpub: xpub,
        });
    };
    ExplorerBase.prototype.xpubLookup = function (blockchain, assetType, assetId, tokens, type, xpub, from, to) {
        var xpubLookup = this.provider.xpubLookup;
        if (!xpubLookup) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return xpubLookup(this.createContext('Xpub'), {
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
    /**
     * Custom endpoints.
     */
    ExplorerBase.prototype.customHeatAccount = function (blockchain, addrXpub) {
        var customHeatAccount = this.provider.customHeatAccount;
        if (!customHeatAccount) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return customHeatAccount(this.createContext('HeatAccount'), {
            blockchain: blockchain,
            addrXpub: addrXpub
        });
    };
    ExplorerBase.prototype.customFimkDgsGood = function (blockchain, goods, includeCounts) {
        var customFimkDgsGood = this.provider.customFimkDgsGood;
        if (!customFimkDgsGood) {
            return Promise.resolve({ error: 'Not implemented' });
        }
        return customFimkDgsGood(this.createContext('FimkDgsGood'), {
            blockchain: blockchain,
            goods: goods,
            includeCounts: includeCounts == true,
        });
    };
    return ExplorerBase;
}());
exports.ExplorerBase = ExplorerBase;
