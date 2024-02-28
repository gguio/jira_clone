import { store, ResetTasks } from 'store'

import { useSnapshot } from 'valtio'

import "styles/Main.scss"
import ListGroup from 'react-bootstrap/ListGroup'

import BacklogItem from 'components/BacklogItem.tsx'


export default function Main() {
  const tasks = useSnapshot(store.tasks)
  const sprint = useSnapshot(store.sprint)
  return(
    <div className="container">
      <button onClick={ResetTasks}>Reset</button>
      <div className="sprint mb-3">
        <h2 className="part-header">Sprint</h2>
        {sprint.isActive ? (
        <ListGroup>
          {tasks.filter((task)=>task.inSprint).map((task, index) => {
            return (
              <ListGroup.Item key={index}> <BacklogItem id={task.id} /></ListGroup.Item>
            )
          })}
        </ListGroup>
        ) : (
        <div>Sprint is not started</div>
        )
        }
      </div>

      <div className="backlog">
        <h2 className="part-header">Backlog</h2>
        <ListGroup>
          {tasks.filter((task)=>!task.inSprint).map((task, index) => {
            return (
              <ListGroup.Item key={index}> <BacklogItem id={task.id} /></ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>
    </div>
  )
}
