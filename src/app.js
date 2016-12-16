import React, { Component } from 'react'
import {Actions, Scene, Router, ActionConst,} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from './v/Drawer';
import Book from './v/Book'
import Menu from './v/Menu'
import Home from './v/Home'
import Edit from './v/Edit'
import About  from './v/About'
import Result from './v/Result'
import Langs from './lang/all';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentWillMount() {}
    render() {
        let drIcon=<Icon name={"bars"} color={"#2a2929"} size={30}/>
        return (
            <Router>
                <Scene key="drawer" component={Drawer} open={true} type={"reset"} >
                <Scene key="root">
                    <Scene key="home" component={Home} title="Home" initial={true} drawerIcon={drIcon}/>
                    <Scene key="edit" component={Edit} title="Edit" />
                    <Scene key="book" component={Book} title="User Manual" />
                    <Scene key="about" component={About} title="About Xrows" />
                    <Scene key="result" component={Result} title="Result"/>
                </Scene>
                </Scene>
            </Router>
        )
    }
}
