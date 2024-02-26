import { store } from 'store'


export const getTaskIndex = (id: string) => {
  let taskIndex = null
  store.tasks.forEach((task, index) => {
    if (task.id===id) {
      taskIndex = index
    } 
    return
  })
  return taskIndex
}
