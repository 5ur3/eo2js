import { ParsedObject, ParsedObjectType } from './ParsedObject'

export const parseXmlObject = (object: any): ParsedObject => {
  const baseObject = {
    name: object['$'].name,
    children: []
  }
  if (object['$'].base) {
    return {
      type: ParsedObjectType.closed,
      base: convertBase(object['$'].base),
      value: object['_'] ? parseValue(object['$'].base, object['_']).toString() : undefined,
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

export const parseValue = (base: string, value: string): number | string | boolean => {
  switch (base) {
    case 'float':
      const hexValues = value.split(' ');
      const uint8Array = new Uint8Array(hexValues.map(hex => parseInt(hex, 16)));
      const dataView = new DataView(uint8Array.buffer);

      return dataView.getFloat64(0)

    case 'int':
      const hexValue = value.replace(/ /g, '');
      const bigintValue = BigInt(`0x${hexValue}`);

      const signBit = bigintValue & BigInt(0x8000000000000000); // Mask for sign bit
      const isNegative = (signBit !== BigInt(0))

      return Number(bigintValue - (isNegative ? BigInt(0x10000000000000000) : BigInt(0)));

    case 'string':
      return '"' + value.split(' ').map(hex => String.fromCharCode(parseInt(hex, 16))).join('') + '"';

    default:
      return ''
  }
}

const convertBase = (base: string) => {
  switch (base) {
    case 'true':
      return 'boolTrue'

    case 'false':
      return 'boolFalse'

    default:
      return base
  }
}