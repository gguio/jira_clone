import { proxy, subscribe } from 'valtio'


type Sprint = {
  isActive: boolean,
  name: string,
  goal: string,
  duration: string,
  begin: Date,
  end: Date
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
  time: number,
  desc: string,
  points?: number,
  comment?: string,
  watchers?: string[],
  tillEndOfSprint?: Date
}

const persistedStore = localStorage.getItem('store')

export const store = proxy<{
  tasks: Task[],
  members: TeamMember[],
  sprint: Sprint[]
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
      time: 8,
      desc: "this is need to be done"
    }
  ],
  members: [],
  sprint: []
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
      time: 8,
      desc: "this is need to be done",
      points: 10
    }
  store.tasks[1] = {
      id: "AA-0001",
      title: "Another task",
      subtitle: "Subtitle",
      stage: "todo",
      inSprint: true,
      author: "Me",
      assignee: "John",
      time: 8,
      desc: "this is need to be done",
      points: 10
    }
  store.members = []
  store.sprint = []
}

export const changeTaskStage = (id: string, stage: string) => {
  store.tasks.forEach((task) => {
    if (task.id === id) task.stage = stage
  })
}
