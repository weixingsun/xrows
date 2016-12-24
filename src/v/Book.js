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
			select_name:['SELECT','INTO','FROM',], //'JOIN',
            select1:['DISTINCT','COUNT()','TOP','SUM()','MIN()','MAX()','FIRST()','LAST()','MEDIAN()','AGGR()','ARRAY()',],
			select2:['GROUP BY','HAVING','ORDER BY','LIMIT','OFFSET','CUBE()','ROLLUP()','GROUPING SETS()',],
			select3:['UNION','UNION ALL','INTERSECT','MINUS','EXCEPT'],
			
			operators:['operator_name','numbers','compares','includes'],
			operator_name:['OPERATORS'],
			numbers:[' 1+2 ',' 2-1 ',' 1*2 ',' 2/1 ',' 3%1 ',' a+b ','IS NULL', 'IS NOT NULL'],
			compares:[' = ',' != ',' <  ',' <=  ',' > ',' >= ','BETWEEN','NOT BETWEEN'],
			includes:['IS NULL','IS NOT NULL','IN', 'NOT IN', 'CONTAINS'],
			
			functions:['function_name','func_number','func_string','func_common'],
			function_name:['FUNCTIONS'],
			func_number:['ABS()','ROUND()','POWER()','EXP()','CEIL()','FLOOR()','SQRT()', ],
			func_common:['ROWNUM()','IIF()', 'IFNULL()', 'CONVERT()','NEWID()','UUID()','GEN_RANDOM_UUID()','YEAR(date)', 'DAYOFWEEK(date)' ],
			func_string:['SUBSTRING()','INSTR()','MID()','TRIM()','LOWER()', 'UPPER()', 'LCASE()', 'UCASE()', 'LEN()', 'REGEXP_LIKE()','REPLACE()'],
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
