import {
  buildEventStandardType,
  buildEventSend,
  buildEventReceive,
  buildEventOutput,
  buildEventInput,
  buildEventFee,
  buildEventOrderType,
  buildEventBuyOrder,
  buildEventSellOrder,
  buildEventCancelBuy,
  buildEventCancelSell,
  buildEventLeaseBalance,
  buildEventMessageType,
  buildEventMessageSend,
  buildEventMessageReceive,
  buildEventDgsPurchase,
  buildEventDgsDelivery,
  buildEventDgsRefund,
  buildEventInternalTransfer,
  ExtendedAddrXpub,
  EncryptedMessage,
  PlainMessage
} from '../event-builders';
import { EventTypes, AssetTypes, NULL } from '../constants';

describe('Event Builders', () => {
  const mockAddrXpub: ExtendedAddrXpub = {
    addrXpub: 'test-address',
    publicKey: 'test-public-key',
    alias: 'test-alias'
  };

  const mockAddrXpubString = 'test-address-string';

  describe('buildEventStandardType', () => {
    it('should build standard event with ExtendedAddrXpub object', () => {
      const event = buildEventStandardType(
        EventTypes.EVENT_SEND,
        mockAddrXpub,
        AssetTypes.NATIVE,
        'asset-id',
        '1000',
        1,
        { extra: 'data' }
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_SEND,
        assetType: AssetTypes.NATIVE,
        assetId: 'asset-id',
        data: {
          value: '1000',
          addrXpub: 'test-address',
          publicKey: 'test-public-key',
          alias: 'test-alias',
          n: 1,
          specific: { extra: 'data' }
        }
      });
    });

    it('should build standard event with string address', () => {
      const event = buildEventStandardType(
        EventTypes.EVENT_RECEIVE,
        mockAddrXpubString,
        AssetTypes.TOKEN_TYPE_1,
        'token-id',
        '2000',
        2
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_RECEIVE,
        assetType: AssetTypes.TOKEN_TYPE_1,
        assetId: 'token-id',
        data: {
          value: '2000',
          addrXpub: 'test-address-string',
          publicKey: undefined,
          alias: undefined,
          n: 2,
          specific: undefined
        }
      });
    });

    it('should handle undefined n value', () => {
      const event = buildEventStandardType(
        EventTypes.EVENT_SEND,
        mockAddrXpub,
        AssetTypes.NATIVE,
        'asset-id',
        '1000',
        undefined as any
      );

      expect(event.data.n).toBe(0);
    });

    it('should handle zero value', () => {
      const event = buildEventStandardType(
        EventTypes.EVENT_SEND,
        mockAddrXpub,
        AssetTypes.NATIVE,
        'asset-id',
        '0',
        0
      );

      expect(event.data.value).toBe('0');
      expect(event.data.n).toBe(0);
    });
  });

  describe('buildEventSend', () => {
    it('should build send event', () => {
      const event = buildEventSend(
        mockAddrXpub,
        AssetTypes.NATIVE,
        'asset-id',
        '1000',
        1,
        { specific: 'data' }
      );

      expect(event.type).toBe(EventTypes.EVENT_SEND);
      expect(event.data.value).toBe('1000');
      expect(event.data.addrXpub).toBe('test-address');
    });
  });

  describe('buildEventReceive', () => {
    it('should build receive event', () => {
      const event = buildEventReceive(
        mockAddrXpubString,
        AssetTypes.TOKEN_TYPE_1,
        'token-id',
        '2000',
        2
      );

      expect(event.type).toBe(EventTypes.EVENT_RECEIVE);
      expect(event.data.value).toBe('2000');
      expect(event.data.addrXpub).toBe('test-address-string');
    });
  });

  describe('buildEventOutput', () => {
    it('should build output event', () => {
      const event = buildEventOutput(
        mockAddrXpub,
        AssetTypes.NATIVE,
        'asset-id',
        '500',
        0
      );

      expect(event.type).toBe(EventTypes.EVENT_OUTPUT);
      expect(event.data.value).toBe('500');
    });
  });

  describe('buildEventInput', () => {
    it('should build input event', () => {
      const event = buildEventInput(
        mockAddrXpub,
        AssetTypes.NATIVE,
        'asset-id',
        '750',
        1
      );

      expect(event.type).toBe(EventTypes.EVENT_INPUT);
      expect(event.data.value).toBe('750');
    });
  });

  describe('buildEventFee', () => {
    it('should build fee event with default values', () => {
      const event = buildEventFee('100');

      expect(event).toEqual({
        type: EventTypes.EVENT_FEE,
        assetType: AssetTypes.NATIVE,
        assetId: NULL,
        data: {
          value: '100'
        }
      });
    });

    it('should build fee event with custom asset type and id', () => {
      const event = buildEventFee('200', AssetTypes.TOKEN_TYPE_1, 'custom-token');

      expect(event).toEqual({
        type: EventTypes.EVENT_FEE,
        assetType: AssetTypes.TOKEN_TYPE_1,
        assetId: 'custom-token',
        data: {
          value: '200'
        }
      });
    });

    it('should handle zero fee', () => {
      const event = buildEventFee('0');
      expect(event.data.value).toBe('0');
    });
  });

  describe('buildEventOrderType', () => {
    it('should build order event', () => {
      const event = buildEventOrderType(
        EventTypes.EVENT_BUY_ORDER,
        AssetTypes.TOKEN_TYPE_1,
        'asset-id',
        AssetTypes.NATIVE,
        'currency-id',
        '100',
        '50.5'
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_BUY_ORDER,
        assetType: AssetTypes.TOKEN_TYPE_1,
        assetId: 'asset-id',
        data: {
          currencyType: AssetTypes.NATIVE,
          currencyId: 'currency-id',
          quantity: '100',
          price: '50.5'
        }
      });
    });
  });

  describe('buildEventBuyOrder', () => {
    it('should build buy order event', () => {
      const event = buildEventBuyOrder(
        AssetTypes.TOKEN_TYPE_1,
        'asset-id',
        AssetTypes.NATIVE,
        'currency-id',
        '100',
        '25.0'
      );

      expect(event.type).toBe(EventTypes.EVENT_BUY_ORDER);
      expect(event.data.quantity).toBe('100');
      expect(event.data.price).toBe('25.0');
    });
  });

  describe('buildEventSellOrder', () => {
    it('should build sell order event', () => {
      const event = buildEventSellOrder(
        AssetTypes.TOKEN_TYPE_1,
        'asset-id',
        AssetTypes.NATIVE,
        'currency-id',
        '200',
        '30.0'
      );

      expect(event.type).toBe(EventTypes.EVENT_SELL_ORDER);
      expect(event.data.quantity).toBe('200');
      expect(event.data.price).toBe('30.0');
    });
  });

  describe('buildEventCancelBuy', () => {
    it('should build cancel buy order event', () => {
      const event = buildEventCancelBuy(
        AssetTypes.TOKEN_TYPE_1,
        'asset-id',
        AssetTypes.NATIVE,
        'currency-id',
        '50',
        '40.0'
      );

      expect(event.type).toBe(EventTypes.EVENT_CANCEL_BUY_ORDER);
    });
  });

  describe('buildEventCancelSell', () => {
    it('should build cancel sell order event', () => {
      const event = buildEventCancelSell(
        AssetTypes.TOKEN_TYPE_1,
        'asset-id',
        AssetTypes.NATIVE,
        'currency-id',
        '75',
        '45.0'
      );

      expect(event.type).toBe(EventTypes.EVENT_CANCEL_SELL_ORDER);
    });
  });

  describe('buildEventLeaseBalance', () => {
    it('should build lease balance event with ExtendedAddrXpub and default values', () => {
      const event = buildEventLeaseBalance(mockAddrXpub, 1440);

      expect(event).toEqual({
        type: EventTypes.EVENT_LEASE_BALANCE,
        assetType: AssetTypes.NATIVE,
        assetId: NULL,
        data: {
          period: 1440,
          addrXpub: 'test-address',
          publicKey: 'test-public-key',
          alias: 'test-alias'
        }
      });
    });

    it('should build lease balance event with string address and custom values', () => {
      const event = buildEventLeaseBalance(
        mockAddrXpubString,
        2880,
        AssetTypes.TOKEN_TYPE_1,
        'custom-asset'
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_LEASE_BALANCE,
        assetType: AssetTypes.TOKEN_TYPE_1,
        assetId: 'custom-asset',
        data: {
          period: 2880,
          addrXpub: 'test-address-string',
          publicKey: undefined,
          alias: undefined
        }
      });
    });
  });

  describe('buildEventMessageType', () => {
    const plainMessage: PlainMessage = {
      message: 'Hello World',
      isText: true
    };

    const encryptedMessage: EncryptedMessage = {
      encryptedMessage: {
        data: 'encrypted-data',
        nonce: 'nonce-value'
      },
      isText: false
    };

    it('should build message event with plain message', () => {
      const event = buildEventMessageType(
        EventTypes.EVENT_MESSAGE_SEND,
        mockAddrXpub,
        plainMessage
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_MESSAGE_SEND,
        assetType: AssetTypes.NATIVE,
        assetId: NULL,
        data: {
          addrXpub: 'test-address',
          publicKey: 'test-public-key',
          alias: 'test-alias',
          isText: true,
          message: 'Hello World'
        }
      });
    });

    it('should build message event with encrypted message', () => {
      const event = buildEventMessageType(
        EventTypes.EVENT_MESSAGE_RECEIVE,
        mockAddrXpubString,
        encryptedMessage
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_MESSAGE_RECEIVE,
        assetType: AssetTypes.NATIVE,
        assetId: NULL,
        data: {
          addrXpub: 'test-address-string',
          publicKey: undefined,
          alias: undefined,
          isText: false,
          message: {
            data: 'encrypted-data',
            nonce: 'nonce-value'
          }
        }
      });
    });
  });

  describe('buildEventMessageSend', () => {
    it('should build message send event', () => {
      const plainMessage: PlainMessage = {
        message: 'Test message',
        isText: true
      };

      const event = buildEventMessageSend(mockAddrXpub, plainMessage);
      expect(event.type).toBe(EventTypes.EVENT_MESSAGE_SEND);
      expect(event.data.message).toBe('Test message');
    });
  });

  describe('buildEventMessageReceive', () => {
    it('should build message receive event', () => {
      const plainMessage: PlainMessage = {
        message: 'Received message',
        isText: true
      };

      const event = buildEventMessageReceive(mockAddrXpub, plainMessage);
      expect(event.type).toBe(EventTypes.EVENT_MESSAGE_RECEIVE);
      expect(event.data.message).toBe('Received message');
    });
  });

  describe('buildEventDgsPurchase', () => {
    it('should build DGS purchase event with default values', () => {
      const event = buildEventDgsPurchase(
        'goods-id',
        5,
        '10000',
        'sender-address',
        1640995200
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_DGS_PURCHASE,
        assetType: AssetTypes.NATIVE,
        assetId: NULL,
        data: {
          goods: 'goods-id',
          quantity: 5,
          priceNQT: '10000',
          deliveryDeadlineTimestamp: 1640995200,
          sender: 'sender-address'
        }
      });
    });

    it('should build DGS purchase event with custom asset type', () => {
      const event = buildEventDgsPurchase(
        'goods-id',
        2,
        '5000',
        'sender-address',
        1640995200,
        AssetTypes.TOKEN_TYPE_1,
        'custom-asset'
      );

      expect(event.assetType).toBe(AssetTypes.TOKEN_TYPE_1);
      expect(event.assetId).toBe('custom-asset');
    });
  });

  describe('buildEventDgsDelivery', () => {
    it('should build DGS delivery event with default values', () => {
      const event = buildEventDgsDelivery(
        'purchase-id',
        'goods-data',
        'nonce-value',
        '1000',
        true,
        'sender-address'
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_DGS_DELIVERY,
        assetType: AssetTypes.NATIVE,
        assetId: NULL,
        data: {
          purchase: 'purchase-id',
          goodsData: 'goods-data',
          goodsNonce: 'nonce-value',
          discountNQT: '1000',
          goodsIsText: true,
          sender: 'sender-address'
        }
      });
    });

    it('should build DGS delivery event with custom values', () => {
      const event = buildEventDgsDelivery(
        'purchase-id',
        'goods-data',
        'nonce-value',
        '500',
        false,
        'sender-address',
        AssetTypes.TOKEN_TYPE_1,
        'token-id'
      );

      expect(event.assetType).toBe(AssetTypes.TOKEN_TYPE_1);
      expect(event.assetId).toBe('token-id');
      expect((event.data as any).goodsIsText).toBe(false);
    });
  });

  describe('buildEventDgsRefund', () => {
    it('should build DGS refund event with default values', () => {
      const event = buildEventDgsRefund(
        'purchase-id',
        '2000',
        'sender-address'
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_DGS_PREFUND,
        assetType: AssetTypes.NATIVE,
        assetId: NULL,
        data: {
          purchase: 'purchase-id',
          refundNQT: '2000',
          sender: 'sender-address'
        }
      });
    });

    it('should build DGS refund event with custom asset', () => {
      const event = buildEventDgsRefund(
        'purchase-id',
        '1500',
        'sender-address',
        AssetTypes.TOKEN_TYPE_1,
        'token-asset'
      );

      expect(event.assetType).toBe(AssetTypes.TOKEN_TYPE_1);
      expect(event.assetId).toBe('token-asset');
    });
  });

  describe('buildEventInternalTransfer', () => {
    it('should build internal transfer event with default values', () => {
      const event = buildEventInternalTransfer(
        'from-address',
        'to-address',
        '1000000000000000000',
        'asset-id'
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_INTERNAL_TRANSFER,
        assetType: AssetTypes.TOKEN_TYPE_1,
        assetId: 'asset-id',
        data: {
          from: 'from-address',
          to: 'to-address',
          value: '1000000000000000000',
          tokenName: undefined,
          tokenSymbol: undefined,
          tokenDecimals: undefined,
          standard: undefined
        }
      });
    });

    it('should build internal transfer event with all optional parameters', () => {
      const event = buildEventInternalTransfer(
        'from-address',
        'to-address',
        '500000000000000000',
        'token-address',
        AssetTypes.NATIVE,
        'Test Token',
        'TEST',
        18,
        'ERC20'
      );

      expect(event).toEqual({
        type: EventTypes.EVENT_INTERNAL_TRANSFER,
        assetType: AssetTypes.NATIVE,
        assetId: 'token-address',
        data: {
          from: 'from-address',
          to: 'to-address',
          value: '500000000000000000',
          tokenName: 'Test Token',
          tokenSymbol: 'TEST',
          tokenDecimals: 18,
          standard: 'ERC20'
        }
      });
    });

    it('should handle zero value transfers', () => {
      const event = buildEventInternalTransfer(
        'from-address',
        'to-address',
        '0',
        'asset-id'
      );

      expect(event.data.value).toBe('0');
    });

    it('should handle large value transfers', () => {
      const largeValue = '999999999999999999999999999';
      const event = buildEventInternalTransfer(
        'from-address',
        'to-address',
        largeValue,
        'asset-id'
      );

      expect(event.data.value).toBe(largeValue);
    });
  });
}); 