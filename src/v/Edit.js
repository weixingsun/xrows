import React from 'react';
import {AsyncStorage, Platform, View, Text, TextInput, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
//import SQLite from 'react-native-sqlite-storage'
//import alasql from 'alasql'
import alasql from '../sql/alasql.fs';
import AxInput from './AxInput';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
	content:{
        flex: 1,
		marginTop:Platform.select({
			ios: 64,
			android: 54,
		})
	},
	first:{
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
		//borderWidth: 1,
		//backgroundColor: '#fff',
		//borderColor: 'rgba(0,0,0,0.1)',
		//marginTop: 5,
		//shadowColor: '#ccc',
		//shadowOffset: { width: 2, height: 2, },
		//shadowOpacity: 0.5,
		//shadowRadius: 3,
		//flexDirection:'row',
		//padding: 15,
		//paddingTop:5,
		//paddingBottom:5,
	},
	second:{
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
		//borderWidth: 1,
		//backgroundColor: '#fff',
		//borderColor: 'rgba(0,0,0,0.1)',
		//marginTop: 5,
		//shadowColor: '#ccc',
		//shadowOffset: { width: 2, height: 2, },
		//shadowOpacity: 0.5,
		//shadowRadius: 3,
		//flexDirection:'row',
		//padding: 15,
		//paddingTop:5,
		//paddingBottom:5,
	},
	third:{
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
		//borderWidth: 1,
		//backgroundColor: '#fff',
		//borderColor: 'rgba(0,0,0,0.1)',
		//marginTop: 5,
		//shadowColor: '#ccc',
		//shadowOffset: { width: 2, height: 2, },
		//shadowOpacity: 0.5,
		//shadowRadius: 3,
		//flexDirection:'row',
		//padding: 15,
		//paddingTop:5,
		//paddingBottom:5,
	},
});

export default class FunctionEdit extends React.Component {
	constructor(props) {
        super(props);
        this.state={
			func1:'',
			func2:'',
			func3:'',
        }
		this.default_func1 = 'SELECT * into csv("{DIR}/function1.csv") from {SRC} '
		this.default_func2 = 'SELECT * into csv("{DIR}/function2.csv") from {SRC} '
		this.default_func3 = 'SELECT * into csv("{DIR}/function2.csv") from {SRC} '
    }
	
	componentWillMount(){
		this.getFormula()
    }
	getFormula(){
		AsyncStorage.getItem("func1").then((value)=>{
			if(value) this.setState({func1:value});
			else this.setState({func1:this.default_func1});
		});
		AsyncStorage.getItem("func2").then((value)=>{
			if(value) this.setState({func2:value});
			else this.setState({func2:this.default_func2});
		});
		AsyncStorage.getItem("func3").then((value)=>{
			if(value) this.setState({func3:value});
			else this.setState({func3:this.default_func3});
		});
	}
    render(){
        return (
            <View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.first}>
						<Text style={{fontWeight:'bold'}}>Function 1:</Text>
						<AxInput
							ref={textInput => (this.func1_input = textInput)}
							placeholder=""
							enablesReturnKeyAutomatically={true}
							returnKeyType="done"
							value={this.state.func1}
							onChange={(event) => {
								let txt = event.nativeEvent.text
								this.setState({ func1:txt })
							}}
						/>
					</View>
					<View style={styles.second}>
						<Text style={{fontWeight:'bold'}}>Function 2:</Text>
						<AxInput
							ref={textInput => (this.func2_input = textInput)}
							placeholder=""
							enablesReturnKeyAutomatically={true}
							returnKeyType="done"
							value={this.state.func2}
							onChange={(event) => {
								let txt = event.nativeEvent.text
								this.setState({ func2:txt })
							}}
						/>
					</View>
					<View style={styles.third}>
						<Text style={{fontWeight:'bold'}}>Function 3:</Text>
						<AxInput
							ref={textInput => (this.func3_input = textInput)}
							placeholder=""
							enablesReturnKeyAutomatically={true}
							returnKeyType="done"
							value={this.state.func3}
							onChange={(event) => {
								let txt = event.nativeEvent.text
								this.setState({ func3:txt })
							}}
						/>
					</View>
				</View>
            </View>
        );
    }
}
