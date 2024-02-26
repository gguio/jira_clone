import { Link } from 'react-router-dom'
import { Paths } from 'paths'

export default function Header() {
  return (
    <header>
      <div className="header-div">
	<h1 className="title"><Link to={Paths.MAIN}>My React App</Link></h1>
	<nav className="navbar">
	  <ul className="nav-list">
	    <li className="nav-item"><Link to={Paths.TODOS}>todos</Link></li>
	  </ul>
	</nav>
      </div>
    </header>
  )
}
