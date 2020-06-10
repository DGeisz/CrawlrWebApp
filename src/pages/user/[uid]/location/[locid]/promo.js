import React from 'react';
import NavBar from "../../../../../components/NavBar";
import LocationNavigation from "../../../../../components/LocationNavigation";
import styles from "../../../../../styles/locations.module.css";
import {connect} from 'react-redux';
import {withRouter} from "next/router";
import Icon from "@mdi/react";
import {mdiCircle, mdiSquare, mdiTriangle} from "@mdi/js";

const mapStateToProps = state => {
    return {
        locations: state.locations
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
    }

    render() {
        return (
            <>
                <NavBar/>
                <LocationNavigation uid={this.props.router.query.uid} locid={this.props.router.query.locid}>
                    <h1 className={`${styles.locationTitle} mb-4`}>
                        {this.loc.name + ' · Promotions'}
                    </h1>
                    <div className='rounded bg-light shadow-sm p-4 w-75'>
                        <h2 style={{color: '#548f74', marginBottom: 20}}>Promotion labels</h2>
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
                    </div>
                </LocationNavigation>
            </>
        )
    }
}

export default connect(mapStateToProps)(withRouter(CrawlrPromotions));