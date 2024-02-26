import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Main from 'pages/Main.tsx'
import Todos from 'pages/Todos.tsx'

export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Main />,
		},
		{
			path: "/todos",
			element: <Todos />,
		},
	])
	return(
		<div>
			<RouterProvider router={router} />
		</div>
	)
}
