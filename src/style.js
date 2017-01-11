//import React from 'react';
import {Platform} from "react-native";

module.exports = {
    menu_container: {
        flex: 1,
        backgroundColor: "#2a2929",
    },
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#F5FCFF",
        //marginTop:Platform.OS==='android'?54:64,
    },
    content:{
        flex: 1,
        marginTop:Platform.select({
                ios: 64,
                android: 54,
        })
    },
    listContainer: {
        flex: 1,
        //flexDirection: 'column',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    header:{
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.5,
        borderBottomWidth:0,
        borderRightWidth:0,
        height:40,
    },
    header_text:{
        fontWeight:'bold',
        fontSize:10,
    },
    value_text:{
        fontSize:10,
    },
    row:{
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.5,
        borderBottomWidth:0,
        borderTopWidth:0,
        borderRightWidth:0,
        height:40,
    },
    cell:{
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.5,
        borderTopWidth:0,
        borderLeftWidth:0
    },
    right_icon:{
        //paddingTop:3,
        //paddingBottom:3,
        paddingLeft:20,
        paddingRight:10,
        //alignItems:'center',
        //justifyContent:'center',
    },
    bk:{
        marginLeft:5,
        marginRight:40,
        //alignItems:'center',
        //marginTop:5,
        //marginBottom:5,
    },
    act:{
        marginLeft:20,
        marginRight:10,
        //alignItems:'center',
        //marginTop:5,
        //marginBottom:5,
    },
    section:{
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
    title:{
        fontWeight:'bold',
        fontSize:20,
        backgroundColor:'#eeeeee',
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
    backgroundColor: "#494949",
    height:48,
    paddingLeft:6,
    marginTop:1,
  },
  menu_name: {
    marginLeft:10,
    fontSize:14,
    color:'white',
  },
  menu_link:{
    marginLeft:10,
    flexDirection:'row',
    justifyContent:'center',
  },
}