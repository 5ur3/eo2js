export const makeJsScript = (jsObjects: string[]) => {
  let jsScript = 'const int = (value) => ({\n' +
    '  $_value: () => value,\n' +
    '  $_datarize: () => value.toString(),\n' +
    '  add: (obj) => int(value + obj().$_value())\n' +
    '})\n\n'

  jsScript += jsObjects.join('\n\n')

  jsScript += '\n\nconsole.log(app().$_datarize())'

  return jsScript
}
