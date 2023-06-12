const redux = require("redux")
const thunkMiddleware = require("redux-thunk").default
const axios = require("axios")
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const initialtate = {
    loading: false,
    users: [],
    error: "",
}


const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure= (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialtate, action) => {

    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                error: ""
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload

            }
    }

}

// async Actions in Redux
// By using redux thunk middleware we can return the function in fetchUsers function instead of an action
// function can perform side effects such as asynchronous task
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users1").then(response => {
            // response.data is the users
            const users = response.data.map((user) => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            // error.message is the error message
            dispatch(fetchUsersFailure(error.message))

        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchUsers())