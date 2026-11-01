const parseUtcDate = (date) => {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

export const formatScheduleDate = (date, includeYear = false) => {
  const parsedDate = parseUtcDate(date)
  const day = parsedDate.getUTCDate()
  const remainder = day % 100
  const ordinal = remainder >= 11 && remainder <= 13
    ? `${day}th`
    : `${day}${{ 1: "st", 2: "nd", 3: "rd" }[day % 10] ?? "th"}`
  const month = parsedDate.toLocaleString("en-US", { month: "short", timeZone: "UTC" })
  const year = includeYear ? `, ${parsedDate.getUTCFullYear()}` : ""

  return `${month}. ${ordinal}${year}`
}

export const formatScheduleDateRange = (startDate, endDate) =>
  `${formatScheduleDate(startDate)} to ${formatScheduleDate(endDate)}.`

export const getSchedulePeriodLabel = (entries) => {
  const dates = entries.flatMap(({ startDate, endDate }) => [startDate, endDate])
  if (dates.length === 0) {
    return ""
  }

  dates.sort()
  const startDate = dates[0]
  const endDate = dates[dates.length - 1]
  const startYear = startDate.slice(0, 4)
  const endYear = endDate.slice(0, 4)
  const endLabel = formatScheduleDate(endDate, true)
  const startLabel = startYear === endYear
    ? formatScheduleDate(startDate)
    : formatScheduleDate(startDate, true)

  return `${startLabel} – ${endLabel}`
}
