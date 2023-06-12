const redux = require("redux")
const produce = require("immer").produce
const initialState = {
    name: "Raj",
    address: {
        street: "114 Main St Road",
        city: "Newyork",
        state: "Ny",
    },
}

const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return{
        type: STREET_UPDATED,
        payload: street
    }
}

const updateStreetReducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     }
        
            // }

            // immer  -->  under the hood do the above return statement only
            // immer --> simplifies handling immutable data structure and works very well with redux
            return produce(state, (draft) => {
                    draft.address.street = action.payload
            })

        default:{
            return state
        }            
    }
}

const store = redux.createStore(updateStreetReducer)
console.log("Initial State: ", store.getState())

const unsubscribe = store.subscribe(() => {
    console.log("Updated State: ", store.getState())
})
store.dispatch(updateStreet('120 Main St Road'))

unsubscribe()