import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InfoListField = props => {
    const {style, label, data, ...rest} = props

    return (
        <View style={{marginHorizontal: 10,flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: "bold",fontSize: 15}}>{label}:</Text>
            {data.length >= 18 ? (<Text numberOfLines={2} ellipsizeMode='middle' style={{fontSize: 15, marginLeft: 5, width: 150, paddingTop: 17}}>{data}</Text>) : (<Text ellipsizeMode='middle' style={{fontSize: 15, marginLeft: 5, width: 150}}>{data}</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default InfoListField