import React, {useState} from 'react';
import styles from '../styles/navbar.module.css';
import Link from "next/link";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {MAGENTA} from "../styles/colorConstants";
import Dropdown from "react-bootstrap/Dropdown";
import {signOut} from "../redux/actions";
import Button from "react-bootstrap/Button";
import Router from "next/router";

const mapStateToProps = state => {
    return {
        user: state.user,
        userID: state.userID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut()),
}
};


const LoginOrUser = ({user, userID, signOut}) => {
    // const router = useRouter();

    if (user) {
        return (
            <Dropdown alignRight>
                <Dropdown.Toggle as={Nav.Item} className={styles.navLink}>
                    {user}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className={styles.dropItem}
                                    onClick={() => {
                                        Router.push('/user/[uid]/', `/user/${userID}/`).catch(e => console.log(e));
                                    }}
                    >
                        Locations
                    </Dropdown.Item>
                    <Dropdown.Item className={styles.dropItem}
                                   onClick={() => {
                                       Router.push('/user/[uid]/account', `/user/${userID}/account`).catch(e => console.log(e));
                                   }}
                    >
                        Account
                    </Dropdown.Item>

                    <Dropdown.Divider/>
                    <Button as={Dropdown.Item}
                            className={styles.dropItem}
                            onClick={() => {
                                signOut();
                                Router.push('/').catch(e => console.log(e));
                            }}>
                        Sign out
                    </Button>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
    return (
        <Nav.Item className="mr-2">
            <Link href="/login">
                <a className={styles.navLink}>Login</a>
            </Link>
        </Nav.Item>
    )
};


const CrawlrNavBar = ({user, userID, signOut}) => {
    return (
        <>
            <style type="text/css">
                {`
                    .navbar-white {
                        background-color: white;
                        z-index: 100;
                        padding: 0;
                    }
                `}
            </style>
            <Navbar expand="sm" variant="white" className='fixed-top shadow-sm'>
                <Container fluid>
                    <Navbar.Brand>
                        <Link href="/">
                            <a>
                                <img src="/logo.PNG"
                                     alt="logo"
                                     height="60"
                                     width="60"
                                />
                            </a>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <FontAwesomeIcon icon={faBars} style={{color: MAGENTA}}/>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" variant={"magenta"}>
                            <Nav.Item className={`mr-4 mb-2 ${styles.navLink}`}>
                                <Link href="/pricing">
                                    <a className={styles.navLink}>Pricing</a>
                                </Link>
                            </Nav.Item>
                            <LoginOrUser user={user} userID={userID} signOut={signOut}/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{height: 70}}/>
        </>
    );
};

const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CrawlrNavBar);

export default NavBar;

// const mapStateToProps = state => {
//     return {
//         user: state.user,
//         userID: state.userID
//     }
// };
//
// const UserLink = ({user, userID}) => {
//
//     if (user) {
//
//         const [dropOpen, setDropOpen] = useState(false);
//
//         if (dropOpen){
//             return (
//                 <div className={styles.userLinkContainer}>
//                     <div className={styles.dropContainer}>
//                         <div className={styles.visibleUser}
//                              onClick={() => setDropOpen(false)}>
//                             <FontAwesomeIcon icon={faSortDown} style={{marginBottom: '10px'}}/>
//                             <div>{user}</div>
//                         </div>
//                         <div className={styles.userLink}>
//                             Dashboard
//                         </div>
//                         <div className={styles.userLink}>
//                             Account
//                         </div>
//                         <div className={styles.userLink}>
//                             Logout
//                         </div>
//                     </div>
//                     <div className={styles.visibleUser}
//                          onClick={() => setDropOpen(false)}>
//                         <FontAwesomeIcon icon={faSortDown} style={{marginBottom: '10px'}}/>
//                         <div>{user}</div>
//                     </div>
//                 </div>
//             );
//         }
//         return (
//             <div className={styles.userLinkContainer}>
//                     <div className={styles.visibleUser}
//                          onClick={() => setDropOpen(true)}
//                     >
//                         <FontAwesomeIcon icon={faSortDown} style={{marginBottom: '10px'}}/>
//                         <div>{user}</div>
//                     </div>
//             </div>
//         );
//
//
//
//         return (
//             <div className={styles.navLink}>
//                 <Link href='/user/[uid]' as={`/user/${userID}`}>
//                     <a>
//                         <FontAwesomeIcon icon={faSortDown} style={{marginBottom: '10px'}}/>
//                         <div>{user}</div>
//                     </a>
//                 </Link>
//                 <div className={styles.tester}/>
//             </div>
//         );
//
//     }
//     return null;
// };
//
//
// function CrawlrNavBar({user, userID}) {
//     console.log("Hey There!!");
//     return (
//         <>
//             <div className={styles.navBar}>
//                 <div className={styles.adjustedNavBar}>
//                     <Link href="/">
//                         <a>
//                             <img src="/logo.PNG"
//                                  alt="logo"
//                                  height="70"
//                                  width="70"
//                             />
//                         </a>
//                     </Link>
//                     <div className={styles.navLink}><Link href="/pricing"><a>Pricing</a></Link></div>
//                     <div className={styles.navLinkContainer}>
//                         <UserLink user={user} userID={userID}/>
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.navBuffer}/>
//         </>
//     );
// }
//
// const NavBar = connect(
//     mapStateToProps
// )(CrawlrNavBar);
//
// export default NavBar;