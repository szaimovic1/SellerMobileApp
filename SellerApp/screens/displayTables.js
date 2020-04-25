import React, { useState } from 'react';
import { View, Text, Image, ImageBackground,TouchableOpacity, FlatList} from 'react-native';

export default function DisplayTables({ navigation }) {
    const test= [
        {table: 1, x: 1, y: 1},
        {table: 2, x: 1, y: 2},
        {table: 3, x: 1, y: 3},
        {table: 6, x: 2, y: 1},
        {table: 7, x: 2, y: 3},
        {table: 9, x: 4, y: 1},
        {table: 10, x: 4, y: 3},
        {table: 11, x: 5, y: 1},
        {table: 12, x: 5, y: 2},
        {table: 13, x: 5, y: 3}
    ];
    const numberOfRows = (tables) => {
        var max = 0;
        //console.log(tables.length);
        for(var i = 0; i < tables.length; i++)  {
            if(max<tables[i].x) max = tables[i].x;
        }
        //console.log(max);
        return max;
    }
    const numberOfColumns = (tables) => {
        var max = 0;
        //console.log(tables.length);
        for(var i = 0; i < tables.length; i++)  {
            if(max<tables[i].y) max = tables[i].y;
        }
        //console.log(max);
        return max;
    }
    const makeTableMap = (tables) => {
        tables.sort(function(t1, t2) {
            return t1.y - t2.y;
        });
        tables.sort(function(t1, t2) {
            return t1.x - t2.x;
        });
        var rowN = numberOfRows(tables);
        var column = numberOfColumns(tables);
        //var temp = 1;
        var tableMap = [];
        var empty = {
            table: 0,
            x: 0, 
            y:0,
            empty:true
        };
        var borja = 0;
        for(var i=1; i <= rowN; i++) {
            for(var j=1; j <= column; j++) {
                var containTableOnIJ = tables.filter(function(table) {
                    return table.x == i && table.y == j;
                });
                if(containTableOnIJ.length==0) {
                    borja++;
                    tableMap.push(empty);
                }
                else {
                    tableMap.push(containTableOnIJ[0]);
                }
            }
        }
        
        console.log('ovoliko fali '+borja);
        return tableMap;
    }
    const tables = makeTableMap(test);
    return (
        <ImageBackground style={{ flex: 1,
            paddingTop: 30}} source={require('../images/background2.png')}>
            <View style={{backgroundColor: '#05132e', alignContent: 'center', padding:10}}>
            <FlatList 
                data={tables}
                renderItem={({item}) => {
                    if(item.empty === true) {
                        return(
                            <View style={{borderRadius:4,backgroundColor:'transparent',flex: 1, flexDirection: 'column', margin: 2, alignItems:'center' }}>
                                <Image style={{ width: 50, height: 50}}/>
                                <Text></Text>
                            </View>
                        );
                    }
                    else {
                        return(  
                            <TouchableOpacity style={{borderRadius:4, backgroundColor: 'white', flex: 1, flexDirection: 'column', margin: 2, alignItems:'center' }}>
                                <Image style={{ width: 50, height: 50}} source={require("../images/circle.png")}/>
                                <Text style={{color:'#05132e', fontWeight:'bold'}}>Table {item.table}</Text>
                            </TouchableOpacity> 
                        );  
                    }
                }}
                numColumns={numberOfColumns(test)}
                keyExtractor={(item) => item.table.toString()}
            />
            </View>
        </ImageBackground>
    )
}