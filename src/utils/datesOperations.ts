import { store } from 'store'


export const getDateByDuration = (days: number) => {
  const today = new Date()
  return new Date(today.setDate(today.getDate() + days))
}
