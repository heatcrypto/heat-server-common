import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import { format as formatError } from 'format-error';
import * as jsome from 'jsome';

export function stringify(object: any, replacer?: any, indent?: any) {
  if (!_.isUndefined(replacer) && !_.isUndefined(indent))
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

export function tryParse(jsonStr: string, logger?: Logger) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    if (!_.isUndefined(logger)) {
      logger.error(formatError(e));
      logger.log('Source data for previous error:');
      logger.log(jsonStr);
    }
  }
  return null;
}
