import { ParsedObject, ParsedObjectType } from './ParsedObject'
import { parseValue, parseXmlObject } from './parseXmlObject'

export const buildParsedObject = (xmlObject: any): ParsedObject => {
  const base = parseXmlObject(xmlObject)
  const children = xmlObject.o ? xmlObject.o.map(obj => buildParsedObject(obj)) : []
  let childrenStartIndex = 0

  if (base.type === ParsedObjectType.abstract) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].type !== ParsedObjectType.alias) {
        break
      }

      childrenStartIndex = i + 1
      base.args.push(children[i])
    }
  }

  if (base.type === ParsedObjectType.closed && base.base.charAt(0) == '.') {
    base.base = `${children[0].base}(${children[0].value ? parseValue(children[0].base, children[0].value) : ''})` + base.base
    childrenStartIndex = 1
  }

  for (let i = childrenStartIndex; i < children.length; i++) {
    base.children.push(children[i])
  }

  return base
}
