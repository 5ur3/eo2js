const {int} = require('./numbers')
const string = (value) => ({
    $_value: () => value,
    $_datarize: () => value.toString(),

    length: () => int(value.length),
    add: (obj) => string(value + obj().$_value()),
})

module.exports = {
    string
}
