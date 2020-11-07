export const inputNumberHandler = (text, setter) => {
    let lastChar = text[text.length - 1]
    if (lastChar == 1 || lastChar == 2 || lastChar == 3 || lastChar == 4 || lastChar == 5
        || lastChar == 6 || lastChar == 7 || lastChar == 8 || lastChar == 9) {
        if (text[0]===0) {
            return setter(Number(lastChar))
        } else {
            return setter(Number(text))
        }
    }
    if (lastChar == undefined) {
        return setter('')
    }
    if (lastChar == 0 && text.length > 1 && text[0] !== 0) {
        return setter(Number(text))
    }
    if (lastChar == 0 && text.length === 1) {
        return setter(Number(text))
    }
}
