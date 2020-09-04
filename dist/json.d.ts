import { Logger } from '@nestjs/common';
export declare function stringify(object: any, replacer?: any, indent?: any): string;
export declare function prettyPrint(object: any): any;
export declare function tryParse(jsonStr: string, logger?: Logger): any;
