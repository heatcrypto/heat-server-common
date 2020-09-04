import { Blockchains } from '../constants' 

export interface NetworkStatusParam { 
  /**
   * Enum of blockchain identifiers
   */ 
  blockchain?: Blockchains
}

export interface NetworkStatusResult {
  /**
   * The height of the last block
   */
  lastBlockHeight: number;

  /**
   * The last block timestamp in UTC format
   */
  lastBlockTime: Date;

  /**
   * The unique block id (hex encoded)
   */
  lastBlockId: string;
}