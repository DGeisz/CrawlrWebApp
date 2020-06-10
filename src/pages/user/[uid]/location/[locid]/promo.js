import React from 'react';
import NavBar from "../../../../../components/NavBar";
import LocationNavigation from "../../../../../components/LocationNavigation";
import styles from "../../../../../styles/locations.module.css";
import {connect} from 'react-redux';
import {withRouter} from "next/router";
import Icon from "@mdi/react";
import {mdiCircle, mdiSquare, mdiTriangle} from "@mdi/js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {isTodayInDates} from "../../../../../utils/miscFunctions";
import Container from "react-bootstrap/Container";

const mapStateToProps = state => {
    return {
        locations: state.locations,
        promotions: state.promotions
    }
};

/*
* Green - #28a745
* Blue - #007bff
* Red - #dc3545
*/

class CrawlrPromotions extends React.Component {

    constructor(props) {
        super(props);
        this.locid = this.props.router.query.locid;
        this.loc = this.props.locations.find(loc => loc._id === this.locid);
        this.promos = this.props.promotions[Object.keys(this.props.promotions)[0]];

        this.state = {
            showLabels: true
        }
    }

    render() {
        return (
            <>
                <NavBar/>
                <LocationNavigation uid={this.props.router.query.uid} locid={this.props.router.query.locid}>
                    <h1 className={`${styles.locationTitle} mb-4`}>
                        {this.loc.name + ' · Promotions'}
                    </h1>
                    {this.state.showLabels ?
                        <div className='rounded bg-light shadow-sm p-4'>
                            <h2 className={styles.promoTitle} style={{marginBottom: 20}}>Promotion labels</h2>
                            <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                <Icon path={mdiCircle} size={1} color={'#28a745'}/>
                                <div className={styles.promoActiveToday}>
                                    Active Today!
                                </div>
                                <div className={styles.promoLegendDescription}>
                                    {' - This promotion is activated and currently live on Crawlr!'}
                                </div>
                            </div>
                            <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                <Icon path={mdiTriangle} size={1} color={'#007bff'}/>
                                <div className={styles.promoActivated}>
                                    Activated
                                </div>
                                <div className={styles.promoLegendDescription}>
                                    {' - This promotion is activated and will go live on Crawlr on its scheduled dates.'}
                                </div>
                            </div>
                            <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                <Icon path={mdiSquare} size={1} color={'#dc3545'}/>
                                <div className={styles.promoNotActivated}>
                                    Not Activated
                                </div>
                                <div className={styles.promoLegendDescription}>
                                    {' - This promotion is not yet activated, and will not go live until activated.'}
                                </div>
                            </div>
                            <div className={styles.labelToggle}
                                 onClick={() => this.setState({showLabels: false})}>
                                Hide Promotion Labels
                            </div>
                        </div> :
                        <div className={styles.labelToggle}
                             onClick={() => this.setState({showLabels: true})}>
                            Show Promotion Labels
                        </div>}
                    <hr className='mr-2'/>
                    <Row xs={1} sm={1} md={2}>
                        {this.promos.map(promo => {
                            return (
                                <Col className='mt-4'>
                                    {promo.activated ?
                                        isTodayInDates(promo.dates) ?
                                            <div
                                                className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                                <Icon path={mdiCircle} size={1} color={'#28a745'}/>
                                                <div className={styles.promoActiveToday}>
                                                    Active Today!
                                                </div>
                                            </div> :
                                            <div
                                                className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                                <Icon path={mdiTriangle} size={1} color={'#007bff'}/>
                                                <div className={styles.promoActivated}>
                                                    Activated
                                                </div>
                                            </div> :
                                        <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                            <Icon path={mdiSquare} size={1} color={'#dc3545'}/>
                                            <div className={styles.promoNotActivated}>
                                                Not Activated
                                            </div>
                                        </div>
                                    }
                                    <Container className='rounded shadow-sm bg-white p-3'>
                                        <h2 className={styles.promoTitle + ' mb-4'}>
                                            {promo.title}
                                        </h2>
                                        <h3 className={styles.promoHeader}>
                                            Description
                                        </h3>
                                        <p className={styles.promoContent}>
                                            {promo.description}
                                        </p>
                                        <hr/>
                                        <h3 className={styles.promoHeader}>
                                            Dates
                                        </h3>
                                        <p className={styles.promoContent}>
                                            {promo.dates}
                                        </p>

                                    </Container>
                                </Col>
                            );
                        })}
                    </Row>
                </LocationNavigation>
            </>
        );
    }
}

export default connect(mapStateToProps)(withRouter(CrawlrPromotions));