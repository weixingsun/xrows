import React from 'react';
import {Platform, View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";

var styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        marginTop:Platform.OS==='android'?54:64,
    },
    col:{
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.5,
        //borderBottomWidth:0,
        //borderTopWidth:0,
        //borderRightWidth:0,
        //height:360,
    },
    cell:{
        alignItems:'center',
        justifyContent:'center',
        //borderWidth:0.5,
        //borderTopWidth:0,
        //borderLeftWidth:0
        //height:60,
    },
};

export default class Book extends React.Component {
	constructor(props) {
        super(props);
        this.state={
			selects:['select_name','select1','select2','select3',],
			select_name:['SELECT'],
            select1:['TOP','DISTINCT','INTO','FROM','JOIN',],
			select2:['GROUP BY','HAVING','ORDER BY','LIMIT','OFFSET',],
			select3:['UNION','UNION ALL','INTERSECT','MINUS','EXCEPT'],
			
			operators:['operator_name','numbers','compares','includes'],
			operator_name:['OPERATORS'],
			numbers:[' 1+2 ',' 2-1 ',' 1*2 ',' 2/1 ',' 3%1 ',' a+b ','IS NULL', 'IS NOT NULL'],
			compares:[' = ',' != ',' <  ',' <=  ',' > ',' >= ','BETWEEN','NOT BETWEEN'],
			includes:['IS NULL','IS NOT NULL','IN', 'NOT IN', 'CONTAINS'],
			
			functions:['function_name','aggregators','functions1','functions2',], //'grouping',
			function_name:['Functions'],
			aggregators:['SUM()','COUNT()','MIN()','MAX()','FIRST()','LAST()','MEDIAN()','AGGR()','ARRAY()',],
			//grouping:['CUBE()','ROLLUP()','GROUPING SETS()',],
			functions1:['SUBSTRING()','MID()','INSTR()','TRIM()','CONVERT()','NEWID()','UUID()','GEN_RANDOM_UUID()','ROWNUM()','COALESCE()' ],
			functions2:['ABS()', 'IIF()', 'IFNULL()', 'INSTR()', 'LOWER()', 'UPPER()', 'LCASE()', 'UCASE()', 'LEN()', 'LENGTH()','YEAR(date)', 'DAYOFWEEK(date)'],
        }
    }
	
	componentWillMount(){
    }
	renderCols(cols){
		return (
		    cols.map((key,i)=>{
                return(
					<Col key={i} style={styles.col}>
						{this.renderRows(this.state[key])}
					</Col>
				)
            })
		)
	}
	renderRows(rows){
		return (
		    rows.map((key,i)=>{
                return (<Row key={i} style={styles.cell}><Text>{key}</Text></Row>)
            })
		)
	}
    render(){
        //<View style={styles.separator} />
        return (
            <View style={styles.container}>
                <Grid size={25}>
					{this.renderCols(this.state.selects)}
                </Grid>
                <Grid size={25}>
					{this.renderCols(this.state.operators)}
                </Grid>
                <Grid size={50}>
					{this.renderCols(this.state.functions)}
                </Grid>
            </View>
        );
    }
}
