import React from 'react';
import { Alert, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label=""
                icon={() => <Image source={require('../assets/pen.png')} style={{ width: 100, height: 100 }} />}
            />
            <DrawerItemList {...props} />
            <DrawerItem
                label="info"
                icon={() => <Image source={require('../assets/info.png')} style={{ width: 40, height: 40 }} />}
                onPress={() => Alert.alert("info version 2.0")}
            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
