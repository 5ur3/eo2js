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

// Generated code
const makeasum = (x) => (y) => ({
  ...x().add(() => y())
})

const plus5 = (y) => makeasum(() => org().eolang().int(5))(y)

const sum = () => plus5(() => org().eolang().int(3))

// Request to datarize sum
console.log(sum().$_datarize())

