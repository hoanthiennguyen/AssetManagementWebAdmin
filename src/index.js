import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import AssetList from './component/AssetList';
import Reports from './component/Reports';
import AssetTypes from './component/AssetTypes';
import Departments from './component/Departments';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

const initialState = {
    assetList: [],
    departmentList: [],
    employeeList: []
};
const store = createStore(reducer, initialState);


ReactDOM.render(
    <Router>
        <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span><Link to="/">Reports</Link></span>
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <Icon type="mail" />
                        <span>Asset Management</span>
                    </span>
                }
            >
                <Menu.Item key="5"><Link to="/assets">Add/Remove Asset</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/asset-types"></Link>Asset Types</Menu.Item>
            </SubMenu>
            <Menu.Item key="3">
                <Icon type="inbox" />
                <span><Link to="/departments">Departments</Link></span>
            </Menu.Item>
        </Menu>
        <Provider store={store}>
            <div className="main-contain">
                <Route key="reports" exact path="/" component={Reports} />
                <Route key="assets" path="/assets" component={AssetList} />
                <Route key="assetType" path="/asset-types" component={AssetTypes} />
                <Route key="departments" path="/departments" component={Departments} />
            </div>
        </Provider>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
