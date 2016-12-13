import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});

export default class Home extends React.Component {
	constructor(props) {
        super(props);
        this.state={ 
            content:'',
        }
		this.file=null
    }
	componentWillMount() {
		//this.addRunIcon()
	}
	componentWillReceiveProps(nextProps) {
		//nextProps={onNavigate,navigationState,name,sceneKey,parent,type,title,initial,drawerIcon,component,index,file,from}
		//alert('componentWillReceiveProps: file'+JSON.stringify(nextProps.file))
		if(nextProps.file!==null){
			//this.file=nextProps.file
			console.log('update file'+nextProps.file)
			this.readFile(nextProps.file);
		}else if(nextProps.content){
			//console.log('update file content')
			this.setState({content:nextProps.content})
		}
	}
	readFile(filePath){
		this.getFileInfo(filePath)
		RNFS.readFile(filePath).then((contents)=>{
			this.updateWithActionIcon(contents)
		})
	}
	getFileInfo(filePath){
		//filename.replace('%3A',':').replace('%2F','/')
		let lastIdx = filePath.lastIndexOf('/')
		let file = filePath.substr(lastIdx+1)
		let folder = filePath.substr(0,lastIdx)
		let fileNoExt = file.substr(0,file.lastIndexOf('.'))
		this.file={
			dir:folder,
			name:file,
			noext:fileNoExt,
			full:filePath,
		}
	}
	updateWithActionIcon(content){
		Icon.getImageSource('play', 20, '#555').then(imgsource => {
			//this.setState({ rightIcon: imgsource })
			Actions.refresh({
					key:'home',
					title:this.file.name,
					rightButtonImage: imgsource,
					rightButtonIconStyle:{width:20,height:20},
					onRight:()=>{ Actions.group({file: this.file.full}) },
					content:content,
					file:null,
			});
        })
	}
    render(){
        return (
            <View style={styles.container}>
                <Text>{this.state.content}</Text>
            </View>
        );
    }
}
