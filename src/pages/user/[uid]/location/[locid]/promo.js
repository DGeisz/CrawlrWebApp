import React from 'react';
import NavBar from "../../../../../components/NavBar";
import LocationNavigation from "../../../../../components/LocationNavigation";
import styles from "../../../../../styles/locations.module.css";
import {connect} from 'react-redux';
import {withRouter} from "next/router";
import Icon from "@mdi/react";
import {mdiCircle, mdiMinus, mdiPlus, mdiSquare, mdiTriangle} from "@mdi/js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
    isTodayInDates,
    promoDatesToReadable,
    promoDaysToReadable
} from "../../../../../utils/miscFunctions";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {days} from "../../../../../app-constants/times";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {error} from "next/dist/build/output/log";

const titleMaxLength = 20;
const descriptionMaxLength = 140;
const maxDateNumber = 10;

const mapStateToProps = state => {
    return {
        locations: state.locations,
        promotions: state.promotions
    }
};

/*
* Green - #28a745
* Blue - #007bff
* Red - #dc3545
*/

/**
 * Helper function for me to determine if
 * a promo includes a particular day*/
function promoIncludesDay(promo, day) {
    return promo.dates.split(':')[0].split('.').includes(day);
}

/**
 * Helper function for me to determine if
 * a day has been taken by any promo*/
function dayTaken(promos, day) {
    for (let i = 0; i < promos.length; i++){
        if (promos[i].dates.split(':')[0].split('.').includes(day)) {
            return true;
        }
    }
    return false;
}

/**
 * Extracts the dates from a promo.dates
 * object*/
function promoDates(promo) {
    return promo.dates.split(':')[1].split(';');
}

/**
 * Sorts a string of dates and removes
 * duplicates
 */
function sortDates(dates) {
    let sorted = dates.split(';')
        .filter(i => i)
        .sort();
    let noDups = [];
    sorted.forEach(date => {
        if (!noDups.includes(date)) {
            noDups.push(date);
        }
    });
    return noDups.join(';');
}

/**
 * Takes in a promo and determines if the 'remove date'
 * button should show*/
function showRemoveDate(promo) {
    let dates = promo.dates.split(':')[1].split(';');
    return dates[0] || dates.length !== 1;
}

class CrawlrPromotions extends React.Component {



    constructor(props) {
        super(props);
        this.locid = this.props.router.query.locid;
        this.loc = this.props.locations.find(loc => loc._id === this.locid);
        this.promos = this.props.promotions[Object.keys(this.props.promotions)[0]];

        this.state = {
            promos: this.promos.slice(),
            editPromos: this.promos.map(() => false),
            promoErrors: this.promos.map(() => false),
            showLabels: true,
            showDeleteModal: false,
            showDeactivationModal: false,
            deleteIndex: 0,
            deactivationIndex: 0,
        }
    }

    deletePromo = () => {
        this.promos.splice(this.state.deleteIndex, 1);
        let promosCopy = this.state.promos.slice();
        promosCopy.splice(this.state.deleteIndex, 1);
        let editPromosCopy = this.state.editPromos.slice();
        editPromosCopy.splice(this.state.deleteIndex, 1);
        let errorCopy = this.state.promoErrors.slice();
        errorCopy.splice(this.state.deleteIndex, 1);
        this.setState({
            showDeleteModal: false,
            promos: promosCopy,
            promoErrors: errorCopy,
            editPromos: editPromosCopy
        });
    };

    primePromoDeletion = index => {
        this.setState({showDeleteModal: true, deleteIndex: index});
    };

    deactivatePromo = () => {
        this.promos[this.state.deactivationIndex].activated = false;
        let promosCopy = this.state.promos.slice();
        promosCopy[this.state.deactivationIndex].activated = false;
        this.setState({
            showDeactivationModal: false,
            promos: promosCopy
        });
    };

    primePromoDeactivation = index => {
        this.setState({showDeactivationModal: true, deactivationIndex: index});
    };

    closeDeactivationModal = () => {
        this.setState({showDeactivationModal: false});
    };

    closeModal = () => {
        this.setState({showDeleteModal: false});
    };

    editPromo = (index) => {
        let editPromosCopy = this.state.editPromos.slice();
        editPromosCopy[index] = true;
        this.setState({editPromos: editPromosCopy});
    };

