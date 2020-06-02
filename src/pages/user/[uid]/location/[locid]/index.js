import React, {useEffect, useRef, useState} from "react";
import styles from '../../../../../styles/locations.module.css'
import Container from "react-bootstrap/Container";
import {useRouter} from 'next/router';
import NavBar from "../../../../../components/NavBar";
import {connect} from 'react-redux';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {emojiArray, emojiNames, smallEmojiSize, smallEmojiStyle} from "../../../../../app-constants/emojis";
import {toRep} from "../../../../../utils/miscFunctions";

/*Sample text data*/
import sampleMsg from '../../../../../fake_data/200Messages';
import Message from "../../../../../components/Message";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import {mdiSend} from "@mdi/js";
import LocationNavigation from "../../../../../components/LocationNavigation";


const barGraphHeight = 400;
const timeFrameOptions = ['Live', 'Day', 'Week', 'All Time'];

const mapStateToProps = state => {
    return {
        locations: state.locations
    }
};


const CrawlrLoc = ({locations}) => {

    const [graphTime, setGraphTime] = useState(0);

    const messageRef = useRef();
    const topRef = useRef();

    const router = useRouter();
    const {locid} = router.query;
    const loc = locations.find(location => location._id === locid);
    console.log("Loc:", loc.name);

    let activeArray;
    switch (graphTime) {
        case 0:
            activeArray = loc.emojiCount.live;
            break;
        case 1:
            activeArray = loc.emojiCount.day;
            break;
        case 2:
            activeArray = loc.emojiCount.week;
            break;
        case 3:
            activeArray = loc.emojiCount.allTime;
            break;
        default:
            activeArray = loc.emojiCount.live;
    }

    const maxVote = Math.max(...activeArray);

    const scrollToBottomMessages = () => {
        messageRef.current.scrollIntoView();
        topRef.current.scrollIntoView();
    };

    useEffect(() => {
        scrollToBottomMessages();
    });

    return (
        <>
            <div ref={topRef}/>
            <NavBar/>
            {/*<div style={{display: "flex", flexDirection: 'row', border: '5px solid black'}}>*/}
            {/*    {emojiArray.map((emoji, index) => {*/}
            {/*        return <img height={smallEmojiSize[index]} src={emoji} alt='emoji' style={smallEmojiStyle[index]}/>*/}
            {/*    })}*/}
            {/*</div>*/}

            <LocationNavigation>
                <h1 className={`${styles.locationTitle} mb-4`}>
                    {loc.name + ' · Dashboard'}
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
                        <Col className='mb-4' lg>
                            <div style={{height: 500}}
                                 className='d-flex flex-column justify-content-center align-items-center'>
                                <div className={styles.timeFrameContainer}>
                                    {timeFrameOptions.map((time, index) => {
                                        if (index === graphTime) {
                                            return (
                                                <div className={styles.timeFrameOptionContainer}>
                                                    <div className={styles.timeFrameOptionActive}>
                                                        {time}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div className={styles.timeFrameOptionContainer}>
                                                <div className={styles.timeFrameOption}
                                                     onClick={() => {
                                                         console.log("Hi There!!")
                                                         setGraphTime(index);
                                                     }}>
                                                    {time}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={styles.barGraph} style={{height: barGraphHeight}}>
                                    <div className={styles.barGraphTopTick} style={{height: barGraphHeight}}/>
                                    {emojiNames.map((emoji, index) => {
                                        let height = (activeArray[index] / maxVote) * (barGraphHeight - 50);
                                        if (activeArray[index] === 0) {
                                            height = 0;
                                        }
                                        return (
                                            <div className={styles.barContainer}
                                                 style={{height: barGraphHeight}}>
                                                <p className={styles.barNumber}>{toRep(activeArray[index])}</p>
                                                <div className={`${styles.bar} rounded-top`}
                                                     style={{height: height}}/>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.labelContainer}>
                                    {emojiArray.map((emoji, index) => {
                                        return (
                                            <div className={styles.emojiContainer}>
                                                <img height={smallEmojiSize[index]}
                                                     src={emoji} alt={"emoji" + index}
                                                     style={smallEmojiStyle[index]}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col className='mb-4' lg>
                            <div className='shadow-sm' style={{borderRadius: 20}}>
                                <div className={styles.messagesContainer}>
                                    <ul>
                                        {sampleMsg.messages.map(msg => {
                                            return <Message msg={msg}/>
                                        })}
                                    </ul>
                                    <div ref={messageRef}/>
                                </div>
                                <div className={`shadow-sm ${styles.inputContainer}`}>
                                    <Form className={styles.inputForm}>
                                        <Form.Group controlId="message" className={styles.inputFormGroup}>
                                            <Form.Control type="message"
                                                          placeholder={`Message ${loc.name}...`}
                                                          className={styles.input}
                                            />
                                        </Form.Group>
                                        <Button type='submit' className='bg-transparent border-0'>
                                            <Icon path={mdiSend} size={1} color={'#ff9494'}/>
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </LocationNavigation>


























            {/*Under here is the main application with all code to default back to if something goes wrong*/}

            {/*<Container fluid className="h-100 min-vh-100">*/}
            {/*    <Row className="h-100 min-vh-100">*/}
            {/*        /!*This is the side bar for large/xl screens*!/*/}
            {/*        <Col lg={2} className='d-none d-lg-block'/>*/}
            {/*        <Col lg={2} className='bg-white shadow-sm p-4 min-vh-100 d-none d-lg-block position-fixed'>*/}
            {/*            <ul className={styles.sideOptionsList}>*/}
            {/*                <li className={styles.sideOption}>Dashboard</li>*/}
            {/*                <li className={styles.sideOption}>Promotions</li>*/}
            {/*                <li className={styles.sideOption}>Events</li>*/}
            {/*                <li className={styles.sideOption}>Info</li>*/}
            {/*                <hr/>*/}
            {/*                <li className={styles.sideOption}>Analytics</li>*/}
            {/*            </ul>*/}
            {/*            /!*<div style={{height: 1000, 'background-color': 'red'}}/>*!/*/}
            {/*        </Col>*/}
            {/*        /!*This is the top menu for small screens*!/*/}
            {/*        <Col lg={3} className='bg-white shadow-sm p-4 d-lg-none'>*/}

            {/*            <ul className={styles.sideOptionsList}>*/}
            {/*                <li className={styles.sideOption}>Dashboard</li>*/}
            {/*                <li className={styles.sideOption}>Promotions</li>*/}
            {/*                <li className={styles.sideOption}>Events</li>*/}
            {/*                <li className={styles.sideOption}>Info</li>*/}
            {/*                <hr/>*/}
            {/*                <li className={styles.sideOption}>Analytics</li>*/}
            {/*            </ul>*/}

            {/*            /!*<div style={{height: 1000, 'background-color': 'red'}}/>*!/*/}
            {/*        </Col>*/}
            {/*        <Col className='p-4'>*/}
            {/*            <h1 className={`${styles.locationTitle} mb-4`}>*/}
            {/*                {loc.name}*/}
            {/*            </h1>*/}
            {/*            /!*<div className='bg-danger h-100 w-25'/>*!/*/}
            {/*            <Container fluid className='min-vh-100'>*/}
            {/*                <Row className='mb-4'>*/}
            {/*                    <Col className='m-2 px-4 pt-4 bg-white shadow-sm rounded' lg>*/}
            {/*                        <h2 className='mb-4'>*/}
            {/*                            Info*/}
            {/*                        </h2>*/}
            {/*                        <h3 className={styles.infoHeader}>Type</h3>*/}
            {/*                        <p className={styles.infoContent}>{loc.type}</p>*/}
            {/*                        <hr/>*/}
            {/*                        <h3 className={styles.infoHeader}>Description</h3>*/}
            {/*                        <p className={styles.infoContent}>{loc.additionalInfo.description}</p>*/}
            {/*                        <hr/>*/}
            {/*                        <h3 className={styles.infoHeader}>Hours</h3>*/}
            {/*                        <p className={styles.infoContent}>{loc.additionalInfo.hours}</p>*/}
            {/*                        <div className='d-flex justify-content-center align-items-center'>*/}
            {/*                            /!*<div className='bg-danger' style={{height: 20, width: 20}}/>*!/*/}
            {/*                            <p className={styles.moreInfo}>More Information</p>*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                    <Col className={`m-2 px-4 pt-4 shadow-sm rounded ${styles.promoContainer}`} lg>*/}
            {/*                        <h2 className={`mb-4 ${styles.promoTitle}`}>*/}
            {/*                            Promotions*/}
            {/*                        </h2>*/}
            {/*                        <h3 className={styles.promoHeader}>Description</h3>*/}
            {/*                        <p className={styles.promoContent}>{loc.promotion.content}</p>*/}
            {/*                        <hr/>*/}

            {/*                        <h3 className={styles.promoHeader}>Duration</h3>*/}
            {/*                        <p className={styles.promoContent}>Tuesday</p>*/}
            {/*                        <div className='d-flex justify-content-center align-items-center'>*/}
            {/*                            /!*<div className='bg-danger' style={{height: 20, width: 20}}/>*!/*/}
            {/*                            <p className={styles.promoInfo}>Edit Promotion</p>*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                    <Col className={`m-2 px-4 pt-4 shadow-sm rounded ${styles.eventContainer}`} lg>*/}
            {/*                        /!*<div className='m-2 p-4 bg-white shadow-sm rounded'>*!/*/}
            {/*                        <h2 className={`mb-4 ${styles.eventTitle}`}>*/}
            {/*                            Events*/}
            {/*                        </h2>*/}
            {/*                        <h3 className={styles.eventHeader}>Description</h3>*/}
            {/*                        <p className={styles.eventContent}>{loc.event.content}</p>*/}
            {/*                        <hr/>*/}

            {/*                        <h3 className={styles.eventHeader}>Expires</h3>*/}
            {/*                        <p className={styles.eventContent}>Tuesday, 1 PM</p>*/}
            {/*                        <div className='d-flex justify-content-center align-items-center'>*/}
            {/*                            /!*<div className='bg-danger' style={{height: 20, width: 20}}/>*!/*/}
            {/*                            <p className={styles.eventInfo}>Edit Event</p>*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row>*/}
            {/*                    <Col className='mb-4' lg>*/}
            {/*                        <div style={{height: 500}}*/}
            {/*                             className='d-flex flex-column justify-content-center align-items-center'>*/}
            {/*                            <div className={styles.timeFrameContainer}>*/}
            {/*                                {timeFrameOptions.map((time, index) => {*/}
            {/*                                    if (index === graphTime) {*/}
            {/*                                        return (*/}
            {/*                                            <div className={styles.timeFrameOptionContainer}>*/}
            {/*                                                <div className={styles.timeFrameOptionActive}>*/}
            {/*                                                    {time}*/}
            {/*                                                </div>*/}
            {/*                                            </div>*/}
            {/*                                        );*/}
            {/*                                    }*/}
            {/*                                    return (*/}
            {/*                                        <div className={styles.timeFrameOptionContainer}>*/}
            {/*                                            <div className={styles.timeFrameOption}*/}
            {/*                                                 onClick={() => {*/}
            {/*                                                     console.log("Hi There!!")*/}
            {/*                                                     setGraphTime(index);*/}
            {/*                                                 }}>*/}
            {/*                                                {time}*/}
            {/*                                            </div>*/}
            {/*                                        </div>*/}
            {/*                                    )*/}
            {/*                                })}*/}
            {/*                            </div>*/}
            {/*                            <div className={styles.barGraph} style={{height: barGraphHeight}}>*/}
            {/*                                <div className={styles.barGraphTopTick} style={{height: barGraphHeight}}/>*/}
            {/*                                {emojiNames.map((emoji, index) => {*/}
            {/*                                    let height = (activeArray[index] / maxVote) * (barGraphHeight - 50);*/}
            {/*                                    if (activeArray[index] === 0) {*/}
            {/*                                        height = 0;*/}
            {/*                                    }*/}
            {/*                                    return (*/}
            {/*                                        <div className={styles.barContainer}*/}
            {/*                                             style={{height: barGraphHeight}}>*/}
            {/*                                            <p className={styles.barNumber}>{toRep(activeArray[index])}</p>*/}
            {/*                                            <div className={`${styles.bar} rounded-top`}*/}
            {/*                                                 style={{height: height}}/>*/}
            {/*                                        </div>*/}
            {/*                                    );*/}
            {/*                                })}*/}
            {/*                            </div>*/}
            {/*                            <div className={styles.labelContainer}>*/}
            {/*                                {emojiArray.map((emoji, index) => {*/}
            {/*                                    return (*/}
            {/*                                        <div className={styles.emojiContainer}>*/}
            {/*                                            <img height={smallEmojiSize[index]}*/}
            {/*                                                 src={emoji} alt={"emoji" + index}*/}
            {/*                                                 style={smallEmojiStyle[index]}*/}
            {/*                                            />*/}
            {/*                                        </div>*/}
            {/*                                    )*/}
            {/*                                })}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                    <Col className='mb-4' lg>*/}
            {/*                        <div className='shadow-sm' style={{borderRadius: 20}}>*/}
            {/*                            <div className={styles.messagesContainer}>*/}
            {/*                                <ul>*/}
            {/*                                    {sampleMsg.messages.map(msg => {*/}
            {/*                                        return <Message msg={msg}/>*/}
            {/*                                    })}*/}
            {/*                                </ul>*/}
            {/*                                <div ref={messageRef}/>*/}
            {/*                            </div>*/}
            {/*                            <div className={`shadow-sm ${styles.inputContainer}`}>*/}
            {/*                                <Form className={styles.inputForm}>*/}
            {/*                                    <Form.Group controlId="message" className={styles.inputFormGroup}>*/}
            {/*                                        <Form.Control type="message"*/}
            {/*                                                      placeholder={`Message ${loc.name}...`}*/}
            {/*                                                      className={styles.input}*/}
            {/*                                        />*/}
            {/*                                    </Form.Group>*/}
            {/*                                    <Button type='submit' className='bg-transparent border-0'>*/}
            {/*                                        <Icon path={mdiSend} size={1} color={'#ff9494'}/>*/}
            {/*                                    </Button>*/}
            {/*                                </Form>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Container>*/}
            {/*            /!*<div style={{height: '100vh', 'background-color': 'blue'}}/>*!/*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Container>*/}
        </>
    );
};

export default connect(mapStateToProps)(CrawlrLoc);