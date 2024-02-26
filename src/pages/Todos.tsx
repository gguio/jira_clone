import { store } from 'store'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'

export default function Todos() {
	const { tasks } = useSnapshot(store)

	return (
	<div>
			{tasks.map((task, index)=>{
				return(
				<div key={index}>
						<h2>{task.title}</h2>
						<h3>{task.stage}</h3>
						<h3>{task.assignee}</h3>
					</div>
				)
			})}
		</div>
	)
}
