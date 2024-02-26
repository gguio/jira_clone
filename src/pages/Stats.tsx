import { useParams } from 'react-router-dom'

export default function Stats() {
  const { assignee } = useParams()
  return(
  <div>
      {assignee}
  </div>
  )
}
