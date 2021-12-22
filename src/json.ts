import { isUndefined } from 'lodash';
import * as jsome from 'jsome';
import { LoggerService } from './types/logger.interface';

export function stringify(object: any, replacer?: any, indent?: any) {
  if (!isUndefined(replacer) && !isUndefined(indent))
    return JSON.stringify(object, replacer, indent);
  return JSON.stringify(object, null, 0);
}

export function prettyPrint(object: any) {
  try {
    return jsome.getColoredString(object);
  } catch (e) {
    return `Unable to pretty print ( ${object} )`;
  }
}

export function tryParse(jsonStr: string, logger?: LoggerService) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    if (!isUndefined(logger)) {
      logger.error(e);
      logger.log('Source data for previous error:');
      logger.log(jsonStr);
    }
  }
  return null;
}
