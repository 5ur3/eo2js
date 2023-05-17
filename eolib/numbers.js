const { bool } = require ( './booleans' )

const num = (value) => ({
  $_value: () => value,
  $_datarize: () => value,

  add: (obj) => num(value + obj().$_value()),
  sub: (obj) => num(value - obj().$_value()),
  mul: (obj) => num(value * obj().$_value()),
  div: (obj) => num(value / obj().$_value()),

  lt: (obj) => bool(value < obj().$_value()),
  lte: (obj) => bool(value <= obj().$_value()),
  gt: (obj) => bool(value > obj().$_value()),
  gte: (obj) => bool(value >= obj().$_value()),
  eq: (obj) => bool(value === obj().$_value()),

  neg: () => num(-value),
})

const float = num
const int = num

module.exports = {
  num,
  int,
  float
}
