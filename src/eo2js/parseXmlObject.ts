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
      value: object['_'],
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
