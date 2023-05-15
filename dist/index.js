import xml2js from 'xml2js';
xml2js.parseString('<a>123</a>', (err, res) => {
    console.log(res.a);
});
