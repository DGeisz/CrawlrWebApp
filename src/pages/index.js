import React from 'react';
import NavBar from "../components/NavBar";
import {test1, test2} from "../redux/actions";
import {connect} from "react-redux";
import Link from "next/link";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const mapStateToProps = state => {
    return {
        val1: state.val1,
        val2: state.val2
    }
};

const mapDispatchToProps = dispatch => {
    return {
        test1: () => dispatch(test1()),
        test2: () => dispatch(test2())
    };
};

class FirstPage extends React.Component {


    render() {
        return (
            <>
                <NavBar/>
                <Container className="rounded border p-5 mt-4 w-50 bg-white">
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                I'm going to spread your info to the ends of the Earth
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password"/>
                        </Form.Group>

                        <Form.Group controlId="checkBox">
                            <Form.Check type="checkbox" label="Check if you want an instant kill"/>
                        </Form.Group>
                        <Button type="submit">
                            Submit this bad boi
                        </Button>
                    </Form>

                    {/*<div>*/}
                    {/*    <button onClick={this.props.test1}>Test1</button>*/}
                    {/*    <button onClick={this.props.test2}>Test2</button>*/}
                    {/*    <h1>{this.props.val1}</h1>*/}
                    {/*    <h1>{this.props.val2}</h1>*/}
                    {/*    <Link href="/user">*/}
                    {/*        <a>Hey there jeffrey!</a>*/}
                    {/*    </Link>*/}
                    {/*    <FontAwesomeIcon icon={faCoffee}/>*/}
                    {/*</div>*/}
                </Container>
            </>
            // <div className={styles.loginContainer}>
            //     <div className={styles.signInContainer}>
            //         <div className={styles.signInTitle}>
            //             Crawlr
            //         </div>
            //         <div className={styles.appSignIn}>
            //         {/*    App Stuff*/}
            //         </div>
            //         <div className={styles.orContainer}>
            //             <div className={styles.orBar}/>
            //             <div className={styles.or}>OR</div>
            //             <div className={styles.orBar}/>
            //
            //         </div>
            //         <div className={styles.standardSignIn}>
            //         {/*    Username*/}
            //         {/*    Password*/}
            //         </div>
            //     </div>
            //     <div className={styles.signUpContainer}>
            //         Don't have an account? Sign up
            //     </div>
            // </div>
        );

    }
}

// function FirstPage({val1, val2, test1, test2}) {
//     return (
//         <>
//             <NavBar/>
//             <div>
//                 <button onClick={test1}>Test1</button>
//                 <button onClick={test2}>Test2</button>
//                 <h1>{val1}</h1>
//                 <h1>{val2}</h1>
//                 <Link href="/user">
//                     <a>Hey there jeffrey!</a>
//                 </Link>
//             </div>
//         </>
//         // <div className={styles.loginContainer}>
//         //     <div className={styles.signInContainer}>
//         //         <div className={styles.signInTitle}>
//         //             Crawlr
//         //         </div>
//         //         <div className={styles.appSignIn}>
//         //         {/*    App Stuff*/}
//         //         </div>
//         //         <div className={styles.orContainer}>
//         //             <div className={styles.orBar}/>
//         //             <div className={styles.or}>OR</div>
//         //             <div className={styles.orBar}/>
//         //
//         //         </div>
//         //         <div className={styles.standardSignIn}>
//         //         {/*    Username*/}
//         //         {/*    Password*/}
//         //         </div>
//         //     </div>
//         //     <div className={styles.signUpContainer}>
//         //         Don't have an account? Sign up
//         //     </div>
//         // </div>
//     );
//
// }

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);