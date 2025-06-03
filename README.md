# heat-server-common

Shared utils and interfaces used between heat mobile server backend and custom blockchain protocol plugins.

## New EVENT_INTERNAL_TRANSFER

The `EVENT_INTERNAL_TRANSFER` event type has been added to handle internal transfers between contracts (e.g., ERC20 token transfers between smart contracts).

### Example Usage

```typescript
import { buildEventInternalTransfer, AssetTypes } from 'heat-server-common';

// Example based on tokenTransfers API data
const internalTransferEvent = buildEventInternalTransfer(
  "0x6EE3117F7EAC88363cb241138027F03904d109b0", // from contract
  "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852", // to contract  
  "300000000", // value
  "0xdAC17F958D2ee523a2206206994597C13D831ec7", // assetId (token contract address)
  AssetTypes.TOKEN_TYPE_1, // asset type
  "Tether USD", // token name (optional)
  "USDT", // token symbol (optional)
  6, // token decimals (optional)
  "ERC20" // standard (optional)
);
```

Note: The token contract address is specified as `assetId` (consistent with the rest of the codebase), eliminating the need for a separate `contractAddress` field.
