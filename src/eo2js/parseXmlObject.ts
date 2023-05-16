import { ParsedObject, ParsedObjectType } from './ParsedObject'

export const parseXmlObject = (object: any): ParsedObject => {
  const baseObject = {
    name: object['$'].name,
    children: []
  }
  if (object['$'].base) {
    return {
      type: ParsedObjectType.closed,
      base: object['$'].base,
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

const parseValue = (base: string, value: string): number | string | boolean => {
  switch (base) {
    case 'float':
      const hexValues = value.split(' ');
      const uint8Array = new Uint8Array(hexValues.map(hex => parseInt(hex, 16)));
      const dataView = new DataView(uint8Array.buffer);

      return dataView.getFloat64(0)

    case 'int':
      return parseInt(value.replace(/ /g, ''), 16)

    case 'string':
      return value.split(' ').map(hex => String.fromCharCode(parseInt(hex, 16))).join('');

    default:
      return ''
  }
}
