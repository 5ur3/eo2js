import { exec } from 'child_process'
import { eo2js } from './eo2js'

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

const main = async () => {
  const xml = await getXmlAst('test.eo')
  await eo2js(xml)
}

main()
