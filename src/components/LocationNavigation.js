import React from "react";
import styles from '../styles/locations.module.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from 'next/link';

const LocationNavigation = ({children, locid, uid}) => {

    return (
        <>
            <Container fluid className="h-100 min-vh-100">
                <Row className="h-100 min-vh-100">
                    {/*This is the side bar for large/xl screens*/}
                    <Col lg={2} className='d-none d-lg-block'/>
                    <Col lg={2} className='bg-white shadow-sm p-4 min-vh-100 d-none d-lg-block position-fixed'>
                        <ul className={styles.sideOptionsList}>
                            <Link href='/user/[uid]/location/[locid]/' as={`/user/${uid}/location/${locid}/`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>
                                        Dashboard
                                    </li>
                                </a>
                            </Link>

                            <Link href='/user/[uid]/location/[locid]/promo'
                                  as={`/user/${uid}/location/${locid}/promo`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>
                                        Promotions
                                    </li>
                                </a>
                            </Link>
                            <Link href='/user/[uid]/location/[locid]/event'
                                  as={`/user/${uid}/location/${locid}/event`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>
                                        Events
                                    </li>
                                </a>
                            </Link>
                            <Link href='/user/[uid]/location/[locid]/info'
                                  as={`/user/${uid}/location/${locid}/info`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>
                                        Info
                                    </li>
                                </a>
                            </Link>
                            <hr/>
                            <li className={styles.sideOption}>Analytics</li>
                        </ul>
                        {/*<div style={{height: 1000, 'background-color': 'red'}}/>*/}
                    </Col>
                    {/*This is the top menu for small screens*/}
                    <Col lg={3} className='bg-white shadow-sm p-4 d-lg-none'>

                        <ul className={styles.sideOptionsList}>
                            <Link href='/user/[uid]/location/[locid]/' as={`/user/${uid}/location/${locid}/`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>
                                        Dashboard
                                    </li>
                                </a>
                            </Link>

                            <Link href='/user/[uid]/location/[locid]/promo'
                                  as={`/user/${uid}/location/${locid}/promo`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>
                                        Promotions
                                    </li>
                                </a>
                            </Link>
                            <Link href='/user/[uid]/location/[locid]/event'
                                  as={`/user/${uid}/location/${locid}/event`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>
                                        Events
                                    </li>
                                </a>
                            </Link>
                            <Link href='/user/[uid]/location/[locid]/info'
                                  as={`/user/${uid}/location/${locid}/info`}>
                                <a className={styles.sideOptionText}>
                                    <li className={styles.sideOption}>

                                        Info
                                    </li>
                                </a>
                            </Link>
                            <hr/>
                            <li className={styles.sideOption}>Analytics</li>
                        </ul>

                        {/*<div style={{height: 1000, 'background-color': 'red'}}/>*/}
                    </Col>
                    <Col className='p-4'>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LocationNavigation;
