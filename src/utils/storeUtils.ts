import { store } from 'store'


export const getTaskIndex = (id: string) => {
  for (let i=0; i<store.tasks.length; i+=1) {
    if (store.tasks[i].id === id) return i
  }
  return null
}

export const generateTaskId = () => {
  let id = ''
  id += String.fromCharCode(Math.floor(Math.random()*26+65))
  id += String.fromCharCode(Math.floor(Math.random()*26+65))
  id += '-'
  for (let i=0; i<4; i+=1) {
    id += Math.floor(Math.random()*9)
  }
  for (let i=0; i<store.tasks.length; i+=1) {
    if (id === store.tasks[i].id) id = generateTaskId()
  }
  return id
}
