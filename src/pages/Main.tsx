import { store, ResetTasks } from 'store'
import { useSnapshot } from 'valtio'
import { useState, useEffect, memo } from 'react'

const Test = memo(() => {
  const task = useSnapshot(store.tasks[0])
  return(
    <div>
      {task.id}
    </div>
  )
})

export default function Main() {
  const task = useSnapshot(store.tasks[0])
  const HandleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget) return null
    store.tasks[0].id = e.currentTarget.value
  }

  return(
    <div>
      <h1>This is a main page!</h1>
      <h2>{task.title}</h2>
      <Test />
      <input onChange={HandleInput} />
      <button onClick={ResetTasks}>Reset</button>
    </div>
  )
}
