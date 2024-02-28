import { proxy, subscribe } from 'valtio'


export type Sprint = {
  isActive: boolean,
  name: string,
  goal: string,
  duration: string,
  start: Date | null,
  end: Date | null
}

type TeamMember = {
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
  tasks: [
    {
      id: "AA-0000",
      title: "This is a test task",
      subtitle: "Subtitle",
      stage: "todo",
      inSprint: false,
      author: "Me",
      assignee: "Other",
      days: 0,
      hours: 8,
      desc: "this is need to be done"
    }
  ],
  members: [
    {
      name: 'John',
      post: 'Developer',
      department: 'Tech'
    }
  ],
  sprint: {
    isActive: false,
    name: '',
    goal: '',
    duration: '',
    begin: null,
    end: null
  }
})

subscribe(store, () => {
  localStorage.setItem('store', JSON.stringify(store))
})

export const ResetTasks = () => {
  store.tasks[0] = {
      id: "AA-0000",
      title: "This is a test task",
      subtitle: "Subtitle",
      stage: "todo",
      inSprint: true,
      author: "Me",
      assignee: "Other",
      days: 0,
      hours: 8,
      description: "this is need to be done",
      points: 10
    }
  store.members = [
    {
      name: 'John',
      post: 'Developer',
      department: 'Tech'
    }
  ]
  store.sprint = {
    isActive: false,
    name: '',
    goal: '',
    duration: '',
    begin: null,
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
  if (index) store.tasks[index].stage = stage
}

export const addTask = (newTask: Task) => {
  if (Array.from(store.tasks, (task)=>task.id).includes(newTask.id)) {
    throw new Error(`Task with ID ${newTask.id} already exists!`)
  }
  store.tasks.push(newTask)
}

export const changeTaskPoints = (id: string, points: number) => {
  if (points > 40 || points < 1) return
  const index = getTaskIndex(id)
  if (index) store.tasks[index].points = points
}
