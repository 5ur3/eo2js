import { parseXml } from './XmlParser'

export const eo2js = async (xml: string) => {
  const program = (await parseXml(xml)).program

  console.log(program)
}
