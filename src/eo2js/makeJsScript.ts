export const makeJsScript = (jsObjects: string[]) => {
  const modules = ['int', 'float']
  let jsScript = `const { ${modules.join(", ")} } = require('./eolib')\n\n`

  jsScript += jsObjects.join('\n\n')

  jsScript += '\n\nconsole.log(app().$_datarize())'

  return jsScript
}
