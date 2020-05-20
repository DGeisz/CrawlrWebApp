import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/styles.css'
import React from 'react';
import {Provider} from 'react-redux';
import App from "next/app";
import makeStore from "../redux/store";
import withRedux from 'next-redux-wrapper';
import {PersistGate} from "redux-persist/integration/react";



class MyApp extends App {

    render() {
        const {Component, pageProps, store} = this.props;

        return (
        <Provider store={store}>
            {/*<PersistGate persistor={store.__PERSISTOR} loading={null}>*/}
                <Component {...pageProps}/>
            {/*</PersistGate>*/}
        </Provider>
        );
    }
}

// const makeStore = () => store;

export default withRedux(makeStore)(MyApp);