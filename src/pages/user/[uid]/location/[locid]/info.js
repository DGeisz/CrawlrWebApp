import React from "react";
import {useRouter} from "next/router";
import NavBar from "../../../../../components/NavBar";
import LocationNavigation from "../../../../../components/LocationNavigation";
import styles from "../../../../../styles/locations.module.css";
import {connect} from 'react-redux'


const mapStateToProps = state => {
    return {
        locations: state.locations
    }
};

const CrawlrLocInfo = ({locations}) => {

    const router = useRouter();
    const {locid} = router.query;

    const loc = locations.find(loc => loc._id === locid);

    return (
        <>
            <NavBar/>
            <LocationNavigation>
                <h1 className={`${styles.locationTitle} mb-4`}>
                    {loc.name + ' · Information'}
                </h1>
                <div>
                    <div className={styles.infoFieldHeader}>
                        <div className={styles.infoFieldTopLeft}>
                            <h2 className='mb-4'>Name</h2>
                        </div>
                        <div classname={styles.infoFieldTopRight}>
                            <h2 className='mb-4'>Name</h2>
                        </div>
                    </div>
                    <hr/>
                </div>
            </LocationNavigation>
        </>
    )
};

export default connect(mapStateToProps)(CrawlrLocInfo);