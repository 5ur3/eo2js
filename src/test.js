// Builtins
const org = () => ({
  eolang: () => ({
    int: (value) => ({
      $_value: () => value,
      $_datarize: () => value.toString(),
      add: (obj) => org().eolang().int(value + obj().$_value())
    })
  })
})

const five = () => org().eolang().int(5)
