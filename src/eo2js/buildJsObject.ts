import { ParsedObject, ParsedObjectType } from './ParsedObject'

export const buildJsObject = (object: ParsedObject): string => {
  let jsObject = ''

  if (object.name) {
    jsObject += `const ${object.name} = `
  }

  jsObject += representObject(object, object.name)

  return jsObject
}

const representObject = (object: ParsedObject, selfName: string): string => {
  let jsObject = ''

  if (object.type === ParsedObjectType.abstract) {
    const args = object.args.map(a => a.name)
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '@') {
        args[i] = '$_decoratee'
        object.children.splice(0, 0, {
          type: ParsedObjectType.closed,
          children: [],
          base: '$_decoratee',
          name: '@'
        })
        break
      }
    }

    jsObject += `(${makeArgs(args)})`
  } else {
    jsObject += '()'
  }

  jsObject += ' => '
  jsObject += '({\n'

  const jsChildren: string[] = []
  if (object.type === ParsedObjectType.closed) {
    jsChildren.push(`...${makeBaseCall(object, selfName)}`)
  }
  const children = object.children.filter(child => child.name)
  for (const child of children) {
    if (child.name === '@') {
      jsChildren.push(`...(${representObject(child, selfName)})()`)
    } else {
      jsChildren.push(`${child.name!}: ${representObject(child, selfName)}`)
    }
  }

  jsObject += jsChildren.join(',\n')

  jsObject += '\n})'
  return jsObject
}

const makeBaseCall = (object: ParsedObject & { type: ParsedObjectType.closed }, selfName: string): string => {
  if (!object.value) {
    const args = object.children.filter(child => !child.name)
    return `${object.base.replace(/\$/g, selfName)}(${args.map(a => representObject(a, selfName))})`
  }

  return `${object.base.replace(/\$/g, selfName)}(${object.value})`
}

const makeArgs = (args: string[]): string =>
  args.join(', ')
