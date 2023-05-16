import { exec } from 'child_process'
import { eo2js } from './eo2js'
import * as process from 'process'
import * as fs from 'fs'

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
  const eoFilepath = process.argv[2]
  const xml = await getXmlAst(eoFilepath)

  let outputFilepath = `${eoFilepath}.js`
  if (eoFilepath.endsWith('.eo')) {
    outputFilepath = `${eoFilepath.slice(0, -3)}.js`
  }

  fs.writeFileSync(outputFilepath, await eo2js(xml))
}

main()
