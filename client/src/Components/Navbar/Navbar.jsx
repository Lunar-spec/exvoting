import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
const navigate = useNavigate()

    const userRole = localStorage.getItem('role')
    // console.log(userRole)
    const isAuthenticated = localStorage.getItem('Token')

    const handleLogout = () => {
        
        localStorage.removeItem('Token');
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        navigate('/')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to={userRole ? "/home" : "/"}>
                        Ex-Voting
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {isAuthenticated && userRole === 'superadmin' && (
                            <NavLink to="/superadmin" className="nav-link" activeclassname="active">
                                SuperAdmin Dashboard
                            </NavLink>
                        )}
                        {isAuthenticated && userRole === 'constituency_admin' && (
                            <NavLink to="/admin" className="nav-link" activeclassname="active">
                                Admin Dashboard
                            </NavLink>
                        )}
                    </Nav>
                    {isAuthenticated ? (
                        <button className="btn btn-outline-light" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Nav>
                            <NavLink to="/register" className="nav-link" activeclassname="active">
                                Register
                            </NavLink>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
