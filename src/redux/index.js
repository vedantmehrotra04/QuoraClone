import {createStore, compose, combineReducers} from "redux";

const initialstate ={
    user : null,
    
};


const userReducer =(state=initialstate, action) => {
    switch(action.type){
        case "login" :
            let obj = action.payload;

            return Object.assign({}, state, {
                user : obj
      
            } );

         case "logout" : 
               return Object.assign({},state,{
                   user: null
               })   

         default :
         return state;   

    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(userReducer,initialstate,composeEnhancers());