import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const DescriptionField = (props) => {
    const {label, style, ...rest} = props

    return (
        <View style={{ width: "100%" }}>
            <Text >{label}</Text>
            <View >
            <TextInput style={[styles.inputBox, style]} {...rest}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        height: 300,
      borderWidth: 1,
      borderColor: "rgba(172,172,172,0.7)",
      marginBottom: 20,
      paddingHorizontal: 10,
      marginVertical: 5,
      borderRadius: 5,
      paddingTop: 10,
      textAlignVertical: "top"
    }
  });

  export default DescriptionField;
