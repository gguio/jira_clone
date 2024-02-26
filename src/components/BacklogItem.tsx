import 'styles/BacklogItem.scss'

import { store } from 'store'
import type { Task } from 'store'
import { useSnapshot } from 'valtio'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getTaskIndex } from 'utils/getTaskIndex.ts'


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
      <div className='backlog-points'>{task.points ? task.points : '-'}</div>
  </div>
  )
}
