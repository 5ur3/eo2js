export const makeJsScript = (jsObjects: string[]) => {
  const modules = ['int', 'float', 'boolTrue', 'boolFalse', 'string', 'seq']
  let jsScript = `const { ${modules.join(", ")} } = require('./eolib')\n\n`

  jsScript += jsObjects.join('\n\n')

  jsScript += '\n\nconsole.log(app().$_datarize())'

  return jsScript
}
