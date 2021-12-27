"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpubLookupRequestType = exports.XpubLookupRequestTokens = void 0;
var XpubLookupRequestTokens;
(function (XpubLookupRequestTokens) {
    XpubLookupRequestTokens[XpubLookupRequestTokens["NON_ZERO"] = 0] = "NON_ZERO";
    XpubLookupRequestTokens[XpubLookupRequestTokens["USED"] = 1] = "USED";
})(XpubLookupRequestTokens = exports.XpubLookupRequestTokens || (exports.XpubLookupRequestTokens = {}));
var XpubLookupRequestType;
(function (XpubLookupRequestType) {
    XpubLookupRequestType[XpubLookupRequestType["TXS"] = 0] = "TXS";
    XpubLookupRequestType[XpubLookupRequestType["TXIDS"] = 1] = "TXIDS";
})(XpubLookupRequestType = exports.XpubLookupRequestType || (exports.XpubLookupRequestType = {}));
