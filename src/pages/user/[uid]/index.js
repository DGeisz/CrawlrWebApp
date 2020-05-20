import React from 'react';
import styles from "../../../styles/user.module.css";
import NavBar from "../../../components/NavBar";
import {connect} from "react-redux";
import {useRouter} from "next/router";

const mapStateToProps = state => {
    return {
        val1: state.val1
    };
};


function UserLandingPage({val1}) {

    const router = useRouter();

    const {uid} = router.query;

    return (
        <>
            <NavBar/>
            <div className="pageContainer">
                <div className={styles.yourLocations}>Your Locations</div>
                <h1>{val1}</h1>
                <h1>{uid}</h1>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(UserLandingPage);