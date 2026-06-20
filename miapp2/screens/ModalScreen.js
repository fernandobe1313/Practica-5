// =============================================
// PARTE DE FER - Paso 1: Importaciones
// =============================================
import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// =============================================
// PARTE DE FER - Paso 2: Funcion principal y estados
// =============================================
export default function ModalScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [selectedMode, setSelectedMode] = useState('Presencial');
    const [reservationConfirmed, setReservationConfirmed] = useState(false);

    // =============================================
    // PARTE DE ALAN - Funcion auxiliar de seleccion
    // =============================================
    function selectMode(mode) {
        setSelectedMode(mode);
        setReservationConfirmed(false);
        setSheetVisible(false);
    }

    return (
        // =============================================
        // PARTE DE FER - Paso 3: Estructura visual base
        // =============================================
        <View style={styles.container}>
            <Text style={styles.title}>Reserva de clase</Text>
            <Text style={styles.subtitle}>React Native: Modal y Bottom Sheet</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Clase practica</Text>
                <Text style={styles.cardText}>Duracion: 40 minutos</Text>
                <Text style={styles.cardText}>Modalidad: {selectedMode}</Text>
                <Text style={styles.cardText}>
                    Estado: {reservationConfirmed ? 'Confirmada' : 'Pendiente'}
                </Text>
            </View>

            {/* PARTE DE ERICK - Boton para abrir Bottom Sheet */}
            <Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
                <Text style={styles.secondaryButtonText}>Elegir modalidad</Text>
            </Pressable>

            {/* PARTE DE FER - Boton para abrir Modal */}
            <Pressable style={styles.primaryButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.primaryButtonText}>Confirmar reserva</Text>
            </Pressable>

            {/* =============================================
          PARTE DE FER - Paso 4: Modal de confirmacion
          ============================================= */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent
                statusBarTranslucent
                onShow={() => console.log('Modal de confirmacion abierto')}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Confirmar reserva</Text>
                        <Text style={styles.modalText}>
                            Deseas reservar la clase en modalidad {selectedMode}?
                        </Text>

                        <View style={styles.actionsRow}>
                            <Pressable
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.actionButton, styles.confirmButton]}
                                onPress={() => {
                                    setReservationConfirmed(true);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* =============================================
          PARTE DE ERICK - Paso 6: Uso del BottomSheet
          ============================================= */}
            <BottomSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                title="Elige modalidad"
                height={330}
            >
                <Pressable style={styles.optionButton} onPress={() => selectMode('Presencial')}>
                    <Text style={styles.optionTitle}>Presencial</Text>
                    <Text style={styles.optionText}>Asiste al salon asignado.</Text>
                </Pressable>

                <Pressable style={styles.optionButton} onPress={() => selectMode('En linea')}>
                    <Text style={styles.optionTitle}>En linea</Text>
                    <Text style={styles.optionText}>Recibe el enlace de videollamada.</Text>
                </Pressable>

                <Pressable style={styles.optionButton} onPress={() => selectMode('Grabacion')}>
                    <Text style={styles.optionTitle}>Grabacion</Text>
                    <Text style={styles.optionText}>Consulta la clase despues.</Text>
                </Pressable>
            </BottomSheet>

            <StatusBar style="auto" />
        </View>
    );
}

// =============================================
// PARTE DE ERICK - Paso 5: Componente BottomSheet
// =============================================
function BottomSheet({
    visible,
    onClose,
    title,
    height = 320,
    closeOnBackdropPress = true,
    children,
}) {
    const translateY = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : height,
            duration: visible ? 250 : 200,
            useNativeDriver: true,
        }).start();
    }, [height, translateY, visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.sheetOverlay}>
                <Pressable
                    style={styles.sheetBackdrop}
                    onPress={closeOnBackdropPress ? onClose : undefined}
                />

                <Animated.View
                    style={[
                        styles.sheetContainer,
                        { height, transform: [{ translateY }] },
                    ]}
                >
                    <View style={styles.sheetHandle} />
                    <Text style={styles.sheetTitle}>{title}</Text>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
}

// =============================================
// PARTE DE ALAN - Estilos (compartidos por todos)
// =============================================
const styles = StyleSheet.create({
    /* --- Estilos generales de la pantalla --- */
    container: {
        flex: 1,
        backgroundColor: '#f7f8fb',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 24,
    },
    title: { fontSize: 28, fontWeight: '700', color: '#18202f', marginBottom: 6 },
    subtitle: { fontSize: 15, color: '#5f6b7a', marginBottom: 20 },

    /* --- Estilos de la tarjeta de clase --- */
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#dfe4ea',
    },
    cardTitle: { fontSize: 20, fontWeight: '700', color: '#18202f', marginBottom: 10 },
    cardText: { fontSize: 16, color: '#3f4a5a', marginBottom: 6 },

    /* --- Estilos de botones principales --- */
    primaryButton: {
        backgroundColor: '#1f6feb',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderColor: '#1f6feb',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    secondaryButtonText: { color: '#1f6feb', fontSize: 16, fontWeight: '700' },

    /* --- Estilos del Modal --- */
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    modalCard: { width: '100%', backgroundColor: '#ffffff', borderRadius: 8, padding: 22 },
    modalTitle: { fontSize: 22, fontWeight: '700', color: '#18202f', marginBottom: 10 },
    modalText: { fontSize: 16, color: '#3f4a5a', marginBottom: 20 },
    actionsRow: { flexDirection: 'row', gap: 10 },
    actionButton: { flex: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
    cancelButton: { backgroundColor: '#edf1f7' },
    confirmButton: { backgroundColor: '#1f6feb' },
    cancelButtonText: { color: '#3f4a5a', fontWeight: '700' },
    confirmButtonText: { color: '#ffffff', fontWeight: '700' },

    /* --- Estilos del Bottom Sheet --- */
    sheetOverlay: { flex: 1, justifyContent: 'flex-end' },
    sheetBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.35)' },
    sheetContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 24,
    },
    sheetHandle: {
        width: 44, height: 5, borderRadius: 999,
        backgroundColor: '#c7ced8', alignSelf: 'center', marginBottom: 16,
    },
    sheetTitle: { fontSize: 20, fontWeight: '700', color: '#18202f', marginBottom: 14 },
    optionButton: {
        borderWidth: 1, borderColor: '#dfe4ea', borderRadius: 8,
        padding: 14, marginBottom: 10, backgroundColor: '#f9fafc',
    },
    optionTitle: { fontSize: 16, fontWeight: '700', color: '#18202f', marginBottom: 4 },
    optionText: { fontSize: 14, color: '#5f6b7a' },
});






// Esta será la practica paso a paso
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

























// /* Zona1: importaciones de componentes de archivos*/
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';


// /* Zona2: Main - hogar de los componentes*/


// export default function ModalScreen() {
//     return (
//         <View style={styles.container}>

//             <Text> Aqui va la practica de Fernando, Alan y Erick </Text>
//             <StatusBar style="auto" />

//         </View>
//     );
// }


// /* Zona3: Estilos y posicionamiento */
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'flex-start',
//         justifyContent: 'center',
//         flexDirection: 'column'
//     }
// });