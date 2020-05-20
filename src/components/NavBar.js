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
import {signOut, test1} from "../redux/actions";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";

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
    const router = useRouter();
    if (user) {
        return (
            <Dropdown alignRight>
                <Dropdown.Toggle as={Nav.Item} className={styles.navLink}>
                    {user}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Link href='/user/[uid]' as={`/user/${userID}`}>
                        <Dropdown.Item className={styles.dropItem}>
                            Locations
                        </Dropdown.Item>
                    </Link>
                    <Link href='/user/[uid]' as={`/user/${userID}`}>
                        <Dropdown.Item className={styles.dropItem}>
                            Account
                        </Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Link href='/user/[uid]' as={`/user/${userID}`}>
                        <Button as={Dropdown.Item}
                                className={styles.dropItem}
                                onClick={() => {
                                    signOut();
                                    router.push('/').catch(e => console.log(e));
                                }}>
                            Sign out
                        </Button>

                    </Link>
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
                        box-shadow: #d6d6d6 0 1px 5px;
                    }
                `}
            </style>
            <Navbar expand="sm" variant="white">
                <Container fluid className={"mx-md-3"}>
                    <Navbar.Brand>
                        <Link href="/">
                            <a>
                                <img src="/logo.PNG"
                                     alt="logo"
                                     height="70"
                                     width="70"
                                />
                            </a>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <FontAwesomeIcon icon={faBars} style={{color: MAGENTA}}/>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" variant={"magenta"}>
                            <Nav.Item className="mr-4">
                                <Link href="/pricing" className={styles.navLink}>
                                    <a className={styles.navLink}>Pricing</a>
                                </Link>
                            </Nav.Item>
                            <LoginOrUser user={user} userID={userID} signOut={signOut}/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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