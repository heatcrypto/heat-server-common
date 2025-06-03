import { TransactionDataTypes } from '../constants';
/**
 * No specific transaction data (for blockchains not yet categorized or implemented)
 */
export interface NoneSpecificData {
    type: TransactionDataTypes.NONE;
    data: {};
}
/**
 * Ethereum-type transaction data (account-based blockchains)
 */
export interface EthereumSpecificData {
    type: TransactionDataTypes.ETHEREUM_TYPE;
    data: {
        type?: number;
        createdContract?: string;
        status: number;
        error?: string;
        nonce: number;
        gasLimit: string;
        gasUsed?: string;
        gasPrice?: string;
        maxPriorityFeePerGas?: string;
        maxFeePerGas?: string;
        baseFeePerGas?: string;
        l1Fee?: string;
        l1FeeScalar?: string;
        l1GasPrice?: string;
        l1GasUsed?: string;
        data?: string;
        parsedData?: any;
        internalTransfers?: any[];
    };
}
/**
 * Bitcoin-type transaction data (UTXO-based blockchains)
 */
export interface BitcoinSpecificData {
    type: TransactionDataTypes.BITCOIN_TYPE;
    data: {
        size?: number;
        vsize?: number;
        weight?: number;
        rbf?: boolean;
        lockTime?: number;
        version?: number;
    };
}
/**
 * Union type for all blockchain-specific data
 */
export declare type TransactionSpecificData = NoneSpecificData | EthereumSpecificData | BitcoinSpecificData;
