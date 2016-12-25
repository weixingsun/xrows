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
import FormModal from './v/FormModal'
import Langs from './lang/all';
import I18n from 'react-native-i18n';
import { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const drIcon=<Icon name={"bars"} color={"#2a2929"} size={30}/>
const scenes = Actions.create(
    <Scene key="root">
        <Scene key="drawer" component={Drawer} open={false} type={"reset"} >
          <Scene key="inner">
            <Scene key="home" component={Home} title={I18n.t('home')} initial={true} drawerIcon={drIcon}/>
            <Scene key="edit" component={Edit} title={I18n.t('editor')} />
            <Scene key="book" component={Book} title={I18n.t("manual")} />
            <Scene key="formModal" component={FormModal} title={I18n.t("form")} />
            <Scene key="about" component={About} title={I18n.t('about')} />
            <Scene key="result" component={Result} title={I18n.t('result')} />
          </Scene>
        </Scene>
    </Scene>
);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentWillMount() {}
    render() {
        return (
	<MenuContext style={{ flex: 1, flexDirection: 'row',}} ref={"menu"}>
            <Router scenes={scenes} />
	</MenuContext>
        )
    }
}
