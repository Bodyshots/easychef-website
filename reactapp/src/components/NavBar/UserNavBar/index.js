import Container from 'react-bootstrap/Container';
import '../navbar.css';
import '../../globals.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProfileDropItem from '../ProfileDropItem';
import NavSearch from "../NavSearch";
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { SearchContext } from '../../../App';
import { useContext } from 'react';

// Framework from https://react-bootstrap.github.io/components/navbar/
function UserNavBar( ) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setPageNum, setSuggestions } = useContext(SearchContext);
    const params = [['ordering', '-favourited'], ['ordering', '-star_rating']]

  return (
    <>
    {(<Navbar bg='dark' variant='dark' expand="lg" id='globalnavbar'>
        <Container fluid id='nav_container'>
            <LinkContainer to='/'>
                <Nav.Link id='nav-brand' as={Link} active={location.pathname === '/'}>
                    <Navbar.Brand className='nav-link'>
                        easy chef<span id="slogan">cooking has never been easier</span>
                    </Navbar.Brand>
                </Nav.Link>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <LinkContainer to='/'>
                    <Nav.Link as={Link} active={location.pathname === '/'}>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/createrecipe'>
                    <Nav.Link as={Link} active={location.pathname === '/createrecipe'}>Create Recipes</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/search'>
                    <Nav.Link as={Link} 
                              active={location.pathname === '/search'}
                              onClick={(e) => {
                                e.preventDefault();
                                setPageNum(1);
                                setSuggestions([]);
                                navigate({pathname: '/search', search: '?' + createSearchParams({query: ''})});
                              }}>Advanced Search</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/search'>
                    <Nav.Link   as={Link}
                                id='popular'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPageNum(1);
                                    setSuggestions([]);
                                    navigate({
                                        pathname: '/search',
                                        search: `?${createSearchParams(params)}`,
                                    });
                                }}>Popular Recipes</Nav.Link>
                </LinkContainer>
            </Nav>
            <div id='right_end'>
                <NavSearch />
                <Nav className='justify-content-end' id='navbar_dropdown'>
                <NavDropdown 
                    title="My Profile" 
                    align='end'>
                        <NavDropdown.Item 
                            className='navbar_drop_item'
                            href='/profile'
                            to='/profile'
                            id='profile_item'
                            as={LinkContainer}>
                            <Nav.Link as={Link} active={location.pathname === '/profile'}>
                            <span className='navdropdowntext'>{ProfileDropItem()}</span>
                            </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className='navbar_drop_item'
                        href='/editprofile'
                        to='/editprofile'
                        as={LinkContainer}>
                            <Nav.Link as={Link} active={location.pathname === '/editprofile'}>
                                <span className='navdropdowntext'>Edit Profile</span>
                            </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                        className='navbar_drop_item'
                        href='/myrecipes'
                        to='/myrecipes'
                        as={LinkContainer}>
                            <Nav.Link as={Link} active={location.pathname === '/myrecipes'}>
                            <span className='navdropdowntext'>My Recipes</span>
                            </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                        className='navbar_drop_item'
                        href='/myshoppinglist'
                        to='/myshoppinglist'
                        as={LinkContainer}>
                            <Nav.Link as={Link} active={location.pathname === '/myshoppinglist'}>
                            <span className='navdropdowntext'>My Shopping List</span>
                            </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item
                        id='logout_item'
                        className='navbar_drop_item'
                        href='/logout'
                        to='/logout'
                        as={LinkContainer}>
                            <Nav.Link as={Link} active={location.pathname === '/logout'}>
                            <span className='navdropdowntext'>Logout</span>
                            </Nav.Link>
                        </NavDropdown.Item>
                    </NavDropdown>
            </Nav>
            </div>
            </Navbar.Collapse>
        </Container>
        </Navbar>)}
    </>
  );
}

export default UserNavBar;