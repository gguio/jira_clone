import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { lazy } from 'react'

import Layout from 'components/Layout.tsx'
import { Paths } from 'paths'

const Main = lazy(() => import("pages/Main.tsx"))
const Todos = lazy(() => import("pages/Todos.tsx"))
const routes = [
    { path: Paths.MAIN, element: <Main /> },
    { path: Paths.TODOS, element: <Todos /> },
]

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes,
  }])
  return(
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
