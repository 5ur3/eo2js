import { parseXml } from './parseXml'
import { buildParsedObject } from './buildParsedObject'
import { buildJsObject } from './buildJsObject'
import { makeJsScript } from './makeJsScript'
import * as fs from "fs";

export const eo2js = async (xml: string) => {
  const program = (await parseXml(xml)).program
  const objects = program.objects[0].o
  const parsedObjects = objects.map(o => buildParsedObject(o))
  fs.writeFileSync('objects.json', JSON.stringify(parsedObjects))
  const jsObjects = parsedObjects.map(o => buildJsObject(o))
  return makeJsScript(jsObjects)
}
