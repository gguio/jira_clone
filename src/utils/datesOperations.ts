import { store } from 'store'


export const getDateByDuration = (days: number, fromDate?: Date) => {
  const today = fromDate ? new Date(fromDate) : new Date()
  return new Date(today.setDate(today.getDate() + days))
}

export const formatDateForInputDate = (stringDate: Date) => {
  const date = new Date(stringDate)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
