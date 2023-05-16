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

const four = () => ({
  ...org().eolang().int(4)
})

const five = () => ({
  ...org().eolang().int(5),
  prev: () => ({
    ...four()
  }),
  next: () => ({
    ...org().eolang().int(6)
  })
})

console.log(five().prev().$_datarize())
console.log(five().$_datarize())
console.log(five().next().$_datarize())
