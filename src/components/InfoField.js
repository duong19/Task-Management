import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InfoField = props => {
    const {style, label, data, ...rest} = props

    return (
        <View style={{marginVertical: 10,marginHorizontal: 15,flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: "bold",fontSize: 18}}>{label}:</Text>
            <Text style={{fontSize: 18, marginLeft: 10}}>{data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default InfoField