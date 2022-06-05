import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Item = (props) => {
    const colors = ['red', 'blue', 'green']
    const [color, setColor] = useState(0)
    const [date, setDate] = useState("")

    deleteItem = async (index) => {
        const keysTab = await SecureStore.getItemAsync("keys")
        let keys = []
        JSON.parse(keysTab).forEach((e, i) => {
            if (i != index) {
                keys.push(e)
            }
        })
        await SecureStore.setItemAsync("keys", JSON.stringify(keys))
    }

    useEffect(() => {
        const min = Math.ceil(0)
        const max = Math.floor(2)
        setColor(Math.floor(Math.random() * (max - min + 1)) + min)
        const now = new Date()
        let month = ""
        if (now.getMonth() == 1) month = "sty"
        else if (now.getMonth() == 2) month = "lut"
        else if (now.getMonth() == 3) month = "mar"
        else if (now.getMonth() == 4) month = "kwi"
        else if (now.getMonth() == 5) month = "maj"
        else if (now.getMonth() == 6) month = "cze"
        else if (now.getMonth() == 7) month = "lip"
        else if (now.getMonth() == 8) month = "sie"
        else if (now.getMonth() == 9) month = "wrz"
        else if (now.getMonth() == 10) month = "paź"
        else if (now.getMonth() == 11) month = "lis"
        else if (now.getMonth() == 12) month = "gru"
        setDate(now.getDate() + " " + month);
    }, [])

    return (
        <View style={{
            backgroundColor: colors[color],
            flexGrow: 1,
            flex: 1,
            justifyContent: 'center',
            margin: 20,
            padding: 10,
            borderRadius: 10,
            height: 160,
        }}>
            <TouchableOpacity
                onLongPress={() => {
                    Alert.alert(
                        "Usunac?",
                        "Bez mozliwosci przywrocenia?",
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => deleteItem(props.index) }
                        ]
                    )
                }}
                onPress={() =>
                    props.nav('edytuj notatke', { category: props.item.category, title: props.item.title, text: props.item.value })
                }
            >
                <Text style={{ color: 'white', textAlign: 'right', position: 'relative', bottom: 25 }}>{date}</Text>
                <Text style={{ color: colors[color], backgroundColor: 'black', padding: 10, width: 100, fontSize: 20, borderRadius: 10, textAlign: 'center', position: 'relative', bottom: 20 }}>{props.item.category}</Text>
                <Text style={{ color: 'white', fontSize: 20, position: 'relative', bottom: 20 }}>{props.item.title}</Text>
                <Text style={{ color: 'white' }}>{props.item.value}</Text>
            </TouchableOpacity>
        </View >
    )
}

export default Item

