import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Item from './Item';
import { TextInput } from 'react-native-gesture-handler';

const Note = (props) => {
    const [notes, setNotes] = useState([])
    const [searchText, setSearchText] = useState("")

    getItem = async () => {
        const keysTab = await SecureStore.getItemAsync("keys")
        let keys = []
        if (searchText == "")
            setNotes(JSON.parse(keysTab))
        else {
            if (keysTab != null)
                keys = [...JSON.parse(keysTab)]
            let keys2 = []
            keys.forEach(e => {
                if (e.category.includes(searchText) || e.title.includes(searchText) || e.value.includes(searchText))
                    keys2.push(e)
            })
            setNotes(keys2)
        }
    }

    useEffect(() => {
        getItem()
    })

    return (
        <View style={{ flex: 1, alignContent: 'space-around' }}>
            <TextInput
                placeholder="SZUKAJ NOTATKI..."
                style={{
                    margin: 20,
                    padding: 15,
                    fontSize: 20,
                    borderRadius: 20,
                    backgroundColor: 'lightgrey'
                }}
                onChangeText={(text) => setSearchText(text)}
            />
            <FlatList
                numColumns={2}
                data={notes}
                renderItem={({ item, index }) => <Item item={item} index={index} nav={props.navigation.navigate} />}
            />
        </View>
    );
}

export default Note;
