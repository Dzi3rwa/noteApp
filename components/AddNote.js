import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';

const AddNote = (props) => {
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")
    const [pickerValue, changePickerValue] = useState("")
    const [pickerValues, changePickerValues] = useState()

    save = async (key, value) => {
        const keysTab = await SecureStore.getItemAsync("keys")
        let keys = []
        if (keysTab != null)
            keys = [...JSON.parse(keysTab)]
        const id = keys.length
        keys.push({ key: id, title: key, value: value, category: pickerValue })
        await SecureStore.setItemAsync("keys", JSON.stringify(keys))
        setKey("")
        setValue("")
        props.navigation.navigate("notatki")
    }

    getItem = async () => {
        const result = await SecureStore.getItemAsync("category")
        let resultJson
        if (result != null)
            resultJson = JSON.parse(result)
        const pic = resultJson.map(e => {
            return <Picker.Item key={e.key} label={e.category} value={e.category} />
        })
        changePickerValues(pic)
    }

    useEffect(() => {
        getItem()
    })

    pickerChange = (pickerValue) => {
        changePickerValue(pickerValue)
    }

    return (
        <View>
            <TextInput
                underlineColorAndroid="#ff0000"
                placeholder="TYTUŁ..."
                style={{
                    margin: 20,
                    padding: 20,
                    fontSize: 20
                }}
                onChangeText={(text) => setKey(text)}
                multiline={true}
                value={key}
            />
            <TextInput
                underlineColorAndroid="#ff0000"
                placeholder="TREŚĆ..."
                style={{
                    margin: 20,
                    padding: 20,
                    fontSize: 20
                }}
                onChangeText={(text) => setValue(text)}
                multiline={true}
                value={value}
            />
            <Picker
                selectedValue={pickerValue}
                onValueChange={pickerChange}>

                {pickerValues}
            </Picker>
            <TouchableOpacity onPress={() => save(key, value)}>
                <Text style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: 'bold'
                }}>DODAJ</Text>
            </TouchableOpacity>
        </View>
    );

}

export default AddNote;
