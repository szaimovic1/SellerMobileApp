import React, { useState, createContext, useContext } from 'react';
import { AsyncStorage } from 'react-native';

export const TablesContext = createContext();

export const TablesContextProvider = (props) => {
    const { children } = props;

    const [tables, setTables] = useState([]);

    const getTables = async () => {
        var TOKEN = await AsyncStorage.getItem('token');
        fetch("https://cash-register-server-si.herokuapp.com/api/tables", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + TOKEN
          }
        })
          .then((response) => response.json())
          .then((serverTables) => {
            setTables(serverTables);
            return serverTables;
          })
          .done();
    }

    const tablesData = {
        tables, 
        getTables,
        setTables,
    }

    return <TablesContext.Provider value={tablesData}>{ children }</TablesContext.Provider>;

}

export const { Consumer } = TablesContext;

export const useTablesContext = () => useContext(TablesContext);