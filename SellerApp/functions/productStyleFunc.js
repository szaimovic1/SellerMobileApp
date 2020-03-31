import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export const getStyle = (quantitiy) => {
    if(Number(quantitiy)>=0 && Number(quantitiy)<10) {
      return { //ukoliko bude potrebno i za kritične
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        color: 'red'
       }
    }
    else {
      return {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
      }
    }
}

export const getTitleStyle = (quantitiy) => {
    if(Number(quantitiy) == 0) {
      return {
        paddingTop: 10,
        color: '#e6e6e6',
      }
    } 
    
    else {
      return {
        paddingTop: 10,
        color: '#000000'
      }
    }
}

export const getSubtitleStyle = (quantitiy) => {
    if(Number(quantitiy) == 0) {
      return {
        paddingBottom: 10,
        color: '#e6e6e6'
      }
    } else {
      return {
        paddingBottom: 10,
        color: '#000000'
      }
    }
}

  
export const getTextStyle = (quantitiy) => {
    if(Number(quantitiy) == 0) {
      return {
        color: '#e6e6e6'
      }
    } else {
      return {
        color: '#000000'
      }
    }
}
  
export const isProductQuantitySmall = (quantity) => {
    var small=false;
    if(Number(quantity)>=0 && Number(quantity)<10) {
      small=true;
    }
    if(small) {
      return(<FontAwesome name='exclamation-circle' color='red' size={25}/>);
    }
}