const {int} = require('./numbers')
const {bool} = require('./booleans');
const string = (value) => ({
    $_value: () => value,
    $_datarize: () => value.toString(),

    len: () => int(value.length),
    isEmpty: () => bool(value.isEmpty()),
    add: (obj) => string(value + obj().$_value()),
})

module.exports = {
    string
}
