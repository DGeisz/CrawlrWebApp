import React from "react";
import {useRouter, withRouter} from "next/router";
import NavBar from "../../../../../components/NavBar";
import LocationNavigation from "../../../../../components/LocationNavigation";
import styles from "../../../../../styles/locations.module.css";
import {connect} from 'react-redux'
import {Form} from "react-bootstrap";

const locNameMaxLength = 40;
const locTypeMaxLength = 15;
const locDescMaxLength = 140;

const types = ['Bar', 'Club', 'House', 'Food', 'Coffee & Tea'];


const mapStateToProps = state => {
    return {
        locations: state.locations
    }
};

class CrawlrLocInfo extends React.Component{

    constructor(props) {
        super(props);
        this.locid = this.props.router.query.locid;
        this.loc = this.props.locations.find(loc => loc._id === this.locid);
        this.state = {
            name: this.loc.name,
            editName: false,
            type: this.loc.type,
            editType: false,
            description: this.loc.additionalInfo.description,
            editDescription: false,
            website: this.loc.additionalInfo.website,
            editWebsite: false,
            phone: this.loc.additionalInfo.phone,
            editPhone: false,
        }
    }

    nameCancel = () => {
        this.setState({name: this.loc.name, editName: false});
    };

    nameSave = () => {
        if (this.state.name.length === 0) return;
        this.loc.name = this.state.name;
        this.setState({editName: false});
    };

    typeCancel = () => {
        this.setState({type: this.loc.type, editType: false});
    };

    typeSave = () => {
        if (this.state.type.length === 0) return;
        this.loc.type = this.state.type;
        this.setState({editType: false});
    };

    selectType = type => {
        this.loc.type = type;
        this.setState({type: type, editType: false});
    };

    descriptionCancel = () => {
        this.setState({description: this.loc.additionalInfo.description, editDescription: false});
    };

    descriptionSave = () => {
        this.loc.additionalInfo.description = this.state.description;
        this.setState({editDescription: false});
    };

    websiteCancel = () => {
        this.setState({website: this.loc.additionalInfo.website, editWebsite: false});
    };

    websiteSave = () => {
        this.loc.additionalInfo.website = this.state.website;
        this.setState({editWebsite: false});
    };

    phoneCancel = () => {
        this.setState({phone: this.loc.additionalInfo.phone, editPhone: false});
    };

    phoneSave = () => {
        this.loc.additionalInfo.phone = this.state.phone;
        this.setState({editPhone: false});
    };

    phoneRef = React.createRef();

    phoneInput = e => {
        const onlyNumbers = e.target.value.replace(/\D/g, '');
        console.log(e.target.value, onlyNumbers);
        if (onlyNumbers !== ''){
            let finalPhone;
            if (onlyNumbers.length > 3) {
                finalPhone = '(' + onlyNumbers.slice(0, 3) + ')' + ' ' + onlyNumbers.slice(3, 6);
            } else {
                return this.setState({phone: onlyNumbers})
            }
            if (onlyNumbers.length > 6) {
                finalPhone += '-' + onlyNumbers.slice(6, 10);
            }
            this.setState({phone: finalPhone});
        } else {
            this.setState({phone: ''});
        }
    };





    // const router = useRouter();
    // const {locid} = router.query;
    //
    // const loc = locations.find(loc => loc._id === locid);

