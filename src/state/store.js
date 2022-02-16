//reducer uses the actions and returns new state accissible from store
//thunk is a middleware that allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
export const store= createStore(reducers,{},applyMiddleware(thunk))