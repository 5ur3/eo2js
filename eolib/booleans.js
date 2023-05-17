const bool = (value) => ({
    $_value: () => value,
    $_datarize: () => value,

    if: (obj1, obj2) => ({
        $_value: () => value ? obj1() : obj2(),
        $_datarize: () => value ? obj1().$_datarize() : obj2().$_datarize()
    }),

    not: () => bool(!value),
    and: (obj) => bool(value && obj().$_value()),
    or: (obj) => bool(value || obj().$_value()),
})

const boolTrue = () => bool(true)
const boolFalse = () => bool(false)

module.exports = {
    boolTrue,
    boolFalse,
    bool
}
