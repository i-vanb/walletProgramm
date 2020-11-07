export const getTodayInMS = () => {
    const currentTime = new Date()
    const todayInMs = Date.parse(new Date(Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())).toString())
    return todayInMs
}

export const getDateInMs = (y, m, d) => {
        return Date.parse(new Date(Date.UTC(y, m, d)).toString())
}
