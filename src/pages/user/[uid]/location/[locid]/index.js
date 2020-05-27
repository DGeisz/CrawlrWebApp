import React from "react";
import styles from '../../../../../styles/locations.module.css'
import Container from "react-bootstrap/Container";
import {useRouter} from 'next/router';
import NavBar from "../../../../../components/NavBar";
import {connect} from 'react-redux';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const mapStateToProps = state => {
    return {
        locations: state.locations
    }
};


const CrawlrLoc = ({locations}) => {

    const router = useRouter();
    const {locid} = router.query;
    const loc = locations.find(location => location._id === locid);
    console.log("Loc:", loc.name);

    return (
        <>
            <NavBar/>
            <Container fluid className="h-100 min-vh-100">
                <Row className="h-100 min-vh-100">
                    {/*This is the side bar for large/xl screens*/}
                    <Col lg={2} className='d-none d-lg-block'/>
                    <Col lg={2} className='bg-white shadow-sm p-4 min-vh-100 d-none d-lg-block position-fixed'>
                        <ul className={styles.sideOptionsList}>
                            <li className={styles.sideOption}>Dashboard</li>
                            <li className={styles.sideOption}>Promotions</li>
                            <li className={styles.sideOption}>Events</li>
                            <li className={styles.sideOption}>Info</li>
                            <hr/>
                            <li className={styles.sideOption}>Analytics</li>
                        </ul>
                        {/*<div style={{height: 1000, 'background-color': 'red'}}/>*/}
                    </Col>
                    {/*This is the top menu for small screens*/}
                    <Col lg={3} className='bg-white shadow-sm p-4 d-lg-none'>

                        <ul className={styles.sideOptionsList}>
                            <li className={styles.sideOption}>Dashboard</li>
                            <li className={styles.sideOption}>Promotions</li>
                            <li className={styles.sideOption}>Events</li>
                            <li className={styles.sideOption}>Info</li>
                            <hr/>
                            <li className={styles.sideOption}>Analytics</li>
                        </ul>

                        {/*<div style={{height: 1000, 'background-color': 'red'}}/>*/}
                    </Col>
                    <Col className='p-4'>
                        <h1 className={`${styles.locationTitle} mb-4`}>
                            {loc.name}
                        </h1>
                        {/*<div className='bg-danger h-100 w-25'/>*/}
                        <Container fluid className='min-vh-100'>
                            <Row className='mb-4'>
                                <Col className='m-2 px-4 pt-4 bg-white shadow-sm rounded' lg>
                                    <h2 className='mb-4'>
                                        Info
                                    </h2>
                                    <h3 className={styles.infoHeader}>Type</h3>
                                    <p className={styles.infoContent}>{loc.type}</p>
                                    <hr/>
                                    <h3 className={styles.infoHeader}>Description</h3>
                                    <p className={styles.infoContent}>{loc.additionalInfo.description}</p>
                                    <hr/>
                                    <h3 className={styles.infoHeader}>Hours</h3>
                                    <p className={styles.infoContent}>{loc.additionalInfo.hours}</p>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        {/*<div className='bg-danger' style={{height: 20, width: 20}}/>*/}
                                        <p className={styles.moreInfo}>More Information</p>
                                    </div>
                                </Col>
                                <Col className={`m-2 px-4 pt-4 shadow-sm rounded ${styles.promoContainer}`} lg>
                                    <h2 className={`mb-4 ${styles.promoTitle}`}>
                                        Promotions
                                    </h2>
                                    <h3 className={styles.promoHeader}>Description</h3>
                                    <p className={styles.promoContent}>{loc.promotion.content}</p>
                                    <hr/>

                                    <h3 className={styles.promoHeader}>Duration</h3>
                                    <p className={styles.promoContent}>Tuesday</p>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        {/*<div className='bg-danger' style={{height: 20, width: 20}}/>*/}
                                        <p className={styles.promoInfo}>Edit Promotion</p>
                                    </div>
                                </Col>
                                <Col className={`m-2 px-4 pt-4 shadow-sm rounded ${styles.eventContainer}`} lg>
                                    {/*<div className='m-2 p-4 bg-white shadow-sm rounded'>*/}
                                    <h2 className={`mb-4 ${styles.eventTitle}`}>
                                        Events
                                    </h2>
                                    <h3 className={styles.eventHeader}>Description</h3>
                                    <p className={styles.eventContent}>{loc.event.content}</p>
                                    <hr/>

                                    <h3 className={styles.eventHeader}>Expires</h3>
                                    <p className={styles.eventContent}>Tuesday, 1 PM</p>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        {/*<div className='bg-danger' style={{height: 20, width: 20}}/>*/}
                                        <p className={styles.eventInfo}>Edit Event</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{height: 500, 'background-color': 'pink'}}>
                                        
                                    </div>
                                </Col>
                                <Col>
                                    <div style={{height: 500, 'background-color': 'blue'}}/>

                                </Col>
                            </Row>
                        </Container>
                        {/*<div style={{height: '100vh', 'background-color': 'blue'}}/>*/}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default connect(mapStateToProps)(CrawlrLoc);