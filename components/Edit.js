import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

const Edit = (props) => {
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")
    const [pickerValue, changePickerValue] = useState("")
    const [pickerValues, changePickerValues] = useState()

    editNote = async (key, value) => {
        const keysTab = await SecureStore.getItemAsync("keys")
        const oldCategory = props.route.params.category
        const oldTitle = props.route.params.title
        const oldText = props.route.params.text
        let keys = []
        let keys2 = []
        if (keysTab != null)
            keys = [...JSON.parse(keysTab)]
        keys.forEach(e => {
            if (e.category == oldCategory && e.title == oldTitle && e.value == oldText)
                keys2.push({ key: e.key, title: key, value: value, category: pickerValue })
            else
                keys2.push(e)
        })
        await SecureStore.setItemAsync("keys", JSON.stringify(keys2))
        props.navigation.navigate("notatki")
    }

    getItem = async () => {
        changePickerValue(props.route.params.category)
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
    }, [])

    pickerChange = (pickerValue) => {
        changePickerValue(pickerValue)
    }

    return (
        <View>
            <TextInput
                defaultValue={props.route.params.title}
                underlineColorAndroid="#ff0000"
                placeholder="TYTUŁ..."
                style={{
                    margin: 20,
                    padding: 20,
                    fontSize: 20
                }}
                onChangeText={(text) => setKey(text)}
                multiline={true}
            />
            <TextInput
                defaultValue={props.route.params.text}
                underlineColorAndroid="#ff0000"
                placeholder="TREŚĆ..."
                style={{
                    margin: 20,
                    padding: 20,
                    fontSize: 20
                }}
                onChangeText={(text) => setValue(text)}
                multiline={true}
            />
            <Picker
                selectedValue={pickerValue}
                onValueChange={pickerChange}>

                {pickerValues}
            </Picker>
            <TouchableOpacity onPress={() => editNote(key, value)}>
                <Text style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: 'bold'
                }}>EDYTUJ</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Edit;
