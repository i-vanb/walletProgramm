let arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const dateToStringMD = (dateMS) => {
    const strDate = new Date(dateMS)
    const month = strDate.getMonth()
    const date = strDate.getDate()
    return arr[month] + ' ' + date
}

export const dateToString = (dateMS) => {
    const strDate = new Date(dateMS)
    const year = strDate.getFullYear()
    const month = strDate.getMonth()
    const date = strDate.getDate()
    return `${date}.${month === 11 ? 12 : month + 1}.${year}`
}
