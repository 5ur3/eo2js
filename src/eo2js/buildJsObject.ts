import { ParsedObject, ParsedObjectType } from './ParsedObject'

export const buildJsObject = (object: ParsedObject): string => {
  let jsObject = ''

  if (object.name) {
    jsObject += `const ${object.name} = `
  }

  jsObject += representObject(object)

  return jsObject
}

const representObject = (object: ParsedObject): string => {
  let jsObject = ''

  if (object.type === ParsedObjectType.abstract) {
    jsObject += `(${makeArgs(object.args.map(a => a.name))})`
  } else {
    jsObject += '()'
  }

  jsObject += ' => '
  jsObject += '({\n'

  const jsChildren: string[] = []
  if (object.type === ParsedObjectType.closed) {
    jsChildren.push(`...${makeBaseCall(object)}`)
  }
  const children = object.children.filter(child => child.name)
  for (const child of children) {
    jsChildren.push(`${child.name!}: ${representObject(child)}`)
  }

  jsObject += jsChildren.join(',\n')

  jsObject += '\n})'
  return jsObject
}

const makeBaseCall = (object: ParsedObject & { type: ParsedObjectType.closed }): string => {
  if (!object.value) {
    const args = object.children.filter(child => !child.name)
    return `${object.base.replace(/\./g, '().')}(${args.map(representObject)})`
  }

  return `${object.base.replace(/\./g, '().')}(${object.value})`
}

const makeArgs = (args: string[]): string =>
  args.join(', ')
