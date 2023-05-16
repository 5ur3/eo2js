const num = (value) => ({
  $_value: () => value,
  $_datarize: () => value.toString(),
  add: (obj) => num(value + obj().$_value())
})

const int = num
const float = num

module.exports = {
  num,
  int,
  float
}
