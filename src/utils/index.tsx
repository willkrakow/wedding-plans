
export const makeDateString = (uglyDate: string): string => {
    const date = new Date(uglyDate)
    const month = parseMonth(date)

    const prettyDate = `${month} ${date.getDate()}, ${date.getFullYear().toString()}`
   
    return prettyDate
}

export const parseMonth = (dateObj: Date): string => {
    const months: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthNum = dateObj.getMonth()
    return months[monthNum]
}

export const dollarFormat: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
})

export const centsToDollars = (rawCentInt: number, format = "float"): string | number => {
  const dollars = rawCentInt / 100;

  const dollarString = dollarFormat.format(dollars);
  if (format === "str") {
    return dollarString;
  } else {
    return dollars;
  }
};
