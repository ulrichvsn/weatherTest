/**
 * Transforms a given date into a string representing the day of the week and the day of the month.
 * If the given date is today, returns 'Aujourd’hui'.
 *
 * @param date The date to format. Must be a valid JavaScript Date object
 * @returns A string representing the day of the week and the day of the month,
 * or 'Aujourd’hui' if the date is today
 */
export const formatDay = (date: Date): string => {
  const today = new Date()
  const dateDay = new Date(date)

  return dateDay.getDay() === today.getDay()
    ? 'Aujourd’hui'
    : dateDay.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' })
}

/**
 * Formats a given date and time string into a string representing the time
 *
 * @param dateTimeString - The date and time string
 * @return The formatted time string in the format "HH:MM"
 */
export const formatTime = (dateTimeString: string): string => {
  const timePart = dateTimeString.split(' ')[1] // give me "03:00:00"
  const [hours, minutes] = timePart.split(':') // retrive hours and minutes

  // Format time
  const formattedTime = hours + ':' + minutes

  return formattedTime
}
