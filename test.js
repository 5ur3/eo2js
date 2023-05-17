const { int, float, boolTrue, boolFalse, string, seq } = require('./eolib')

const tagged = (t, _decoratee) => ({
...(() => ({
..._decoratee()
}))(),
tag: () => ({
...t()
})
})

const five = () => ({
...(() => ({
...tagged(() => ({
...string("five")
}),() => ({
...int(5)
}))
}))()
})

const app = () => ({
...seq(() => ({
...five()
}),() => ({
...five().tag()
}))
})

console.log(app().$_datarize())
