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
		height:200,
	},
	second:{
		height:200,
	},
});

export default class FunctionEdit extends React.Component {
	constructor(props) {
        super(props);
        this.state={
			func1:'',
			func2:'',
        }
		this.default_formula = 'select * from ?'
    }
	
	componentWillMount(){
		this.getFormula()
    }
	getFormula(){
		AsyncStorage.getItem("formula1").then((value)=>{
			if(value) this.setState({formula1:value});
			else this.setState({formula1:this.default_formula});
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
				</View>
            </View>
        );
    }
}
