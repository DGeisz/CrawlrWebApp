import React from "react";
import styles from '../styles/locations.module.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const LocationNavigation = ({locations, children}) => {

    return (
        <>
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
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LocationNavigation;
