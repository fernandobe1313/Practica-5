import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [asistiraTaller, setAsistiraTaller] = useState(true);
  const [requiereConstancia, setRequiereConstancia] = useState(false);
  const [participaraDeportes, setParticiparaDeportes] = useState(true);

  const handleRegistro = () => {

    if (!nombre.trim() || !carrera.trim() || !semestre.trim()) {
      Alert.alert(
        "Campos incompletos",
        "Debes llenar todos los campos."
      );
      return;
    }


    const isNumeric = /^\d+$/.test(semestre.trim());
    if (!isNumeric) {
      Alert.alert(
        "Error",
        "El semestre debe ser un número."
      );
      return;
    }


    Alert.alert(
      "Registro enviado",
      `Nombre: ${nombre.trim()}
Carrera: ${carrera.trim()}
Semestre: ${semestre.trim()}

Taller: ${asistiraTaller ? 'Sí' : 'No'}
Constancia: ${requiereConstancia ? 'Sí' : 'No'}
Deportes: ${participaraDeportes ? 'Sí' : 'No'}`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Registro de Evento Universitario</Text>

            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#9ca3af"
                value={nombre}
                onChangeText={setNombre}
              />

              <TextInput
                style={styles.input}
                placeholder="Carrera"
                placeholderTextColor="#9ca3af"
                value={carrera}
                onChangeText={setCarrera}
              />

              <TextInput
                style={styles.input}
                placeholder="Semestre"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={semestre}
                onChangeText={setSemestre}
              />
            </View>

            <Text style={styles.sectionTitle}>Opciones</Text>

            <View style={styles.switchGroup}>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>¿Asistirá al taller?</Text>
                <Switch
                  trackColor={{ false: '#e2e8f0', true: '#14b8a6' }}
                  thumbColor="#ffffff"
                  ios_backgroundColor="#e2e8f0"
                  onValueChange={setAsistiraTaller}
                  value={asistiraTaller}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>¿Requiere constancia?</Text>
                <Switch
                  trackColor={{ false: '#e2e8f0', true: '#14b8a6' }}
                  thumbColor="#ffffff"
                  ios_backgroundColor="#e2e8f0"
                  onValueChange={setRequiereConstancia}
                  value={requiereConstancia}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>¿Participará en deportes?</Text>
                <Switch
                  trackColor={{ false: '#e2e8f0', true: '#14b8a6' }}
                  thumbColor="#ffffff"
                  ios_backgroundColor="#e2e8f0"
                  onValueChange={setParticiparaDeportes}
                  value={participaraDeportes}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegistro}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Enviar Registro</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 3,
    borderColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  switchGroup: {
    marginBottom: 24,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#374151',
  },
  button: {
    backgroundColor: '#0070f3',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

