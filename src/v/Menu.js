import React from 'react';
import {Platform, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
//import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
const DocumentPicker = require('react-native').NativeModules.RNDocumentPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#2a2929",
	//padding:20,
    //borderWidth: 2,
    //borderColor: 'gray',
  },
  menu_title: {
    justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#2a2929",
	//padding:20,
	...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 54,
      },
    }),
  },
  menu0: {
    justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#4a4949",
	height:48,
	paddingLeft:6,
  },
  menu1: {
    justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#3a3939",
	height:48,
	paddingLeft:6,
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
			Actions.refresh({
				key:'home',
				file:result.path,
			});
		}else if(result.err) alert('err='+result.err)
	});
}
const Menu = (props, context) => {
    const drawer = context.drawer;
	//<MaterialIcon name="home" size={30} color={Colors.red} style={styles.icon}/>
    return (
        <View style={styles.container}>
			<View style={styles.menu_title}>
				<Text style={styles.menu_name}>Menu</Text>
			</View>
			<TouchableOpacity
				style={styles.menu0}
				//underlayColor={Colors.charcoal}
				onPress={() => { drawer.close(); showFilePicker() } }>
				<Text style={styles.menu_name}>Open a CSV file</Text>
			</TouchableOpacity>
			<View style={styles.menu1}>
				<Text style={styles.menu_name}>Expert Mode</Text>
			</View>
			<View style={styles.menu0}>
				<Text style={styles.menu_name}>Common Mode</Text>
			</View>
			<View style={styles.menu1}>
				<Text style={styles.menu_name}>About</Text>
			</View>
			<View style={styles.menu0}>
				<Text style={styles.menu_name}>Contact Me</Text>
			</View>
        </View>
    )
}
Menu.contextTypes = contextTypes;
export default Menu;