import { EthereumSpecificData, BitcoinSpecificData, TransactionSpecificData } from "./types/specific-data";
import { TransactionDataTypes, Blockchains } from "./constants";
/**
 * Maps blockchain enum to transaction data type
 * @param blockchain - The blockchain enum value
 * @returns {TransactionDataTypes}
 */
export declare function getTransactionDataType(blockchain: Blockchains): TransactionDataTypes;
/**
 * Creates transaction-specific data array for serialization based on blockchain type
 * @param specific - The blockchain-specific transaction data with type discriminator
 * @returns {Array<any>}
 */
export declare function createTransactionSpecificData(specific: TransactionSpecificData): Array<any>;
/**
 * Unpacks transaction-specific data array based on blockchain type
 * @param type - The blockchain architecture type
 * @param data - The serialized data array (first element should be the type)
 * @returns {TransactionSpecificData | undefined}
 */
export declare function unpackTransactionSpecificData(type: TransactionDataTypes, data: Array<any>): TransactionSpecificData | undefined;
export declare function dataEthereumSpecific(data: EthereumSpecificData['data']): any[];
export declare function unpackDataEthereumSpecific(data: Array<any>): EthereumSpecificData['data'] | undefined;
export declare function dataBitcoinSpecific(data: BitcoinSpecificData['data']): (number | boolean)[];
export declare function unpackDataBitcoinSpecific(data: Array<any>): BitcoinSpecificData['data'] | undefined;
