import { exec } from 'child_process'
import { xml2js } from './xml2js/xml2js'

const getXmlAst = (filepath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`mvn -q exec:java < ../${filepath}`, { cwd: 'eo2xml' }, (err, stdout, stderr) => {
      if (!err) {
        return resolve(stdout)
      }
      reject(err)
    })
  })
}

const xml = await getXmlAst('test.eo')
await xml2js(xml)
