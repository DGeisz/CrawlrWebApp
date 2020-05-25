import React from "react";
import NavBar from "../../../components/NavBar";
import Container from "react-bootstrap/Container";
import {useRouter} from "next/router";
import Row from "react-bootstrap/Row";
import {connect} from "react-redux";
import Col from "react-bootstrap/Col";
import {emojiArray, emojiOpacity, emojiSize, emojiStyle} from "../../../app-constants/emojis";
import Link from "next/link";
import {currentEmoji} from "../../../helper_functions/emojiHelpers";
import Button from "react-bootstrap/Button";

const mapStateToProps = state => {
    return {
        locations: state.locations,
        userID: state.userID
    }
};


/**
 * This shows all the users claimed locations
 * */
function CrawlrLocations({locations, userID}){
    const router = useRouter();

    return (
        <>
            <style type="text/css">
                {`
                    // .location {
                    //     height: 50px !important;
                    // }
                    .location:hover {
                        background-color: rgba(196, 134, 172, 0.4)!important;
                    }
                    
                    .location:active {
                        background-color: rgba(214, 13, 137, 0.8)!important;
                    }
                    
                    .location:active h2 {
                        color: white !important;
                    }
                    
                    
                    .test {
                        flex-direction: row;
                    }
                    
                    .btn-pink {
                        background-color: #d60d89;
                        color: white;
                        font-size: 18pt;
                    }
                    
                    .btn-pink:hover {
                        background-color: #9c0964;
                        color: white;
                        font-size: 18pt;
                    }
                  
                `}

            </style>
            <NavBar/>
            {/*<div className='test'>*/}
            {/*    {emojiArray.map((img, index) => {*/}
            {/*        return <img height={emojiSize[index]} src={img} alt={"Emoji"} style={emojiStyle[index]}/>;*/}
            {/*    })}*/}
            {/*</div>*/}
            <Container className="mb-4">
                <h1 className='mt-4'>Your Locations</h1>
                <Row xs={1} sm={1} md={2} lg={3}>
                    {locations.map((loc) => {
                        const [emoji, opacity] = currentEmoji(loc.emojiCount);
                        console.log(loc.emojiCount.live.indexOf(Math.max(...loc.emojiCount.live)));
                        return (
                            <Col className='mt-4'>
                                <Link href='/user/[uid]/location/[locid]' as={`/user/${userID}/location/${loc._id}`}>
                                    <div className='h-100 px-4 pt-4 bg-white rounded shadow-sm location'>
                                        <h2>{loc.name}</h2>
                                        <hr/>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <img height={emojiSize[emoji]} src={emojiArray[emoji]}
                                                 style={{...emojiStyle[emoji], ...emojiOpacity[opacity]}}
                                                 alt={"Emoji"}/>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        );
                    })}
                    <Col className='mt-4'>
                        <div style={{height: '300px !important'}} className='d-flex align-items-center justify-content-center rounded bg-white h-100 shadow-sm p-5'>
                            <Button variant="pink">
                                Claim a new Location!
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

const Locations = connect(mapStateToProps)(CrawlrLocations);

export default Locations;