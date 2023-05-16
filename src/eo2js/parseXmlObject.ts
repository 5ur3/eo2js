import { ParsedObject, ParsedObjectType } from './ParsedObject'
import {eo2js} from "./index";
import {parseString} from "xml2js";

export const parseXmlObject = (object: any): ParsedObject => {
  const baseObject = {
    name: object['$'].name,
    children: []
  }
  if (object['$'].base) {
    return {
      type: ParsedObjectType.closed,
      base: object['$'].base,
      value: parseValue(object['$'].base, object['_']),
      ...baseObject
    }
  } else if (object['$'].abstract === '') {
    return {
      type: ParsedObjectType.abstract,
      args: [],
      ...baseObject
    }
  } else {
    return {
      type: ParsedObjectType.alias,
      isList: object['$'].vararg === '' ? true : undefined,
      ...baseObject
    }
  }
}

const parseValue = (base: string, value: string) => {
  switch (base) {
    case 'org.eolang.float':
      const hexValues = value.split(' ');
      const uint8Array = new Uint8Array(hexValues.map(hex => parseInt(hex, 16)));
      const dataView = new DataView(uint8Array.buffer);

      return dataView.getFloat64(0).toString();

    case 'org.eolang.int':
      return parseInt(value.replace(/ /g, ''), 16).toString()

    case 'org.eolang.string':
      return value.split(' ').map(hex => String.fromCharCode(parseInt(hex, 16))).join('');

    case 'org.eolang.true':
      return "true"

    case 'org.eolang.false':
      return "false"

    default:
      return ""
  }
}