    cancelPromo = (index) => {
        let editPromosCopy = this.state.editPromos.slice();
        let promosCopy = this.state.promos.slice();
        if (index < this.promos.length) {
            promosCopy[index] = this.promos[index];
            editPromosCopy[index] = false;
            this.setState({promos: promosCopy, editPromos: editPromosCopy});
        } else {
            promosCopy.splice(index, 1);
            editPromosCopy.pop();
            this.setState({promos: promosCopy, editPromos: editPromosCopy});
        }
    };

    savePromo = (index) => {
        let promo = this.state.promos[index];
        if (!promo.description || !promo.dates
            || promo.dates === ':' || !promo.title) {
            let errorCopy = this.state.promoErrors.slice();
            errorCopy[index] = true;
            return this.setState({promoErrors: errorCopy});
        }
        let promosCopy = this.state.promos.slice();
        let split = promosCopy[index].dates.split(':');
        promosCopy[index].dates = [split[0], sortDates(split[1])]
            .join(':');
        if (index < this.promos.length) {
            this.promos[index] = promosCopy[index];
        } else {
            this.promos.push(promosCopy[index]);
        }
        let errorCopy = this.state.promoErrors.slice();
        errorCopy[index] = false;
        let editPromosCopy = this.state.editPromos.slice();
        editPromosCopy[index] = false;
        this.setState({editPromos: editPromosCopy, promoErrors: errorCopy, promos: promosCopy});
    };

    editPromoTitle = (text, index) => {
        let promosCopy = this.state.promos.slice();
        promosCopy[index].title = text;
        this.setState({promos: promosCopy});
    };

    editPromoDescription = (text, index) => {
        let promosCopy = this.state.promos.slice();
        promosCopy[index].description = text;
        this.setState({promos: promosCopy});
    };

    handleScanCheck = (index, value) => {
        let promosCopy = this.state.promos.slice();
        promosCopy[index].scanEnabled = value;
        this.setState({promos: promosCopy});
    };


    removeDay = (index, day) => {
        let promosCopy = this.promos.slice();
        let split = promosCopy[index].dates.split(':');
        let promoDays = split[0].split('.');
        const indexOf = promoDays.indexOf(day);
        if (indexOf > -1) {
            promoDays.splice(indexOf, 1);
        }
        promosCopy[index].dates = [promoDays.join('.'), split[1]].join(':');
        this.setState({promos: promosCopy});
    };

    takeDay = (index, day) => {
        let promosCopy = this.promos.slice();
        let split = promosCopy[index].dates.split(':');
        let promoDays = split[0].split('.');
        if (!promoDays[0]) {
            promoDays = [day];
        } else {
            promoDays.push(day);
        }
        promosCopy[index].dates = [promoDays.join('.'), split[1]].join(':');
        this.setState({promos: promosCopy});
    };

    addNewDate = (index) => {
        let promosCopy = this.promos.slice();
        promosCopy[index].dates += ';';
        this.setState({promos: promosCopy});
    };

    removeDate = (index) => {
        let promosCopy = this.promos.slice();
        let split = promosCopy[index].dates.split(':');
        let newDates = split[1].split(';');
        newDates.pop();
        promosCopy[index].dates = [split[0], newDates.join(';')].join(':');
        this.setState({promos: promosCopy});
    };

    setDate = (date, promoIndex, dateIndex) => {
        let promosCopy = this.promos.slice();
        let split = promosCopy[promoIndex].dates.split(':');
        let dates = split[1].split(';');
        dates[dateIndex] = date;
        promosCopy[promoIndex].dates = [split[0], dates.join(';')].join(':');
        this.setState({promos: promosCopy});
    };


