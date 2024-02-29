import { proxy, subscribe } from 'valtio'


export type Sprint = {
  isActive: boolean,
  name: string,
  goal: string,
  duration: string,
  start: Date | null,
  end: Date | null
}

export type TeamMember = {
  name: string,
  post: string,
  department: string
}

export type Task = {
  id: string,
  title: string,
  subtitle: string,
  inSprint: boolean,
  stage: string,
  author: string,
  assignee: string,
  days: number | null | undefined,
  hours: number | null | undefined,
  description: string,
  points?: number,
  comment?: string,
  watchers?: string,
  end?: Date
}

const persistedStore = localStorage.getItem('store')

export const store = proxy<{
  tasks: Task[],
  members: TeamMember[],
  sprint: Sprint
}>(persistedStore ? JSON.parse(persistedStore) : {
  tasks: [],
  members: [
    {
      name: 'Me',
      post: 'CEO',
      department: 'Main'
    }
  ],
  sprint: {
    isActive: false,
    name: '',
    goal: '',
    duration: '',
    start: null,
    end: null
  }
})

subscribe(store, () => {
  localStorage.setItem('store', JSON.stringify(store))
})

export const ResetTasks = () => {
  store.tasks = []
  store.members = [
    {
      name: 'Me',
      post: 'CEO',
      department: 'Main'
    }
  ]
  store.sprint = {
    isActive: false,
    name: '',
    goal: '',
    duration: '',
    start: null,
    end: null
  }
}

export const getTaskIndex = (id: string) => {
  for (let i=0; i<store.tasks.length; i+=1) {
    if (store.tasks[i].id === id) return i
  }
  return null
}

export const changeTaskStage = (id: string, stage: string) => {
  const index = getTaskIndex(id)
  if (index !== null) store.tasks[index].stage = stage
}

export const addTask = (newTask: Task) => {
  if (Array.from(store.tasks, (task)=>task.id).includes(newTask.id)) {
    throw new Error(`Task with ID ${newTask.id} already exists!`)
  }
  store.tasks.push(newTask)
}

export const addMember = (newMember: TeamMember) => {
  if (Array.from(store.members, (task)=>task.name).includes(newMember.name)) {
    throw new Error(`Member with name ${newMember.name} already exists!`)
  }
  store.members.push(newMember)
}

export const changeTaskPoints = (id: string, points: number) => {
  if (points > 40 || points < 1) return
  const index = getTaskIndex(id)
  if (index) store.tasks[index].points = points
}

export const startSprint = (data: Sprint) => {
  store.sprint.name = data.name
  store.sprint.goal = data.goal
  store.sprint.duration = data.duration
  store.sprint.isActive = data.isActive
  store.sprint.start = data.start
  store.sprint.end = data.end
}

export const toggleTaskInSprint = (id: string, newState?: boolean) => {
  const index = getTaskIndex(id)
  if (!store.sprint.isActive || index === null) return 
  store.tasks[index].inSprint = newState ? newState : !store.tasks[index].inSprint
}
