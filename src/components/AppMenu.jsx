import { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem, 
    NavLink,
    NavbarToggler
} from 'reactstrap'
import { Link } from 'react-router-dom'


function AppMenu() {
    const [open, setOpen] = useState(false)

    const toggleMenu = () => {
        setOpen(!open)
    }

    return ( 
        <Navbar color='light' light expand='md' >
            <NavbarBrand tag={Link} to='/'>Minhas Séries</NavbarBrand>
            <NavbarToggler onClick={toggleMenu} />
            <Collapse isOpen={open} navbar>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink tag={Link} to='/generos'>Gêneros</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/series'>Séries</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default AppMenu;