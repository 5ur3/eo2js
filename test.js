const int = (value) => ({
  $_value: () => value,
  $_datarize: () => value.toString(),
  add: (obj) => int(value + obj().$_value())
})

const five = () => ({
  ...int(5)
})

const seven = () => ({
  ...int(7)
})

const sum = () => ({
  ...five().add(() => ({
    ...seven()
  })),
  first: () => ({
    ...int(5)
  }),
  second: () => ({
    ...seven()
  })
})

const app = () => ({
  ...sum().second()
})

console.log(app().$_datarize())
