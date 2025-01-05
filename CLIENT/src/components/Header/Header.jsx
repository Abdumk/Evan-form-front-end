import  { useContext } from "react";
import classes from "./header.module.css";
import EvangadiLogo from "../../Assets/Images/evangadi-logo-header.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { UserState } from "../../App.jsx";
import { useNavigate } from "react-router-dom";


function Header() {
  const {user,setUser}=useContext(UserState);
  const userId = user?.userid;
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("EV-Forum-token-Jun-2024"); //remove the auth token
    setUser(null);
    navigate("/auth", { replace: true }); //redirect to auth page so that user can login again
  };



  return (
    <>
      <Navbar bg="light " variant="light" expand="md" className="px-3" style={{position:"sticky", top:"0", zIndex:"3", backgroundColor:"white", borderBottom:"1px solid #dee2e6"}}>
        <Container className={classes.header_container}>
          <Navbar.Brand as={Link} to={userId ? "/" : "/auth"}>
            <img
              src={EvangadiLogo}
              className="d-inline-block align-top"
              alt="Evangadi Logo"
              width="200"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav  d-md-none">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className=" w-50 flex-md-row" style={{alignSelf:"flex-end"}}>
            <Nav className="flex-column flex-md-row w-100 justify-content-end nav-links-holder">
              {
                userId ? (
                  <Nav.Link as={Link} to="/" className={classes.navigation_links}>
                  Home
                </Nav.Link>
                ) : null
              }

              <div
              
                className={classes.navigation_links}
              >
                How it Works
              </div>
           {
             userId ? (
               <Button
                 onClick={handleSignOut}
                 className={classes.logout_btn}
               >
                 LogOut
               </Button>
             ) : (
               <Nav.Link
                 as={Link}
                 to="/auth"
                 className={`${classes.navigation_links} ${classes.login_btn}`}
               >
                 SIGN IN
               </Nav.Link>
             )
           }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
