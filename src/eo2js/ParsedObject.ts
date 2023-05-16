export enum ParsedObjectType {
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

export type ParsedObject = BaseParsedObject &
  (AbstractParsedObject | CopiedParsedObject | AliasParsedObject)
