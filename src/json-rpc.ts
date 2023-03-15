import { CoreOptions } from 'request';
import { JSONRPCClient } from "json-rpc-2.0";
import { assign } from "lodash";
import { MonitoredRequest } from './monitored-request';

// To avoid conflict ID between basic and advanced method request, inject a custom ID factory function.
// See https://github.com/shogowada/json-rpc-2.0#client-1 how to send batch requests
let _nextJsonRpcId = 0;
export function createJsonRpcId() {
  return _nextJsonRpcId++;
}

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

export class JsonRpc {
  private _client: JSONRPCClient | null;
  
  constructor(private req: MonitoredRequest, private endpoint: string, private options?: CoreOptions,) { }

  get client(): JSONRPCClient {
    if (!this._client) {
      this._client = this.createClient();
    }
    return this._client;
  }

  private createClient(): JSONRPCClient {
    const options = this.options || {}
    const client = new JSONRPCClient(
      async (jsonRPCRequest) => {
        try {
          const jsonRPCResponse = await this.req.post(
            this.endpoint,
            assign(options, {
              body: JSON.stringify(jsonRPCRequest)
            })
          );
          client.receive(JSON.parse(jsonRPCResponse))
        } catch (e) {
          if (jsonRPCRequest.id !== undefined) {
            return Promise.reject(e);
          }
        }
      },
      createJsonRpcId
    );
    return client;
  }
}