    render() {
        return (
            <>
                <NavBar/>
                <LocationNavigation uid={this.props.router.query.uid} locid={this.props.router.query.locid}>
                    <h1 className={`${styles.locationTitle} mb-4`}>
                        {this.loc.name + ' · Promotions'}
                    </h1>
                    {this.state.showLabels ?
                        <div className='rounded bg-light shadow-sm p-4'>
                            <h2 className={styles.promoTitle} style={{marginBottom: 20}}>Promotion labels</h2>
                            <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                <Icon path={mdiCircle} size={1} color={'#28a745'}/>
                                <div className={styles.promoActiveToday}>
                                    Active Today!
                                </div>
                                <div className={styles.promoLegendDescription}>
                                    {' - This promotion is activated and currently live on Crawlr!'}
                                </div>
                            </div>
                            <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                <Icon path={mdiTriangle} size={1} color={'#007bff'}/>
                                <div className={styles.promoActivated}>
                                    Activated
                                </div>
                                <div className={styles.promoLegendDescription}>
                                    {' - This promotion is activated and will go live on Crawlr on its scheduled dates.'}
                                </div>
                            </div>
                            <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                <Icon path={mdiSquare} size={1} color={'#dc3545'}/>
                                <div className={styles.promoNotActivated}>
                                    Not Activated
                                </div>
                                <div className={styles.promoLegendDescription}>
                                    {" - This promotion won't go live until it's activated."}
                                </div>
                            </div>
                            <div className={styles.labelToggle}
                                 onClick={() => this.setState({showLabels: false})}>
                                Hide Promotion Labels
                            </div>
                        </div> :
                        <div className={styles.labelToggle}
                             onClick={() => this.setState({showLabels: true})}>
                            Show Promotion Labels
                        </div>}
                    <hr className='mr-2'/>
                    <Row xs={1} sm={1} md={2}>
                        {this.state.promos.map((promo, index) => {
                            return (
                                <Col className='mt-4 mb-4'>
                                    {promo.activated ?
                                        isTodayInDates(promo.dates) ?
                                            <div
                                                className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                                <Icon path={mdiCircle} size={1} color={'#28a745'}/>
                                                <div className={styles.promoActiveToday}>
                                                    Active Today!
                                                </div>
                                            </div> :
                                            <div
                                                className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                                <Icon path={mdiTriangle} size={1} color={'#007bff'}/>
                                                <div className={styles.promoActivated}>
                                                    Activated
                                                </div>
                                            </div> :
                                        <div className={[styles.promoLegendContainer, styles.flexRowWrap].join(' ')}>
                                            <Icon path={mdiSquare} size={1} color={'#dc3545'}/>
                                            <div className={styles.promoNotActivated}>
                                                Not Activated
                                            </div>
                                        </div>
                                    }
                                    {this.state.editPromos[index] ?
                                        <Container className='rounded shadow-sm bg-white p-3 h-100'>
                                            {this.state.promoErrors[index] &&
                                            <p className='text-danger'>Please enter all fields</p>}
                                            <Form onSubmit={e => e.preventDefault()}>
                                                <Form.Group controlId='editEventTitle'>
                                                    <h3 className={styles.promoHeader}>Promotion Title</h3>
                                                    <Form.Control type='title'
                                                                  placeholder='Enter promotion title...'
                                                                  value={this.state.promos[index].title}
                                                                  onChange={
                                                                      e => this.editPromoTitle(
                                                                          e.target.value.slice(0, titleMaxLength),
                                                                          index
                                                                      )
                                                                  }
                                                    />
                                                    <Form.Text className='text-dark'>
                                                        {`Characters Remaining:
                                                         ${titleMaxLength - this.state.promos[index].title.length}`}
                                                    </Form.Text>
                                                    <p style={{fontSize: 16, marginTop: 10, marginBottom: 30}}>
                                                        Note: The promotion title is only viewable by you
                                                    </p>
                                                </Form.Group>
                                                <Form.Group controlId='editEventDescription'>
                                                    <h3 className={styles.promoHeader}>Promotion Description</h3>
                                                    <Form.Control type='description'
                                                                  as='textarea'
                                                                  placeholder='Enter promotion description...'
                                                                  value={this.state.promos[index].description}
                                                                  onChange={
                                                                      e => this.editPromoDescription(
                                                                          e.target.value.slice(0, descriptionMaxLength),
                                                                          index
                                                                      )
                                                                  }/>
                                                    <Form.Text>{`Characters Remaining: 
                                                                  ${descriptionMaxLength
                                                    - this.state.promos[index].description.length}`}
                                                    </Form.Text>
                                                </Form.Group>
                                                <Form.Group controlId='formBasicCheckbox'>
                                                    <Form.Check type='checkbox'
                                                                label='Scannable Promotion'
                                                                checked={promo.scanEnabled}
                                                                onChange={e => this.handleScanCheck(index, e.target.checked)}
                                                                style={{
                                                                    color: '#04b364',
                                                                    fontWeight: 600
                                                                }}/>
                                                </Form.Group>
                                                <h3 className={styles.promoHeader} style={{marginTop: 30}}>
                                                    Dates
                                                </h3>
                                                {promoDates(promo).map((date, dateIndex) => {
                                                    return (
                                                        <React.Fragment key={'promo' + index + 'date' + dateIndex}>
                                                            <Form.Group controlId={'date' + dateIndex}>
                                                                <Form.Control type='date'
                                                                              value={date}
                                                                              onChange={e =>
                                                                                  this.setDate(e.target.value,
                                                                                      index,
                                                                                      dateIndex)}/>
                                                            </Form.Group>
                                                        </React.Fragment>
                                                    );
                                                })}
                                                {showRemoveDate(promo) &&
                                                <div className={styles.deletePromoDates}
                                                     onClick={() => this.removeDate(index)}>
                                                    <Icon path={mdiMinus} color={'#dc3545'} size={1}/>
                                                    Remove Date
                                                </div>
                                                }
                                                {promo.dates.split(':')[1].split(';').length < maxDateNumber &&
                                                <div className={styles.addPromoDates}
                                                     onClick={() => this.addNewDate(index)}>
                                                    <Icon path={mdiPlus} color={'green'} size={1}/>
                                                    Add Date
                                                </div>
                                                }
                                                <h3 className={styles.promoHeader} style={{marginTop: 30}}>
                                                    Repeat Every:
                                                </h3>
                                                <div className={styles.flexRowWrap} style={{marginTop: 10}}>
                                                    {days.map(day => {
                                                        if (promoIncludesDay(promo, day)) { //Day active
                                                            return (
                                                                <div className={styles.activeDayPromoButton}
                                                                     onClick={() => this.removeDay(index, day)}>
                                                                    {day}
                                                                </div>
                                                            );
                                                        } else if (dayTaken(this.state.promos, day)) { //Day is taken
                                                            return (
                                                                <div className={styles.takenDayButton}>
                                                                    {day}
                                                                </div>
                                                            );
                                                        } else { //day is vacant
                                                            return (
                                                                <div className={styles.vacantDayButton}
                                                                     onClick={() => this.takeDay(index, day)}>
                                                                    {day}
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            </Form>
                                            <div className={styles.formButtons} style={{marginTop: 40}}>
                                                <div className={styles.delete}
                                                     onClick={() => this.primePromoDeletion(index)}>
                                                    Delete
                                                </div>
                                                <div className={styles.cancel}
                                                     onClick={() => this.cancelPromo(index)}>
                                                    Cancel
                                                </div>
                                                <div className={styles.save}
                                                     onClick={() => this.savePromo(index)}>
                                                    Save
                                                </div>
                                                <div className={styles.activatePromo}>
                                                    Activate
                                                </div>
                                            </div>
                                        </Container>
                                        : <Container className='rounded shadow-sm bg-white p-3 h-100'>
                                            <h2 className={styles.promoTitle + ' mb-4'}>
                                                {promo.title}
                                            </h2>
                                            <h3 className={styles.promoHeader}>
                                                Description
                                            </h3>
                                            <p className={styles.promoContent}>
                                                {promo.description}
                                            </p>
                                            <hr/>
                                            <h3 className={styles.promoHeader}>
                                                Scannable Promotion
                                            </h3>
                                            <p className={styles.promoContent}>
                                                {promo.scanEnabled ? 'Yes' : 'No'}
                                            </p>
                                            <hr/>
                                            <h3 className={styles.promoHeader}>
                                                Dates
                                            </h3>
                                            {
                                                promo.dates.split(':')[1] &&
                                                <p className={styles.promoContent}>
                                                    {promoDatesToReadable(promo.dates.split(':')[1])}
                                                </p>
                                            }
                                            {
                                                promo.dates.split(':')[0] &&
                                                <p className={styles.promoContent}>
                                                    {promoDaysToReadable(promo.dates.split(':')[0])}
                                                </p>
                                            }
                                            <div
                                                className='d-flex flex-md-row justify-content-center align-items-center mt-4'>
                                                {promo.activated ?
                                                    <>
                                                        <p className={styles.cancelPromo}
                                                           onClick={() => this.primePromoDeactivation(index)}>
                                                            Deactivate Promotion
                                                        </p>
                                                    </> :
                                                    <>
                                                        <p className={styles.promoInfo}
                                                           onClick={() => this.editPromo(index)}>
                                                            Edit Promotion
                                                        </p>
                                                        <p className={styles.activatePromo}>
                                                            Activate Promotion
                                                        </p>
                                                    </>
                                                }
                                            </div>

                                        </Container>
                                    }
                                </Col>
                            );
                        })}
                    </Row>
                </LocationNavigation>
                <Modal show={this.state.showDeleteModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this promotion?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Once you delete a promotion, you won't be able to recover it</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.deletePromo}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showDeactivationModal} onHide={this.closeDeactivationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to deactivate this promotion?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Once you deactivate a promotion, the promotion won't go live until it is reactivated</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeDeactivationModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.deactivatePromo}>
                            Deactivate
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default connect(mapStateToProps)(withRouter(CrawlrPromotions));