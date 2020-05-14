import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground,TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import styles from '../styles/tablesStyles';
import { useTablesContext } from '../contexts/tablesContext';

export default function DisplayTables({ navigation }) {
    const { tables, getTables, setTables } = useTablesContext();
    useEffect(() => {
        getTables();
    }, []);
    const makeTableMap = (tables, columnNumber) => {
        var tableMap = tables;
        const numberOfFullRows = Math.floor(tables.length / columnNumber);
        let numberOfElementsInLastRow = tables.length - (numberOfFullRows*columnNumber);
        const empty = { // ovo je objekat koji sluzi samo da se do kraja popuni zadnji red, ukoliko nije popunjen sa "pravim" stolovima
            id: 0,
            empty:true
        };
        while(numberOfElementsInLastRow != columnNumber && numberOfElementsInLastRow != 0) {
            if (tableMap !== undefined) {
                tableMap.push(empty);
                numberOfElementsInLastRow = numberOfElementsInLastRow + 1;
            }            
        }
        return tableMap;
    }
    const columnNumber = 3;
    const tablesList = makeTableMap(tables, columnNumber);

   
    return (
        <ImageBackground style={styles.imageBackground} source={require('../images/background2.png')}>
            <View style={styles.tablesView}>
            <FlatList 
                data={tablesList}
                renderItem={({item}) => {
                    if(item.empty === true) {
                        return(
                            <View style={styles.invisible}>
                                <Image style={styles.imageTable}/>
                                <Text></Text>
                            </View>
                        );
                    }
                    else {
                        return(  
                            <TouchableOpacity style={styles.tableStyle}>
                                <Image style={styles.imageTable} source={require("../images/circle.png")}/>
                                <Text style={styles.text}>{item.tableName}</Text>
                            </TouchableOpacity> 
                        );  
                    }
                }}
                numColumns={columnNumber}
            />
            </View>
        </ImageBackground>
    )
}