import Form from 'react-bootstrap/Form';
import "styles/Sprint.scss"

import { useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { store, changeTaskStage } from 'store'
import { useSnapshot } from 'valtio'

import type { Task } from 'store'

import { useDrag, useDrop } from 'react-dnd'


type TaskCardProps = Pick<Task, 'id' | 'title' | 'assignee' | 'points' | 'stage'>

const TaskCard = (props: TaskCardProps) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'taskCard',
    item: { id: props.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  }))
  return(
  <div 
      ref={drag} 
      style={{opacity: isDragging ? 0.7 : 1}} 
      className="taskCard-container" 
      data-stage={props.stage}
      data-id={props.id}
    >
      <div className="taskCard-id">{props.id}</div>
      <div className="taskCard-title">{props.title}</div>
      <div className="taskCard-assignee">{props.assignee}</div>
      <div className="taskCard-points">{props.points}</div>
  </div>
  )
}


const BoardStage = ({stage, assignees}: {stage: string, assignees: string[]}) => {
  const tasks = useSnapshot(store.tasks)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'taskCard',
    drop: (item: any) => changeTaskStage(item.id, stage),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [])
  return (
      <div ref={drop} style={{backgroundColor: isOver ? "#FFFFE0" : "aliceblue"}} className="board__stage">
       <div style={{marginLeft: '10px'}}>{stage}</div>
        {tasks.filter((task)=>{
        if (assignees.length === 0) {
          return task.inSprint && task.stage == stage
        } else {
          return task.inSprint && task.stage == stage && assignees.includes(task.assignee)
        }
        }).map((task, index) => 
            <TaskCard 
              key={index} 
              id={task.id} 
              title={task.title} 
              assignee={task.assignee} 
              points={task.points} 
              stage={task.stage}
            />
          )} 
      </div>
  )
}

export default function Sprint() {
  const [assignees, setAssignees] = useState<string[]>([])
  const tasks = useSnapshot(store.tasks)

  const filterAssignees = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.split(' ')
    let match = false
    for (let i=0; i<input.length; i+=1) {
      for (let j=0; j<tasks.length; j+=1) {
        if (input[i].toLowerCase() == tasks[j].assignee.toLowerCase()) {
          input[i] = tasks[j].assignee
          match = true
        }
      }
    }
    if (match) {
      setAssignees(input)
    } else {
      setAssignees([])
    }
  }

  return(
    <DndProvider backend={HTML5Backend}>
    <div className='container-fluid'>
        <Form.Control 
          onChange={filterAssignees} 
          type='text' 
          placeholder='Insert assignees to filter tasks' 
          style={{marginTop: '20px'}} 
        />
        <div className="board">
          <BoardStage stage="todo" assignees={assignees} />
          <BoardStage stage="in progress" assignees={assignees} />
          <BoardStage stage="testing" assignees={assignees} />
          <BoardStage stage="done" assignees={assignees} />
        </div>
      </div>
    </DndProvider>
  )
}
