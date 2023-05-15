import xml2js from 'xml2js'

xml2js.parseString('<a>123</a>', (err: any, res: any) => {
  console.log(res.a)
})
