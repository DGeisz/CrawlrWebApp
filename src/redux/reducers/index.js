import {SIGNOUT} from "../constants";

const initialState = {
    user: "Danny Boi",
    userID: "sdsflkasdfj",
    promotions: {
        aasdfhjasdhfaksjdfh: [
            {
                activated: true,
                title: 'My first promo',
                description: 'Everyone who comes gets a free dino',
                dates: 'Wed.Thu:Wed Jun 03 2020;Mon Jun 01 2020'
            },
            {
                activated: true,
                title: 'My first promo',
                description: 'Everyone who comes gets a free walrus',
                dates: 'Thu.Fri:Wed Jun 21 2020'
            },
            {
                activated: false,
                title: 'My first promo',
                description: 'Everyone who comes gets a free triceratops',
                dates: ':Fri Jun 12 2020'
            }
        ]
    },
    locations: [
        {
            name: "Danny's First location",
            // name: '<script>console.log("Gottem")</script>',
            _id: "aasdfhjasdhfaksjdfh",
            type: "Bar",
            additionalInfo: {
                description: "A super fun bar filled with fun-loving folks",
                phone: "234-123-3212",
                website: "www.firstloc.com",
                address: {
                    street: '605 High Valley Court',
                    city: 'Colorado Springs',
                    state: 'CO',
                    zipCode: 80906
                },
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
                description: "We are having a real life vampire",
                expires: '2020-06-17T15:20'
            },
            promotion: {
                description: "Werewolves get free drinks all night",
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
                address: {
                    street: '605 High Valley Court',
                    city: 'Colorado Springs',
                    state: 'CO',
                    zipCode: 80906
                },
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
                description: "We are having a real life vampire",
                expires:  '2020-06-17T15:20'
            },
            promotion: {
                description: "Werewolves get free drinks all night",
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
                address: {
                    street: '605 High Valley Court',
                    city: 'Colorado Springs',
                    state: 'CO',
                    zipCode: 80906
                },
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
                description: "We are having a real life vampire",
                expires:  '2020-06-17T15:20'
            },
            promotion: {
                description: "Werewolves get free drinks all night",
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
                address: {
                    street: '605 High Valley Court',
                    city: 'Colorado Springs',
                    state: 'CO',
                    zipCode: 80906
                },
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
                description: "We are having a real life vampire",
                expires: '2020-06-17T15:20'
            },
            promotion: {
                description: "Werewolves get free drinks all night",
                expires: 123908174234
            }
        },
    ]

};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case SIGNOUT:
            return Object.assign({}, state, {user: null, userID: null});
        default:
            return state;
    }
};

export default rootReducer;