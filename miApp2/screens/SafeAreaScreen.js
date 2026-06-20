/* Zona1: importaciones de componentes de archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


/* Zona2: Main - hogar de los componentes*/


export default function SafeAreaScreen() {
    return (
        <View style={styles.container}>

            <Text> Aqui va la practica de Gabo </Text>
            <StatusBar style="auto" />

        </View>
    );
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