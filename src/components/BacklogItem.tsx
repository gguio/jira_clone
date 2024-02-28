import 'styles/BacklogItem.scss'

import { store, changeTaskPoints } from 'store'
import type { Task } from 'store'
import { toggleTaskInSprint } from 'store'
import { useSnapshot } from 'valtio'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getTaskIndex } from 'utils/storeUtils.ts'


export default function BacklogItem({id}: {id: string }) {
  const taskIndex = getTaskIndex(id)
  if (taskIndex === null) return null
  const task = useSnapshot(store.tasks[taskIndex])
  
  return(
  <div className='backlogItem-container'>
      <div className='backlog-stage' data-stage={task.stage}>{task.stage}</div>
      <div className='backlog-title'>{task.title}</div>
      <Link to={`statistics/${task.assignee}`} className='backlog-assignee'>{task.assignee}</Link>
      <div className='backlog-id'>{task.id}</div>
      {!task.inSprint ? (
      <button className='badge badge-primary' onClick={() => {
         toggleTaskInSprint(id)
      }}>Add in Sprint</button>
      ) : (
      <button className='badge badge-danger' onClick={() => {
         toggleTaskInSprint(id)
      }}>Remove from sprint</button>
      )}
      <input 
        className='backlog-points' 
        defaultValue={task.points ? task.points : '-'} 
        onChange={(e) => {
          const points = Number(e.currentTarget.value)
          if (e.currentTarget.value != '' && e.currentTarget.value != '-' && !points) e.currentTarget.value = '-'
          if (!points) {
            return
          }
          if (points > 40 || points < 1) {
            e.currentTarget.value = '-'
            return
          }

          changeTaskPoints(id, points)
        }}
      />
  </div>
  )
}
