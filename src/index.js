import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import MainContent from './component/MainContent'
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'


const initialState = {
    assetList: [],
    departments: [],
    employees: [],
    assetTypes: [],
    locations: [],
};
const store = createStore(reducer, initialState);


ReactDOM.render(
    <Router>
        <Provider store={store}>
            <MainContent></MainContent>
        </Provider>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
