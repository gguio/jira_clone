import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom"
import { lazy } from 'react'

import 'styles/global.scss'

import Layout from 'components/Layout.tsx'
import { Paths } from 'paths'

const Main = lazy(() => import("pages/Main.tsx"))
const Todos = lazy(() => import("pages/Todos.tsx"))
const Stats = lazy(() => import("pages/Stats.tsx"))
const Sprint = lazy(() => import("pages/Sprint.tsx"))
const routes = [
    { path: Paths.MAIN, element: <Main /> },
    { path: Paths.TODOS, element: <Todos /> },
    { path: Paths.STAT, element: <Stats /> },
    { path: Paths.SPRINT, element: <Sprint /> },
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
