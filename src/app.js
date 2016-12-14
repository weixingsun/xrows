import React, { Component } from 'react'
import {Actions, Scene, Router, ActionConst,} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer';
import View from './v/View'
import Menu from './v/Menu'
import Home from './v/Home'
import Group from './v/Group'
import Edit from './v/Edit'

export default class App extends React.Component {
	constructor(props) {
        super(props);
        this.state={
        }
    }
	componentWillMount() {
	}
	render() {
		let _drawerIcon = <Icon name={"bars"} color={"#2a2929"} size={30}/>
		return (
			<Drawer
				 type="static"
				 content={<Menu closeDrawer={ () => this.drawer.close() } />}
				 openDrawerOffset={0.5}
				 tweenHandler={Drawer.tweenPresets.parallax}
				 tapToClose={true}
				 ref={ (ref) => this.drawer = ref}
			>
				 <Router>
					<Scene key="root">
						<Scene key="home" component={Home} title="Home" initial={true} drawerIcon={_drawerIcon} />
						<Scene key="view" component={View} title="View" />
						<Scene key="edit" component={Edit} title="Edit" />
						<Scene key="group" component={Group} title="Group" />
					</Scene>
				 </Router>
			</Drawer>
		)
	}
}

