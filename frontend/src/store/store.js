import React from "react";
import {legacy_createStore} from "redux";

const init_State = {
    isAuthenticated : false,
    brands : null,
    events : null,
    eventsCart : [],
    total : 0,
    user : null,
    savedEvents : []
}

const reducer = (state = init_State, action) => {
    switch (action.type) {
        case 'setIsAuthenticated' :
            return {...state, isAuthenticated : action.payload.case}

        case 'logout' :
            return {...state, isAuthenticated :false , user :null, savedEvents :[]}

        case 'setSavedEvents' :
            return {...state, savedEvents : action.payload.data}

        case 'setUser' :
            return {...state, user : action.payload.user}

        case 'setBrands' :
            return {...state, brands : action.payload.brands};

        case 'setEvents' :
            return {...state, events : action.payload.events};

        case 'seteventsCart' :
            return {...state, eventsCart : action.payload.data};

        case 'setTotal' :
            let total = 0;
            state.eventsCart.forEach(event => total += event.total )
            return {...state, total : total};
            
        case 'addEventToCart' :
            const event1 = action.payload.event;
            const exists = state.eventsCart.some((e) => e.id === event1.id);
            if(!exists){
                event1.quantity = 1;
                event1.total = event1.price;
                alert('Event successfully added ✅');
                return {...state, eventsCart : [...state.eventsCart, event1] }
            }else{
                alert('Event already exists !!');
                return state
            }

        case 'deleteEventFromCart' :
            const T = state.eventsCart.filter( e => e.id !== action.payload.id);
            return {...state, eventsCart : T};

        case 'increment' :
            const T2 = state.eventsCart;
            const event2 = action.payload.event;
            T2.forEach( e => {
                if(e.id === event2.id && event2.quantity < 10){
                    e.quantity++;
                    e.total = e.price * e.quantity
                }
            });
            return {...state, eventsCart : [...T2] };
            
        case 'decrement' :
            const T3 = state.eventsCart;
            const event3 = action.payload.event;
            T3.forEach( e => {
                if(e.id === event3.id && event3.quantity > 1){
                    e.quantity--;
                    e.total = e.price * e.quantity
                }
            });
            return {...state, eventsCart : [...T3] };

        default :
            return state;
    }
}

const store = legacy_createStore(reducer);
export default store;