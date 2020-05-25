import React from "react";
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
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col lg={3} className='bg-white shadow-sm p-4 h-100'>
                        <h2>
                            {loc.name}
                        </h2>
                        <ul>
                            <li>Dashboard</li>
                            <li>Promotions</li>
                            <li>Events</li>
                            <li>Info</li>
                            <hr/>
                            <li>Analytics</li>
                        </ul>
                        {/*<div style={{height: 1000, 'background-color': 'red'}}/>*/}
                    </Col>
                    <Col>
                        {/*<div style={{height: 1000, 'background-color': 'blue'}}/>*/}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default connect(mapStateToProps)(CrawlrLoc);