const redux = require("redux")
const  reduxLogger = require("redux-logger")
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

// Action --> what happened in the store
// Action creators
function orderCake() {

    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1) {
    return {
        type : ICECREAM_RESTOCKED,
        payload: qty
    }
}


// const initialState = {
//     numOfCakes: 10,
//     numOfIceCream: 20
//     // anotherProerty: 0
// }

const initialCakeState = {
    numOfCakes: 10
}
const initialIceCreamState = {
    numOfIceCream: 20
}

// (previousState, action) => newState

// Reducer -->  updates the state based on those action

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                // to make ap copy we use spread operator
                ...state, // a copy of state object
                // and what property you have to change you can additionally
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED: {
            return {
                ...state,
                numOfCakes : state.numOfCakes + action.payload
            }
        }
        
            default:
                return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
       
        case ICECREAM_ORDERED:
            return {
                // to make ap copy we use spread operator
                ...state, // a copy of state object
                // and what property you have to change you can additionally
                numOfIceCream: state.numOfIceCream - action.payload 
            }
        case ICECREAM_RESTOCKED: {
            return {
                ...state,
                numOfIceCream : state.numOfIceCream + action.payload
            }
        }
            default:
                return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer 

})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State: ', store.getState())

const unsubscribe = store.subscribe(() => {})

// console.log('Update state: ', store.getState())

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

// not necessary to use bindActionCreators
const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)

actions.orderIceCream(5)
actions.restockIceCream(20)

unsubscribe()
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

