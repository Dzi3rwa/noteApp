import React, { useState } from 'react'

import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './components/Drawer.js';
import Note from "./components/Note.js"
import AddNote from "./components/AddNote.js"
import AddCategory from './components/AddCategory.js';
import EditCategory from './components/Edit.js'


const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
                    name="notatki"
                    component={Note}
                    options={{
                        drawerIcon: () => (
                            <Image source={require('./assets/note.png')} style={{ width: 40, height: 40 }} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="dodaj notatkę"
                    component={AddNote}
                    options={{
                        drawerIcon: () => (
                            <Image source={require('./assets/add.png')} style={{ width: 40, height: 40 }} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="dodaj kategorię"
                    component={AddCategory}
                    options={{
                        drawerIcon: () => (
                            <Image source={require('./assets/add2.jpg')} style={{ width: 40, height: 40 }} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="edytuj notatke"
                    component={EditCategory}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default App;