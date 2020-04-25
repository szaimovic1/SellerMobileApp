import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/filterStyles';
import CheckboxFormX from 'react-native-checkbox-form';


export default function FilterIngredients({ navigation }) {
    const mockData = [ // ovo su svi sastojci koje sadrže proizvodi koje dohvatimo
        {
            label: 'label1',
            value: 'one'
        },
        {
            label: 'label2',
            value: 'two'
        },
        {
            label: 'label3',
            value: 'three'
        },
        {
            label: 'label3',
            value: 'three'
        },
        {
            label: 'label3',
            value: 'three'
        },
    ];

    const onSelect = (item) => {
        console.log(item);
    }

    return (
        <View style={styles.container}>
            <View style={{marginBottom: 30,}}>
                <Text style={styles.heading}>Filter products by ingredients</Text>
            </View>
            <View style={styles.container}>
                <CheckboxFormX
                    style={{ width: 350 - 30 }}
                    dataSource={mockData}
                    itemShowKey="label"
                    itemCheckedKey="RNchecked"
                    iconSize={26}
                    iconColor='grey'
                    formHorizontal={false}
                    labelHorizontal={true}
                    textStyle={{fontSize: 20, color: 'black', }}
                    onChecked={(item) => onSelect(item)}
                />
            </View>
            <View style={{flex: 1,}}>
                <TouchableOpacity onPress={() => navigation.navigate('Offer')} style={styles.finishBtn}>
                    <Text style={styles.finishText}>FILTER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}