/* Zona1: importaciones de componentes de archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import TextInputScreen from './TextInputScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ModalScreen from './ModalScreen';
import PressableScreen from './PressableScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';


/* Zona2: Main - hogar de los componentes*/


export default function Menuscreen() {

    const [screen, setScreen] = useState('menu');

    switch (screen) {

        case 'Tarjetas':
            return <TarjetasScreen />
        case 'SafeArea':
            return <SafeAreaScreen />
        case 'Pressable':
            return <PressableScreen />
        case 'TextInput':
            return <TextInputScreen />
        case 'FlatList':
            return <FlatListScreen />
        case 'ImageBackground':
            return <ImageBackgroundScreen />
        case 'ActivityIndicator':
            return <ActivityIndicatorScreen />
        case 'Modal':
            return <ModalScreen />
        case 'menu':
        default:
            return (
                <View style={styles.container}>

                    <Text> Menu de Practicas:  </Text>
                    <Button onPress={() => setScreen('Tarjetas')} title="Practica: Tarjetas" />
                    <Button onPress={() => setScreen('SafeArea')} title="Practica: SafeArea" />
                    <Button onPress={() => setScreen('Pressable')} title="Practica: Pressable" />
                    <Button onPress={() => setScreen('TextInput')} title="Practica: TextInput" />
                    <Button onPress={() => setScreen('FlatList')} title="Practica: FlatList" />
                    <Button onPress={() => setScreen('ImageBackground')} title="Practica: ImageBackground" />
                    <Button onPress={() => setScreen('ActivityIndicator')} title="Practica: ActivityIndicator" />
                    <Button onPress={() => setScreen('Modal')} title="Practica: Modal" />


                    <StatusBar style="auto" />

                </View>
            );
    }

    /* return (
       <View style={styles.container}>
            <StatusBar style="auto" />
       </View>
   ); */
}


/* Zona3: Estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    }
});