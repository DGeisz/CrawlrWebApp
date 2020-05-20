import React from 'react';
import styles from "../styles/user.module.css";
import NavBar from "../components/NavBar";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        val1: state.val1
    };
};


function UserLandingPage({val1}) {
    return (
        <>
            <NavBar/>
            <div className="pageContainer">
                <div className={styles.yourLocations}>Your Locations</div>
                <h1>{val1}</h1>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(UserLandingPage);