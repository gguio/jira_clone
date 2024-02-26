import { proxy, subscribe } from 'valtio'

type Task = {
				id: string,
				title: string,
				subtitle: string,
				stage: string,
				author: string,
				assignee: string,
				time: number,
				desc: string,
				comment?: string,
				watchers?: string[],
				tillEndOfSprint?: Date
}

const persistedStore = localStorage.getItem('store')

export const store = proxy<{
				tasks: Task[]
}>(persistedStore ? JSON.parse(persistedStore) : {
	tasks: [
		{
			id: "AA-0000",
			title: "This is a test task",
			subtitle: "Subtitle",
			stage: "todo",
			author: "Me",
			assignee: "Other",
			time: 8,
			desc: "this is need to be done"
		}
	]
})

subscribe(store, () => {
	localStorage.setItem('store', JSON.stringify(store))
})

export const ResetTasks = () => {
	store.tasks = [
		{
			id: "AA-0000",
			title: "This is a test task",
			subtitle: "Subtitle",
			stage: "todo",
			author: "Me",
			assignee: "Other",
			time: 8,
			desc: "this is need to be done"
		}
	]
}
