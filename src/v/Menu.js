import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
//import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
const DocumentPicker = require('react-native').NativeModules.RNDocumentPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#8a8989",
	padding:20,
    //borderWidth: 2,
    //borderColor: 'gray',
  },
  menu: {
    //justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#8a8989",
	//padding:20,
	height:40,
  },
  menu_name: {
    marginLeft:10,
    fontSize:20,
    color:'white',
  },
});
const contextTypes = {
    drawer: React.PropTypes.object,
};
const showFilePicker = ()=>{
	DocumentPicker.show({
		//filetype: ['public.data'],
	},(result) => { 
		//{type:'text/comma-separated-values',fileName:'test.csv',fileSize:2499,uri:'content://...'}
		console.log('Menu page get file:'+JSON.stringify(result))
		if(result.type && result.type==='text/comma-separated-values'){
			Actions.view({file:result.path })
		}else if(result.err) alert('err='+result.err)
	});
}
const Menu = (props, context) => {
    const drawer = context.drawer;
	//<MaterialIcon name="home" size={30} color={Colors.red} style={styles.icon}/>
    return (
        <View style={styles.container}>
			<View style={styles.menu}>
				<Text style={styles.menu_name}>Menu</Text>
			</View>
			<TouchableOpacity
				style={styles.menu}
				//underlayColor={Colors.charcoal}
				onPress={() => { drawer.close(); showFilePicker() } }>
				<Text style={styles.menu_name}>Open a CSV file</Text>
			</TouchableOpacity>
        </View>
    )
}
Menu.contextTypes = contextTypes;
export default Menu;