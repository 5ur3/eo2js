const bool = (value) => ({
    $_value: () => value,
    $_datarize: () => value.toString(),
})

const boolTrue = () => bool(true)
const boolFalse = () => bool(false)

module.exports = {
    boolTrue,
    boolFalse,
    bool
}
