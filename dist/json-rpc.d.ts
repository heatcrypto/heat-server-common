import { CoreOptions } from 'request';
import { JSONRPCClient } from "json-rpc-2.0";
import { MonitoredRequest } from './monitored-request';
export declare function createJsonRpcId(): number;
/**
 * Multi request
 *
 * const jsonRPCRequest: JSONRPCRequest = {
 *   jsonrpc: JSONRPC,
 *   id: createID(),
 *   method: "doSomething",
 *   params: {
 *     foo: "foo",
 *     bar: "bar",
 *   },
 * };
 *
 * // Advanced method takes a raw JSON-RPC request and returns a raw JSON-RPC response
 * // It can also send an array of requests, in which case it returns an array of responses.
 * client
 *   .requestAdvanced(jsonRPCRequest)
 *   .then((jsonRPCResponse: JSONRPCResponse) => {
 *     if (jsonRPCResponse.error) {
 *       console.log(
 *         `Received an error with code ${jsonRPCResponse.error.code} and message ${jsonRPCResponse.error.message}`
 *       );
 *     } else {
 *       doSomethingWithResult(jsonRPCResponse.result);
 *     }
 *   });
 */
export declare class JsonRpc {
    private req;
    private endpoint;
    private options?;
    private _client;
    constructor(req: MonitoredRequest, endpoint: string, options?: CoreOptions | undefined);
    get client(): JSONRPCClient;
    private createClient;
}
