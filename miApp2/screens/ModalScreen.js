/* import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [selectedMode, setSelectedMode] = useState('Presencial');
    const [reservationConfirmed, setReservationConfirmed] = useState(false);

    function selectedMode(mode) {
        setSelectedMode(mode);
        setReservationConfirmed(false);
        setSheetVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={Styles.title}>Reserva de clase</Text>
            <Text style={Styles.subtitle}>React Native: Modal y Bottom Sheet</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Clase practica</Text>
                <Text style={Styles.cardText}>Duracion de 40 min</Text>
                <Text style={Styles.cardText}>Modalidad: {selectedMode}</Text>
                <Text style={Styles.cardText}> Estado: {reservationConfirmed ? 'Confirmada' : 'Pendiente'}</Text>
            </View>

            <Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
                <Text style={styles.secondaryButtonText}>Elegir modalidad</Text>
            </Pressable>

            <Pressable style={styles.PrimaryButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.primaryButtonText}>Confirmar reserva</Text>
            </Pressable>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent
                statusBarTranslucent
                onShow={() => console.log('Modal de confirmacion abierto')}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.Overlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Confirmar reserva</Text>
                        <Text style={styles.modalText}>Deseas reversar la clase en modalidad</Text>

                        <View style={styles.actionsRow}>
                            <Pressable
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}>

                                <Text style={stylescancelButtonText}>Cancelar</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.actionButton, styles.confirmButton]}
                                onPress={() => {
                                    setReservationConfirmed(true);
                                    setModalVisible(false);
                                }}>

                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </Pressable>
                        </View>a
                    </View>
                </View>
            </Modal>



        </View>
    )
}
 */

























/* Zona1: importaciones de componentes de archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


/* Zona2: Main - hogar de los componentes*/


export default function ModalScreen() {
    return (
        <View style={styles.container}>

            <Text> Aqui va la practica de Fernando, Alan y Erick </Text>
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