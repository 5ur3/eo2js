export enum ParsedObjectType {
  abstract = 'abstract',
  closed = 'closed',
  alias = 'alias'
}

interface AbstractParsedObject {
  type: ParsedObjectType.abstract
  args: (BaseParsedObject & AliasParsedObject)[]
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
  children: (BaseParsedObject & (AbstractParsedObject | CopiedParsedObject))[]
}

export type ParsedObject = BaseParsedObject &
  (AbstractParsedObject | CopiedParsedObject | AliasParsedObject)
