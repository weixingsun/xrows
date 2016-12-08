import React, { Component } from 'react'
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer';
import View from './v/View'
import Menu from './v/Menu'
import Home from './v/Home'
//import Edit from './v/Edit'

//    <Scene key="menu" component={Menu} title="Menu"/>
//    <Scene key="edit" component={Edit} title="Edit"/>
//const navToggle = (<Icon name="rocket" size={30} color="#900" />)
const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} title="Home"/>
	<Scene key="view" component={View} title="View"/>
  </Scene>
);

export default class App extends React.Component {
	//componentDidMount() {
	   //Actions.refresh({key: 'drawer', ref: this.refs.navigation});
	//}
	render() {
		return (
			<Drawer
				 type="static"
				 content={<Menu closeDrawer={ () => this.drawer.close() } />}
				 openDrawerOffset={0.3}
				 tweenHandler={Drawer.tweenPresets.parallax}
				 tapToClose={true}
				 ref={ (ref) => this.drawer = ref}
			>
				 <Router scenes={scenes}/>
			</Drawer>
		)
	}
}

