import {SIGNOUT} from "../constants";

const initialState = {
    user: "Danny Boi",
    userID: "sdsflkasdfj",
    locations: [
        {
            name: "Danny's First location",
            _id: "aasdfhjasdhfaksjdfh",
            type: "Bar",
            additionalInfo: {
                description: "A super fun bar filled with fun-loving folks",
                phone: "234-123-3212",
                website: "www.firstloc.com",
                address: "234 LaClede Way, Norman, OK, 20303",
                hours: [
                    {
                        days: ['Mon', 'Tue', 'Wed'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    },
                    {
                        days: ['Thu', 'Fri', 'Sat'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    }
                ]

            },
            emojiCount: {
                live: [0, 0, 0, 0, 0],
                day: [0, 0, 0, 0, 0],
                week: [0, 0, 0, 0, 0],
                allTime: [245, 1203, 450, 128, 200]
            },
            event: {
                content: "We are having a real life vampire",
                expires: 29834239847
            },
            promotion: {
                content: "Werewolves get free drinks all night",
                expires: 123908174234
            }
        },
        {
            name: "Danny's Second location",
            _id: "sadfasdjfj",
            type: "Club",
            additionalInfo: {
                description: "A super fun bar filled with fun-loving folks",
                phone: "234-123-3212",
                website: "www.firstloc.com",
                address: "234 LaClede Way, Norman, OK, 20303",
                hours: [
                    {
                        days: ['Mon', 'Tue', 'Wed'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    },
                    {
                        days: ['Thu', 'Fri', 'Sat'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    }
                ]
            },
            emojiCount: {
                live: [0, 0, 0, 0, 0],
                day: [0, 0, 0, 0, 0],
                week: [45, 344, 33, 4, 2],
                allTime: [245, 1203, 450, 128, 200]
            },
            event: {
                content: "We are having a real life vampire",
                expires: 29834239847
            },
            promotion: {
                content: "Werewolves get free drinks all night",
                expires: 123908174234
            }
        },
        {
            name: "Danny's Third location",
            _id: "sdfgsdfgsdfgdfgsd",
            type: "Food",
            additionalInfo: {
                description: "A super fun bar filled with fun-loving folks",
                phone: "234-123-3212",
                website: "www.firstloc.com",
                address: "234 LaClede Way, Norman, OK, 20303",
                hours: [
                    {
                        days: ['Mon', 'Tue', 'Wed'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    },
                    {
                        days: ['Thu', 'Fri', 'Sat'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    }
                ]
            },
            emojiCount: {
                live: [0, 0, 0, 0, 0],
                day: [22, 12, 3, 5, 2],
                week: [45, 344, 33, 4, 2],
                allTime: [245, 1203, 450, 128, 200]
            },
            event: {
                content: "We are having a real life vampire",
                expires: 29834239847
            },
            promotion: {
                content: "Werewolves get free drinks all night",
                expires: 123908174234
            }
        },
        {
            name: "Danny's Goober location",
            _id: "aasdfdfaksjdfh",
            type: "Bar",
            additionalInfo: {
                description: "A super fun bar filled with fun-loving folks",
                phone: "234-123-3212",
                website: "www.firstloc.com",
                address: "234 LaClede Way, Norman, OK, 20303",
                hours: [
                    {
                        days: ['Mon', 'Tue', 'Wed'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    },
                    {
                        days: ['Thu', 'Fri', 'Sat'],
                        hours: ['07:30;14:00', '16:00;22:30']
                    }
                ]
            },
            emojiCount: {
                live: [2, 4, 6, 0, 1],
                day: [22, 12, 3, 5, 2],
                week: [45, 344, 33, 4, 2],
                allTime: [245, 1203, 450, 128, 200]
            },
            event: {
                content: "We are having a real life vampire",
                expires: 29834239847
            },
            promotion: {
                content: "Werewolves get free drinks all night",
                expires: 123908174234
            }
        },
    ]

};


const rootReducer = (state = initialState, action) => {
    console.log("Now we're here")
    switch (action.type) {

        case SIGNOUT:
            console.log("Signing out");
            return Object.assign({}, state, {user: null, userID: null});
        default:
            return state;
    }
};

export default rootReducer;