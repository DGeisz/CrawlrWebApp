import React from "react";
import {withRouter} from "next/router";
import NavBar from "../../../../../components/NavBar";
import LocationNavigation from "../../../../../components/LocationNavigation";
import styles from "../../../../../styles/locations.module.css";
import {connect} from 'react-redux'
import {Form} from "react-bootstrap";
import {
    dateTimeToReadable,
    militaryBlockToStandardInterval
} from "../../../../../helper_functions/generalFunctions";

const eventDescriptionMaxLength = 100;

const types = ['Bar', 'Club', 'House', 'Food', 'Coffee & Tea', 'Dessert'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



const mapStateToProps = state => {
    return {
        locations: state.locations
    }
};


/**
 * Helper function that let's me know if a day has been taken in
 * a set of hours*/
function dayTaken(hours, day) {
    for (let i = 0; i < hours.length; i++){
        if (hours[i].days.includes(day)){
            return true;
        }
    }
    return false;
}

class CrawlrLocInfo extends React.Component{

    constructor(props) {
        super(props);
        this.locid = this.props.router.query.locid;
        this.loc = this.props.locations.find(loc => loc._id === this.locid);
        this.state = {
            description: this.loc.event.content,
            editDescription: false,
            expires: this.loc.event.expires,
            editExpires: false
        }
    }

    descriptionCancel = () => {
        this.setState({description: this.loc.event.content, editDescription: false});
    };

    descriptionSave = () => {
        this.loc.event.content = this.state.description;
        this.setState({editDescription: false});
    };

    expiresCancel = () => {
        this.setState({expires: this.loc.event.expires, editExpires: false});
    };

    expiresSave = () => {
        this.loc.event.expires = this.state.expires;
        this.setState({editExpires: false});
    };




    render() {
        return (
            <>
                <NavBar/>
                <LocationNavigation>
                    <h1 className={`${styles.locationTitle} mb-4`}>
                        {this.loc.name + ' · Events'}
                    </h1>
                    <div className='row'>
                        <div className='col-12 col-md-8 col-xl-6'>
                            <div>
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4' style={{color: '#146fc9'}}>Event Description</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editDescription ?
                                                <h2 className={styles.editInfoField}
                                                    onClick={() => this.setState({editDescription: true})}>
                                                    Edit
                                                </h2> : null
                                        }
                                    </div>
                                </div>
                                {this.state.editDescription ?
                                    <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="editDescription">
                                            <Form.Control type="description"
                                                          placeholder="Enter event description..."
                                                          value={this.state.description}
                                                          onChange={e => this.setState({description: e.target.value.slice(0, eventDescriptionMaxLength)})}
                                            />
                                            <Form.Text>{`Characters Remaining: ${eventDescriptionMaxLength - this.state.description.length}`}</Form.Text>
                                            <div className={styles.formButtons}>
                                                <div className={styles.cancel} onClick={this.descriptionCancel}>
                                                    Cancel
                                                </div>
                                                <div className={styles.save}
                                                     onClick={this.descriptionSave}>
                                                    Save
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                    : <>{this.state.description ? <p className={styles.infoContent}>{this.state.description}</p> :
                                        <p className={styles.emptyContent}>No event description</p>}</>
                                }
                                <hr/>

                                {/*Expires*/}
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4' style={{color: '#146fc9'}}>Expires</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editExpires ?
                                                <h2 className={styles.editInfoField}
                                                    onClick={() => this.setState({editExpires: true})}>
                                                    Edit
                                                </h2> : null
                                        }
                                    </div>
                                </div>
                                {this.state.editExpires ?
                                    <>
                                        <Form onSubmit={e => e.preventDefault()}>
                                            <Form.Group controlId='formBasicCheckbox'>
                                                <Form.Check type='checkbox' label='Never Expires' style={{color: 'red'}}/>
                                            </Form.Group>
                                            <Form.Group controlId="editExpires">
                                                <Form.Label>Enter event expiration date/time:</Form.Label>
                                                <Form.Control type="datetime-local"
                                                              placeholder=''
                                                              value={this.state.expires}
                                                              onChange={e => this.setState({expires: e.target.value})}
                                                />
                                                <div className={styles.formButtons}>
                                                    <div className={styles.cancel} onClick={this.expiresCancel}>
                                                        Cancel
                                                    </div>
                                                    <div className={styles.save}
                                                         onClick={this.expiresSave}>
                                                        Save
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Form>
                                    </>
                                    : <>{this.state.expires ? <p className={styles.infoContent}>{dateTimeToReadable(this.state.expires)}</p> :
                                        <p className={styles.emptyContent}>No expiration date</p>}</>
                                }
                                <hr/>
                            </div>
                        </div>
                    </div>
                </LocationNavigation>
            </>
        );
    }

}

export default connect(mapStateToProps)(withRouter(CrawlrLocInfo));