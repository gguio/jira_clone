import { store, ResetTasks } from 'store'
import { useSnapshot } from 'valtio'

const Test = () => {
	const {tasks} = useSnapshot(store)
	return(
	<div>
			{tasks[0].id}
	</div>
	)
}

export default function Main() {
	const { tasks } = useSnapshot(store)
	const HandleInput = (e: React.FormEvent<HTMLInputElement>) => {
		if (!e.target) return null
		store.tasks[0].title = e.currentTarget.value
	}

	return(
		<div>
			<h1>This is a main page!</h1>
			<h2>{tasks[0] ? tasks[0].title : "No tasks"}</h2>
			<Test />
			<input onChange={HandleInput} />
			<button onClick={ResetTasks}>Reset</button>
		</div>
	)
}
