import { parseXml } from './parseXml'
import * as fs from 'fs'

enum ParsedObjectType {
  abstract = 'abstract',
  closed = 'closed',
  alias = 'alias'
}

interface AbstractParsedObject {
  type: ParsedObjectType.abstract
  args: ParsedObject[]
}

interface CopiedParsedObject {
  type: ParsedObjectType.closed
  base: string
  value?: string
}

interface AliasParsedObject {
  type: ParsedObjectType.alias
  isList?: boolean
}

interface BaseParsedObject {
  name?: string
  children: ParsedObject[]
}

type ParsedObject = BaseParsedObject &
  (AbstractParsedObject | CopiedParsedObject | AliasParsedObject)

const convertXmlObject = (object: any): ParsedObject => {
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

const buildObject = (xmlObject: any): ParsedObject => {
  const base = convertXmlObject(xmlObject)
  const children = xmlObject.o ? xmlObject.o.map(obj => buildObject(obj)) : []
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
    base.base = children[0].base + base.base
    childrenStartIndex = 1
  }

  for (let i = childrenStartIndex; i < children.length; i++) {
    base.children.push(children[i])
  }

  return base
}

export const eo2js = async (xml: string) => {
  const program = (await parseXml(xml)).program
  const objects = program.objects[0].o
  const parsedObjects = objects.map(o => buildObject(o))

  fs.writeFileSync('xml.json', JSON.stringify(objects))
  fs.writeFileSync('object.json', JSON.stringify(parsedObjects))

  return parsedObjects
}
