import { store } from 'store'


export const isMember = (name: string) => {
  for (let i=0; i<store.members.length; i+=1) {
    if (store.members[i].name === name) return true
  }
  return false
}
