const seq = (...objects) => ({
    $_value: () => { throw new Error("seq does not have a value") },
    $_datarize: () => JSON.stringify(objects.map(object => object().$_datarize())),
})

module.exports = {
    seq
}