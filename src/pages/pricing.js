import React from 'react';
import styles from "../styles/user.module.css";
import NavBar from "../components/NavBar";
import {connect} from "react-redux";


function PricingPage({val1}) {
    return (
        <>
            <NavBar/>
            <div className={styles.userContainer}>
                <div className={styles.yourLocations}>This page is about pricing</div>
            </div>
            <h1>{val1}</h1>
        </>
    );
}

export default PricingPage;
// export default connect(mapStateToProps)(UserLandingPage);