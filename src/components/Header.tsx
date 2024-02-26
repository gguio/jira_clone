import { Link } from 'react-router-dom'
import { Paths } from 'paths'

import 'styles/Header.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
	<Navbar.Brand href="#home">Jira clone</Navbar.Brand>
	<Nav className="me-auto">
	  <Link className="nav-link" to={Paths.MAIN}>Main</Link>
	  <Link className="nav-link" to={Paths.TODOS}>Todos</Link>
	  <Link className="nav-link" to={Paths.SPRINT}>Active sprint</Link>
	</Nav>
      </Container>
    </Navbar>
  )
}
