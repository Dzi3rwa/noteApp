import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AddCategory = () => {

    const [category, setCategory] = useState("")

    saveCategory = async (category) => {
        const keysTab = await SecureStore.getItemAsync("category")
        let keys = []
        if (keysTab != null)
            keys = [...JSON.parse(keysTab)]
        const id = keys.length
        let bool = false
        keys.forEach(e => {
            if (e.category == category)
                bool = true
        })
        if (!bool)
            keys.push({ key: id, category: category })
        await SecureStore.setItemAsync("category", JSON.stringify(keys))
        setCategory("")
    }

    return (
        <View>
            <TextInput
                underlineColorAndroid="#ff0000"
                placeholder="Nowa kategoria"
                style={{
                    margin: 20,
                    padding: 20,
                    fontSize: 20
                }}
                onChangeText={(text) => setCategory(text)}
                value={category}
            />
            <TouchableOpacity onPress={() => saveCategory(category)}>
                <Text style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: 'bold'
                }}>DODAJ KATEGORIĘ</Text>
            </TouchableOpacity>
        </View>
    );

}

export default AddCategory;
