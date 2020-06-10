import React from "react";
import {useRouter, withRouter} from "next/router";
import NavBar from "../../../../../components/NavBar";
import LocationNavigation from "../../../../../components/LocationNavigation";
import styles from "../../../../../styles/locations.module.css";
import {connect} from 'react-redux'
import {Form} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiPlus} from "@mdi/js";
import {stateAbbreviations} from "../../../../../app-constants/states";
import {dayArrayToInternal, hoursToIntervals} from "../../../../../utils/miscFunctions";

const locNameMaxLength = 40;
const locTypeMaxLength = 15;
const locDescMaxLength = 140;
const locStreetMaxLength = 95;
const locCityMaxLength = 28;


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
            hours: this.loc.additionalInfo.hours,
            editHours: false,
            address: this.loc.additionalInfo.address,
            editAddress: false,
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

    takeDay = (hourIndex, day) => {
        let hoursCopy = this.state.hours.slice();
        hoursCopy[hourIndex].days.push(day);
        this.setState({hours: hoursCopy});
    };

    removeDay = (hourIndex, day) => {
        let hoursCopy = this.state.hours.slice();
        const dayIndex = hoursCopy[hourIndex].days.indexOf(day);
        hoursCopy[hourIndex].days.splice(dayIndex, 1);
        this.setState({hours: hoursCopy});
    };

    setHours = (time, hourIndex, from = true, split) => {
        let hoursCopy = this.state.hours.slice();
        let fromTo;
        if (from) {
            fromTo = time + ';' + hoursCopy[hourIndex].hours[split].split(';')[1];
        } else {
            fromTo = hoursCopy[hourIndex].hours[split].split(';')[0] + ';' + time;
        }
        hoursCopy[hourIndex].hours[split] = fromTo;
        this.setState({hours: hoursCopy});
    };

    getHours = (hourIndex, from = true, split) => {
        const fromTo = from ? 0 : 1;
        try {
            return this.state.hours[hourIndex].hours[split].split(';')[fromTo];}
        catch (e) {
            return '';
        }
    };

    splitHours = hourIndex => {
        let hoursCopy = this.state.hours.slice();
        let hoursSplit = hoursCopy[hourIndex].hours[0].split(';');
        hoursCopy[hourIndex].hours[1] = hoursSplit[1] + ';' + hoursSplit[0];
        this.setState({hours: hoursCopy});
    };

    unSplitHours = hourIndex => {
        let hoursCopy = this.state.hours.slice();
        hoursCopy[hourIndex].hours[1] = '';
        this.setState({hours: hoursCopy});
    };

    newHoursAvailable = () => {
        let allDays = [];
        for (let i = 0; i < this.state.hours.length; i++) {
            allDays = allDays.concat(this.state.hours[i].days);
        }
        return allDays.length < 7 && this.state.hours.length < 7;
    };

    addNewHours = () => {
        let newDays = [];
        let allDays = [];
        for (let i = 0; i < this.state.hours.length; i++) {
            allDays = allDays.concat(this.state.hours[i].days);
        }
        days.forEach(day => {
            if (!allDays.includes(day)) {
                newDays.push(day);
            }
        });
        let newHours = {
            days: newDays,
            hours: ['09:00;17:00']
        };
        let hoursCopy = this.state.hours.slice();
        hoursCopy.push(newHours);
        this.setState({hours: hoursCopy});
    };

    hoursCancel = () => {
        this.setState({hours: this.loc.additionalInfo.hours, editHours: false});
    };

    hoursSave = () => {
        let checkHours = this.state.hours.slice();
        let i = 0;
        while (i < checkHours.length) {
            if (checkHours[i].days.length === 0) {
                checkHours.splice(i, 1);
            } else {
                i++;
            }
        }
        this.loc.additionalInfo.hours = checkHours;
        this.setState({hours: checkHours, editHours: false});
    };

    addressSave = () => {
        this.loc.additionalInfo.address = this.state.address;
        this.setState({editAddress: false});
    };

    addressCancel = () => {
        this.setState({address: this.loc.additionalInfo.address, editAddress: false});
    };



    render() {
        return (
            <>
                <NavBar/>
                <LocationNavigation locid={this.props.router.query.locid}
                                    uid={this.props.router.query.uid}>
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
                                        <div className={styles.flexRowWrap}>
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
                                                <p style={{fontSize: 16, marginTop: 10}}>Note: Custom types may be more
                                                    difficult to find in location searches </p>
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

                                {/*Description*/}
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

                                {/*Hours*/}
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Hours</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editHours ?
                                                <h2 className={styles.editInfoField}
                                                    onClick={() => this.setState({editHours: true})}>
                                                    Edit
                                                </h2> : null
                                        }
                                    </div>
                                </div>
                                {this.state.editHours ?
                                    <>
                                        {this.state.hours.map((hour, hourIndex) => {
                                            return (
                                                <>
                                                    <div className={styles.flexRowWrap} style={{marginTop: 40}}>
                                                        {days.map(day => {
                                                            if (hour.days.includes(day)) { //Day active
                                                                return (
                                                                    <div className={styles.activeDayButton}
                                                                         onClick={() => this.removeDay(hourIndex, day)}>
                                                                        {day}
                                                                    </div>
                                                                );
                                                            } else if (dayTaken(this.state.hours, day)) { //Day is taken
                                                                return (
                                                                    <div className={styles.takenDayButton}>
                                                                        {day}
                                                                    </div>
                                                                );
                                                            } else { //day is vacant
                                                                return (
                                                                    <div className={styles.vacantDayButton}
                                                                         onClick={() => this.takeDay(hourIndex, day)}>
                                                                        {day}
                                                                    </div>
                                                                );
                                                            }
                                                        })}
                                                    </div>
                                                    <Form inline onSubmit={e => e.preventDefault()}
                                                          style={{marginTop: 10, marginBottom: 10}}>
                                                        <div className={styles.hoursText}>From:</div>
                                                        <Form.Group controlId='timeDigits1'>
                                                            <Form.Control type='time'
                                                                          onChange={e => {
                                                                              this.setHours(e.target.value, hourIndex, true, 0);
                                                                          }}
                                                                          value={this.getHours(hourIndex, true, 0)}/>
                                                        </Form.Group>
                                                        <div className={styles.hoursText} style={{marginLeft: 20}}>To:
                                                        </div>
                                                        <Form.Group controlId='timeDigits2'>
                                                            <Form.Control type='time'
                                                                          onChange={e => {
                                                                              this.setHours(e.target.value, hourIndex, false, 0);
                                                                          }}
                                                                          value={this.getHours(hourIndex, false, 0)}/>
                                                        </Form.Group>
                                                    </Form>
                                                    {this.state.hours[hourIndex].hours[1] ?
                                                        <>
                                                            <Form inline onSubmit={e => e.preventDefault()}
                                                                  style={{marginTop: 10, marginBottom: 10}}>
                                                                <div className={styles.hoursText}>From:</div>
                                                                <Form.Group controlId='timeDigits1'>
                                                                    <Form.Control type='time'
                                                                                  onChange={e => {
                                                                                      this.setHours(e.target.value, hourIndex, true, 1);
                                                                                  }}
                                                                                  value={this.getHours(hourIndex, true, 1)}/>
                                                                </Form.Group>
                                                                <div className={styles.hoursText}
                                                                     style={{marginLeft: 20}}>To:
                                                                </div>
                                                                <Form.Group controlId='timeDigits2'>
                                                                    <Form.Control type='time'
                                                                                  onChange={e => {
                                                                                      this.setHours(e.target.value, hourIndex, false, 1);
                                                                                  }}
                                                                                  value={this.getHours(hourIndex, false, 1)}/>
                                                                </Form.Group>
                                                            </Form>
                                                            <div className={styles.activeDayButton}
                                                                 style={{width: 220}}
                                                                 onClick={() => this.unSplitHours(hourIndex)}>
                                                                Remove Service Hours Split
                                                            </div>
                                                        </> :

                                                        <div className={styles.activeDayButton}
                                                             style={{width: 160}}
                                                             onClick={() => this.splitHours(hourIndex)}>
                                                            Split Service Hours
                                                        </div>
                                                    }
                                                    {this.state.hours.length - 1 !== hourIndex &&
                                                    <hr className='w-75' style={{marginTop: 40}}/>}
                                                </>
                                            );
                                        })}

                                        {this.newHoursAvailable() &&
                                        <div className={styles.addHours}
                                             onClick={this.addNewHours}>
                                            <Icon path={mdiPlus} color={'green'} size={1.2}/>
                                            Add additional hours
                                        </div>}
                                        <div className={styles.formButtons}
                                             style={{marginTop: 30}}>
                                            <div className={styles.cancel} onClick={this.hoursCancel}>
                                                Cancel
                                            </div>
                                            <div className={styles.save}
                                                 onClick={this.hoursSave}>
                                                Save
                                            </div>
                                        </div>
                                    </>
                                    : this.state.hours.map(hour => {
                                        return (
                                            <div className={styles.flexRowWrap}>
                                                <div className={styles.infoContent}
                                                     style={{flex: 1}}>
                                                    {dayArrayToInternal(hour.days)}
                                                </div>
                                                <div
                                                    className={styles.infoContent}>
                                                    {hoursToIntervals(hour.hours)}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <hr/>

                                {/*Address*/}
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Address</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editAddress &&
                                            <h2 className={styles.editInfoField}
                                                onClick={() => this.setState({editAddress: true})}>
                                                Edit
                                            </h2>
                                        }
                                    </div>
                                </div>
                                {this.state.editAddress ?
                                    <Form onSubmit={e => e.preventDefault()}>
                                        <Form.Group controlId="editAddress">
                                            <Form.Label className={styles.smallBoldMagentaText}>Street
                                                Address:</Form.Label>
                                            <Form.Control type='street'
                                                          placeholder='Enter street address...'
                                                          value={this.state.address.street}
                                                          onChange={
                                                              e => {
                                                                  this.setState(
                                                                      {
                                                                          address: Object.assign(
                                                                              {},
                                                                              this.state.address,
                                                                              {
                                                                                  street: e.target.value.slice(0, locStreetMaxLength)
                                                                              }
                                                                          )
                                                                      }
                                                                  )
                                                              }
                                                          }/>
                                            <Form.Text>{`Characters Remaining: ${locStreetMaxLength - this.state.address.street.length}`}</Form.Text>
                                            <Form.Label className={styles.smallBoldMagentaText}
                                                        style={{marginTop: 20}}>City:</Form.Label>
                                            <Form.Control type='city'
                                                          placeholder='Enter city...'
                                                          value={this.state.address.city}
                                                          onChange={
                                                              e => {
                                                                  this.setState(
                                                                      {
                                                                          address: Object.assign(
                                                                              {},
                                                                              this.state.address,
                                                                              {
                                                                                  city: e.target.value.slice(0, locCityMaxLength)
                                                                              }
                                                                          )
                                                                      }
                                                                  )
                                                              }
                                                          }/>
                                            <Form.Text>{`Characters Remaining: ${locCityMaxLength - this.state.address.city.length}`}</Form.Text>

                                            <Form.Label className={styles.smallBoldMagentaText}
                                                        style={{marginTop: 20}}>State:</Form.Label>
                                            <Form.Control type='state'
                                                          placeholder='Enter state...'
                                                          value={this.state.address.state}
                                                          as='select'
                                                          onChange={
                                                              e => {
                                                                  this.setState(
                                                                      {
                                                                          address: Object.assign(
                                                                              {},
                                                                              this.state.address,
                                                                              {
                                                                                  state: e.target.value
                                                                              }
                                                                          )
                                                                      }
                                                                  )
                                                              }
                                                          }>
                                                {stateAbbreviations.map(state => <option>{state}</option>)}
                                            </Form.Control>
                                            <Form.Label className={styles.smallBoldMagentaText} style={{marginTop: 20}}>
                                                Zip Code:</Form.Label>
                                            <Form.Control type='zip code'
                                                          placeholder='Enter zip code...'
                                                          value={this.state.address.zipCode}
                                                          onChange={
                                                              e => {
                                                                  this.setState(
                                                                      {
                                                                          address: Object.assign(
                                                                              {},
                                                                              this.state.address,
                                                                              {
                                                                                  zipCode: e.target.value.slice(0, 5)
                                                                              }
                                                                          )
                                                                      }
                                                                  )
                                                              }
                                                          }/>


                                            <div className={styles.formButtons}>
                                                <div className={styles.cancel} onClick={this.addressCancel}>
                                                    Cancel
                                                </div>
                                                <div className={this.state.name ? styles.save : styles.disabledSave}
                                                     onClick={this.addressSave}>
                                                    Save
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                    :
                                    <>
                                        {this.state.address ?
                                            <>
                                                <div className={styles.infoContent}>
                                                    {this.state.address.street}
                                                </div>
                                                <div className={styles.infoContent}>
                                                    {`${this.state.address.city}, ${this.state.address.state} ${this.state.address.zipCode}`}
                                                </div>
                                            </> :
                                            <p className={styles.emptyContent}>No address</p>}
                                    </>
                                }
                                <hr/>


                                {/*Website*/}
                                <div className={styles.infoFieldHeader}>
                                    <div className={styles.infoFieldTopLeft}>
                                        <h2 className='mb-4'>Website</h2>
                                    </div>
                                    <div>
                                        {
                                            !this.state.editWebsite &&
                                            <h2 className={styles.editInfoField}
                                                onClick={() => this.setState({editWebsite: true})}>
                                                Edit
                                            </h2>
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