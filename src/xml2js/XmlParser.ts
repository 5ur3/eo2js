import xml2js from 'xml2js'

export const parseXml = (xml: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, res) => {
      if (!err) {
        return resolve(res)
      }
      reject(err)
    })
  })
}