    render() {


        return (
            <>
                <NavBar/>
                <LocationNavigation>
                    <h1 className={`${styles.locationTitle} mb-4`}>
                        {this.loc.name + ' · Information'}
                    </h1>
                    <div className='row'>
                        <div className='col-12 col-md-8 col-xl-6'>
                            <div>
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Name</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editName ?
                                                <h2 className={styles.editInfoField}
                                                    onClick={() => this.setState({editName: true})}>
                                                    Edit
                                                </h2> : null
                                        }
                                    </div>
                                </div>
                                {this.state.editName ?
                                    <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="editName">
                                            <Form.Control type="name"
                                                          placeholder="Enter location name..."
                                                          value={this.state.name}
                                                          onChange={e => this.setState({name: e.target.value.slice(0, locNameMaxLength)})}
                                            />
                                            <Form.Text>{`Characters Remaining: ${locNameMaxLength - this.state.name.length}`}</Form.Text>
                                            <div className={styles.formButtons}>
                                                <div className={styles.cancel} onClick={this.nameCancel}>
                                                    Cancel
                                                </div>
                                                <div className={this.state.name ? styles.save : styles.disabledSave}
                                                     onClick={this.nameSave}>
                                                    Save
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                    : <>{this.state.name ? <p className={styles.infoContent}>{this.state.name}</p> :
                                        <p className={styles.emptyContent}>No name</p>}</>
                                }
                                <hr/>

                                {/*Type*/}
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Type</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editType ?
                                                <h2 className={styles.editInfoField}
                                                    onClick={() => this.setState({editType: true})}>
                                                    Edit
                                                </h2> : null
                                        }
                                    </div>
                                </div>
                                {this.state.editType ?
                                    <>
                                        <h3 className={styles.editInfoHeader}>Select your location's type:</h3>
                                        <div className={styles.infoFieldHeader}>
                                            {types.map(type => {
                                                return (
                                                    <div className={styles.typeOption}
                                                         onClick={() => this.selectType(type)}>
                                                        {type}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <hr/>
                                        <Form onSubmit={e => e.preventDefault()}>
                                            <Form.Group controlId="editType">
                                                <h3 className={styles.editInfoHeader}>Or enter custom type:</h3>
                                                <Form.Control type="type"
                                                              placeholder="Enter custom type..."
                                                              value={this.state.type}
                                                              onChange={e => this.setState({type: e.target.value.slice(0, locTypeMaxLength)})}
                                                />
                                                <Form.Text>{`Characters Remaining: ${locTypeMaxLength - this.state.type.length}`}</Form.Text>
                                                <p style={{fontSize: 16, marginTop: 10}}>Note: Custom types may be more difficult to find in location searches </p>
                                                <div className={styles.formButtons}>
                                                    <div className={styles.cancel} onClick={this.typeCancel}>
                                                        Cancel
                                                    </div>
                                                    <div className={this.state.type ? styles.save : styles.disabledSave}
                                                         onClick={this.typeSave}>
                                                        Save
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Form>
                                    </>
                                    : <>{this.state.type ? <p className={styles.infoContent}>{this.state.type}</p> :
                                        <p className={styles.emptyContent}>No type</p>}</>
                                }
                                <hr/>


                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Description</h2>
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
                                                          as="textarea"
                                                          placeholder="Enter location description..."
                                                          value={this.state.description}
                                                          onChange={e => this.setState({description: e.target.value.slice(0, locDescMaxLength)})}
                                            />
                                            <Form.Text>{`Characters Remaining: ${locDescMaxLength - this.state.description.length}`}</Form.Text>
                                            <div className={styles.formButtons}>
                                                <div className={styles.cancel} onClick={this.descriptionCancel}>
                                                    Cancel
                                                </div>
                                                <div className={styles.save} onClick={this.descriptionSave}>
                                                    Save
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                    : <>{this.state.description ?
                                        <p className={styles.infoContent}>{this.state.description}</p> :
                                        <p className={styles.emptyContent}>No Description</p>}</>
                                }
                                <hr/>


                                {/*Website*/}
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Website</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editWebsite ?
                                                <h2 className={styles.editInfoField}
                                                    onClick={() => this.setState({editWebsite: true})}>
                                                    Edit
                                                </h2> : null
                                        }
                                    </div>
                                </div>
                                {this.state.editWebsite ?
                                    <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="editWebsite">
                                            <Form.Control type="website"
                                                          placeholder="Enter location website..."
                                                          value={this.state.website}
                                                          onChange={e => this.setState({website: e.target.value})}
                                            />
                                            <div className={styles.formButtons}>
                                                <div className={styles.cancel} onClick={this.websiteCancel}>
                                                    Cancel
                                                </div>
                                                <div className={styles.save} onClick={this.websiteSave}>
                                                    Save
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                    : <>{this.state.website ?
                                        <p className={styles.infoContent}>{this.state.website}</p> :
                                        <p className={styles.emptyContent}>No Website</p>}</>
                                }
                                <hr/>

                                {/*Phone*/}
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Phone</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editPhone ?
                                                <h2 className={styles.editInfoField}
                                                    onClick={() => this.setState({editPhone: true})}>
                                                    Edit
                                                </h2> : null
                                        }
                                    </div>
                                </div>
                                {this.state.editPhone ?
                                    <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="editPhone">
                                            <Form.Control ref={this.phoneRef}
                                                          type="phone"
                                                          placeholder="Enter location phone..."
                                                          value={this.state.phone}
                                                          onChange={this.phoneInput}
                                            />
                                            <div className={styles.formButtons}>
                                                <div className={styles.cancel} onClick={this.phoneCancel}>
                                                    Cancel
                                                </div>
                                                <div className={styles.save} onClick={this.phoneSave}>
                                                    Save
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                    : <>{this.state.phone ? <p className={styles.infoContent}>{this.state.phone}</p> :
                                        <p className={styles.emptyContent}>No Phone</p>}</>
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