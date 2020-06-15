import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/styles.css'
import React from 'react';
import {Provider} from 'react-redux';
import App from "next/app";
import makeStore from "../redux/store";
import withRedux from 'next-redux-wrapper';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {PersistGate} from "redux-persist/integration/react";

const stripePromise = loadStripe("pk_test_51GuMMEISfv4tph7YEJi7cMzXmmfFQ7WDQFkiEsA4cJBUAxPdWEC6klUKxueTSMRudWhJYXWe3we11HkQtpJMt4de005Ysm95m2");


class MyApp extends App {

    render() {
        const {Component, pageProps, store} = this.props;

        return (
        <Provider store={store}>
            {/*<PersistGate persistor={store.__PERSISTOR} loading={null}>*/}
            <Elements stripe={stripePromise}>
                <Component {...pageProps}/>
            </Elements>
            {/*</PersistGate>*/}
        </Provider>
        );
    }
}

// const makeStore = () => store;

export default withRedux(makeStore)(MyApp);