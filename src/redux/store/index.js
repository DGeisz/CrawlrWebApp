import {createStore} from "redux";
import rootReducer from "../reducers";
import {persistStore} from "redux-persist";

// const makeStore = () => {
//     let store;
//
//     const isClient = typeof window !== 'undefined';
//
//     if (isClient) {
//         const {persistReducer} = require('redux-persist');
//         const storage = require('redux-persist/lib/storage').default;
//
//         const persistConfig = {
//             key: 'root',
//             storage
//         };
//
//         store = createStore(
//             persistReducer(persistConfig, rootReducer)
//         );
//
//         store.__PERSISTOR = persistStore(store);
//     } else {
//         store = createStore(rootReducer);
//     }
//     return store;
// };

const makeStore = () => createStore(rootReducer);


export default makeStore;

//
// const store  = createStore(rootReducer);
//
// export default store;





