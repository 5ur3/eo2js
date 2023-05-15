import { parseString } from 'xml2js'

export const parseXml = (xml: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, res) => {
      if (!err) {
        return resolve(res)
      }
      reject(err)
    })
  })
}
