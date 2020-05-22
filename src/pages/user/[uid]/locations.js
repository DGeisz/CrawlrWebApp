import React, {Component} from "react";
import NavBar from "../../../components/NavBar";
import Container from "react-bootstrap/Container";
import {useRouter} from "next/router";

function Locations(){
    const router = useRouter();
    const {uid} = router.query;

    return (
        <>
            <NavBar/>
            <h1>{uid}</h1>
        </>
    )
}


export default Locations;