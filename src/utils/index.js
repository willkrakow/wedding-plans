
export const makeDateString = (uglyDate) => {
    const date = new Date(uglyDate)
    const month = parseMonth(date)

    const prettyDate = `${month} ${date.getDate()}, ${date.getFullYear().toString()}`
   
    return prettyDate
}

export const parseMonth = (dateObj) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthNum = dateObj.getMonth()
    return months[monthNum]
}

export const dollarFormat = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
})

export const centsToDollars = (rawCentInt, format="float") => {
    const dollars = rawCentInt / 100
    
    const dollarString = dollarFormat.format(dollars)
    if (format === "str"){
        return dollarString
    } else {
        return dollars
    }
}