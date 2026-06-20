# Distribucion del codigo por integrante

> Este documento separa el codigo final de `ModalScreen.js` indicando que le toca a cada integrante (Fer, Erick y Alan), con explicacion detallada de cada bloque.

---

## Codigo completo con comentarios de asignacion

```jsx
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
```

---

---

# Explicacion detallada por integrante

---

## 🔵 FER — Modal y estructura principal

### Bloque 1: Importaciones

```jsx
import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Animated, Modal, Pressable, StyleSheet, Text, View,
} from 'react-native';
```

| Importacion | De donde viene | Para que sirve |
|---|---|---|
| `useState` | `react` | Crear variables de estado que al cambiar re-renderizan el componente |
| `useRef` | `react` | Guardar una referencia persistente que NO causa re-render al cambiar (lo usa Erick para la animacion) |
| `useEffect` | `react` | Ejecutar codigo cuando una dependencia cambia (lo usa Erick para disparar la animacion) |
| `StatusBar` | `expo-status-bar` | Controla el estilo de la barra de estado del celular (iconos de hora, bateria, etc.) |
| `Animated` | `react-native` | API para crear animaciones fluidas (la usa Erick en el Bottom Sheet) |
| `Modal` | `react-native` | Componente nativo que muestra contenido encima de la pantalla actual |
| `Pressable` | `react-native` | Componente que detecta toques/presses del usuario, reemplaza a `TouchableOpacity` |
| `StyleSheet` | `react-native` | Utilidad para crear hojas de estilo optimizadas |
| `Text` | `react-native` | Muestra texto en pantalla (obligatorio en RN, no se puede poner texto suelto) |
| `View` | `react-native` | Contenedor basico, equivalente a un `<div>` en web |

---

### Bloque 2: Declaracion de la funcion y estados

```jsx
export default function ModalScreen() {
```

- `export default` — Permite que otros archivos importen este componente como el principal del archivo.
- `function ModalScreen()` — Declara un componente funcional de React. Todo lo que esta dentro es la logica de la pantalla.

```jsx
const [modalVisible, setModalVisible] = useState(false);
const [sheetVisible, setSheetVisible] = useState(false);
const [selectedMode, setSelectedMode] = useState('Presencial');
const [reservationConfirmed, setReservationConfirmed] = useState(false);
```

| Estado | Valor inicial | Setter | Uso |
|---|---|---|---|
| `modalVisible` | `false` | `setModalVisible` | Controla si el Modal de confirmacion esta abierto o cerrado |
| `sheetVisible` | `false` | `setSheetVisible` | Controla si el Bottom Sheet esta abierto o cerrado |
| `selectedMode` | `'Presencial'` | `setSelectedMode` | Guarda la modalidad elegida por el usuario |
| `reservationConfirmed` | `false` | `setReservationConfirmed` | Indica si el usuario ya confirmo la reserva |

**¿Por que `useState` y no una variable normal?** Porque React necesita saber cuando algo cambio para volver a pintar la pantalla. Si usas `let modalVisible = false`, React nunca se entera del cambio.

---

### Bloque 3: Estructura visual (return)

```jsx
<View style={styles.container}>
```
- `<View>` es el contenedor raiz de toda la pantalla. `styles.container` le da padding, color de fondo y centra el contenido.

```jsx
<Text style={styles.title}>Reserva de clase</Text>
<Text style={styles.subtitle}>React Native: Modal y Bottom Sheet</Text>
```
- Dos textos: el titulo principal (grande, negrita) y un subtitulo descriptivo (mas chico, gris).

```jsx
<View style={styles.card}>
  <Text style={styles.cardTitle}>Clase practica</Text>
  <Text style={styles.cardText}>Duracion: 40 minutos</Text>
  <Text style={styles.cardText}>Modalidad: {selectedMode}</Text>
  <Text style={styles.cardText}>
    Estado: {reservationConfirmed ? 'Confirmada' : 'Pendiente'}
  </Text>
</View>
```
- `<View style={styles.card}>` — Tarjeta blanca con borde que muestra info de la clase.
- `{selectedMode}` — Muestra dinamicamente la modalidad elegida. Cambia cuando el usuario selecciona en el Bottom Sheet.
- `{reservationConfirmed ? 'Confirmada' : 'Pendiente'}` — Operador ternario: si `reservationConfirmed` es `true` muestra "Confirmada", si es `false` muestra "Pendiente".

```jsx
<Pressable style={styles.primaryButton} onPress={() => setModalVisible(true)}>
  <Text style={styles.primaryButtonText}>Confirmar reserva</Text>
</Pressable>
```
- `<Pressable>` — Boton presionable. Al tocarlo ejecuta `onPress`.
- `onPress={() => setModalVisible(true)}` — Cambia el estado a `true`, lo que hace que el Modal aparezca.
- Es una arrow function anonima: se ejecuta solo cuando el usuario presiona, no al renderizar.

---

### Bloque 4: Modal de confirmacion

```jsx
<Modal
  visible={modalVisible}
  animationType="fade"
  transparent
  statusBarTranslucent
  onShow={() => console.log('Modal de confirmacion abierto')}
  onRequestClose={() => setModalVisible(false)}
>
```

| Prop | Valor | Explicacion |
|---|---|---|
| `visible={modalVisible}` | `true`/`false` | Si `modalVisible` es `true`, el Modal se muestra. Si es `false`, se oculta |
| `animationType="fade"` | `"fade"` | El Modal aparece con un efecto de desvanecimiento suave |
| `transparent` | `true` (shorthand) | El fondo del Modal es transparente, lo que permite crear un overlay oscuro personalizado |
| `statusBarTranslucent` | `true` (shorthand) | En Android, permite que el Modal cubra tambien la barra de estado |
| `onShow={...}` | funcion | Se ejecuta cuando el Modal termina de abrirse. Aqui imprime un mensaje en consola |
| `onRequestClose={...}` | funcion | Se ejecuta cuando Android pide cerrar (boton atras). Cambia `modalVisible` a `false` |

```jsx
<View style={styles.overlay}>
```
- Capa oscura semitransparente (`rgba(0,0,0,0.45)`) que cubre toda la pantalla detras de la tarjeta del Modal. Centra el contenido.

```jsx
<View style={styles.modalCard}>
  <Text style={styles.modalTitle}>Confirmar reserva</Text>
  <Text style={styles.modalText}>
    Deseas reservar la clase en modalidad {selectedMode}?
  </Text>
```
- Tarjeta blanca centrada con el titulo y la pregunta. `{selectedMode}` muestra dinamicamente la modalidad actual.

```jsx
<View style={styles.actionsRow}>
```
- Contenedor con `flexDirection: 'row'` que pone los botones lado a lado.

```jsx
<Pressable
  style={[styles.actionButton, styles.cancelButton]}
  onPress={() => setModalVisible(false)}
>
  <Text style={styles.cancelButtonText}>Cancelar</Text>
</Pressable>
```
- Boton "Cancelar". `style={[...]}` combina dos objetos de estilo en un array. Al presionar, solo cierra el Modal sin confirmar nada.

```jsx
<Pressable
  style={[styles.actionButton, styles.confirmButton]}
  onPress={() => {
    setReservationConfirmed(true);
    setModalVisible(false);
  }}
>
  <Text style={styles.confirmButtonText}>Confirmar</Text>
</Pressable>
```
- Boton "Confirmar". Ejecuta dos acciones: marca la reserva como confirmada (`true`) y cierra el Modal.

---

## 🟢 ERICK — Bottom Sheet (componente + uso)

### Bloque 5: Componente BottomSheet

```jsx
function BottomSheet({
  visible,
  onClose,
  title,
  height = 320,
  closeOnBackdropPress = true,
  children,
}) {
```
- Funcion que declara un componente reutilizable. Recibe props por destructuring `{}`.

| Prop | Tipo | Default | Explicacion |
|---|---|---|---|
| `visible` | boolean | — | Controla si el Bottom Sheet se muestra |
| `onClose` | function | — | Funcion que se ejecuta para cerrarlo |
| `title` | string | — | Texto del encabezado del panel |
| `height` | number | `320` | Altura del panel en pixeles |
| `closeOnBackdropPress` | boolean | `true` | Si al tocar fuera del panel se cierra |
| `children` | React nodes | — | Contenido que se coloca dentro (los botones de opcion) |

```jsx
const translateY = useRef(new Animated.Value(height)).current;
```
- `useRef(...)` — Crea una referencia persistente que no se reinicia entre renders.
- `new Animated.Value(height)` — Crea un valor animable que empieza en `height` (320). Esto significa que el panel empieza "abajo" (fuera de la pantalla).
- `.current` — Accede al valor almacenado en la ref.

```jsx
useEffect(() => {
  Animated.timing(translateY, {
    toValue: visible ? 0 : height,
    duration: visible ? 250 : 200,
    useNativeDriver: true,
  }).start();
}, [height, translateY, visible]);
```
- `useEffect` se ejecuta cada vez que cambian las dependencias `[height, translateY, visible]`.
- `Animated.timing(...)` — Crea una animacion que cambia `translateY` gradualmente.
- `toValue: visible ? 0 : height` — Si `visible` es `true`, mueve a `0` (aparece). Si es `false`, mueve a `height` (desaparece abajo).
- `duration` — Cuanto dura la animacion en milisegundos. Abrir es ligeramente mas lento (250ms) que cerrar (200ms).
- `useNativeDriver: true` — Ejecuta la animacion en el hilo nativo, mas fluida.
- `.start()` — Inicia la animacion.

```jsx
<Modal
  visible={visible}
  transparent
  animationType="none"
  statusBarTranslucent
  onRequestClose={onClose}
>
```
- El Bottom Sheet usa `Modal` como contenedor para aparecer encima de todo.
- `animationType="none"` — No usa la animacion del Modal porque la animacion la hace `Animated` manualmente.
- `onRequestClose={onClose}` — Al presionar "atras" en Android, ejecuta la funcion `onClose` que le paso el padre.

```jsx
<View style={styles.sheetOverlay}>
```
- Contenedor que ocupa toda la pantalla con `justifyContent: 'flex-end'` para que el panel quede abajo.

```jsx
<Pressable
  style={styles.sheetBackdrop}
  onPress={closeOnBackdropPress ? onClose : undefined}
/>
```
- Fondo oscuro que cubre toda la pantalla (`absoluteFillObject`). Si `closeOnBackdropPress` es `true`, al tocarlo se cierra el sheet. El `/>`  indica que es un componente autocerrado (sin hijos).

```jsx
<Animated.View
  style={[
    styles.sheetContainer,
    { height, transform: [{ translateY }] },
  ]}
>
```
- `Animated.View` — Version de `View` que soporta valores animados.
- `style={[...]}` — Combina estilos estaticos con dinamicos.
- `{ height }` — Shorthand de `{ height: height }`. Define la altura del panel.
- `transform: [{ translateY }]` — Aplica la transformacion vertical animada. Cuando `translateY` es `0`, el panel esta visible. Cuando es `320`, esta fuera de pantalla.

```jsx
<View style={styles.sheetHandle} />
```
- Barrita gris decorativa en la parte superior del panel (44px de ancho, 5px de alto, bordes redondeados). Indica visualmente que se puede arrastrar (en esta version educativa no se arrastra realmente).

```jsx
<Text style={styles.sheetTitle}>{title}</Text>
{children}
```
- Muestra el titulo ("Elige modalidad") y renderiza todo lo que se pase como contenido hijo.

---

### Bloque 6: Uso del BottomSheet en la pantalla

```jsx
<BottomSheet
  visible={sheetVisible}
  onClose={() => setSheetVisible(false)}
  title="Elige modalidad"
  height={330}
>
```
- Llama al componente `BottomSheet` pasandole las props.
- `visible={sheetVisible}` — Se muestra solo si `sheetVisible` es `true`.
- `onClose` — Cuando se cierra, cambia `sheetVisible` a `false`.

```jsx
<Pressable style={styles.optionButton} onPress={() => selectMode('Presencial')}>
  <Text style={styles.optionTitle}>Presencial</Text>
  <Text style={styles.optionText}>Asiste al salon asignado.</Text>
</Pressable>
```
- Cada `Pressable` es una opcion. Al tocarla, ejecuta `selectMode('Presencial')` (funcion de Alan).
- Tiene dos textos: el nombre de la opcion (negrita) y una descripcion corta (gris).
- Lo mismo se repite para "En linea" y "Grabacion" cambiando el texto y el argumento.

**Boton que abre el Bottom Sheet (tambien de Erick):**

```jsx
<Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
  <Text style={styles.secondaryButtonText}>Elegir modalidad</Text>
</Pressable>
```
- Boton con borde azul y fondo blanco. Al presionarlo, `setSheetVisible(true)` abre el Bottom Sheet.

---

## 🟠 ALAN — State, integracion, estilos y cierre

### Bloque: Funcion selectMode

```jsx
function selectMode(mode) {
  setSelectedMode(mode);
  setReservationConfirmed(false);
  setSheetVisible(false);
}
```
- `mode` — Parametro que recibe el nombre de la modalidad seleccionada (`'Presencial'`, `'En linea'` o `'Grabacion'`).
- `setSelectedMode(mode)` — Guarda la nueva modalidad en el estado.
- `setReservationConfirmed(false)` — Reinicia la confirmacion porque cambiar de modalidad invalida una confirmacion anterior.
- `setSheetVisible(false)` — Cierra el Bottom Sheet despues de elegir.

Estas tres lineas demuestran un patron comun en React: **multiples cambios de estado en una sola accion**.

### Bloque: StatusBar

```jsx
<StatusBar style="auto" />
```
- Componente de Expo que ajusta el color de la barra de estado (hora, bateria, señal) automaticamente segun el tema claro u oscuro.

### Bloque: Estilos (StyleSheet)

```jsx
const styles = StyleSheet.create({ ... });
```

`StyleSheet.create` optimiza los estilos para React Native. A diferencia de CSS web, aqui se usa camelCase (`fontSize` en vez de `font-size`).

**Estilos de la pantalla principal:**

| Estilo | Propiedades clave | Explicacion |
|---|---|---|
| `container` | `flex: 1`, `padding: 24` | Ocupa toda la pantalla, centra contenido, fondo gris claro |
| `title` | `fontSize: 28`, `fontWeight: '700'` | Titulo grande en negrita |
| `subtitle` | `fontSize: 15`, `color: '#5f6b7a'` | Subtitulo mas pequeño y gris |

**Estilos de la tarjeta:**

| Estilo | Propiedades clave | Explicacion |
|---|---|---|
| `card` | `backgroundColor: '#fff'`, `borderRadius: 8` | Tarjeta blanca con bordes redondeados y borde sutil |
| `cardTitle` | `fontWeight: '700'` | Nombre de la clase en negrita |
| `cardText` | `color: '#3f4a5a'` | Texto de detalle en gris oscuro |

**Estilos de botones:**

| Estilo | Explicacion |
|---|---|
| `primaryButton` | Fondo azul (`#1f6feb`), texto blanco. Boton de accion principal |
| `secondaryButton` | Fondo blanco, borde azul. Boton de accion secundaria |

**Estilos del Modal:**

| Estilo | Explicacion |
|---|---|
| `overlay` | Capa oscura semitransparente que cubre toda la pantalla |
| `modalCard` | Tarjeta blanca centrada donde va el contenido del Modal |
| `actionsRow` | `flexDirection: 'row'` pone los botones en fila horizontal |
| `cancelButton` | Fondo gris claro para el boton cancelar |
| `confirmButton` | Fondo azul para el boton confirmar |

**Estilos del Bottom Sheet:**

| Estilo | Explicacion |
|---|---|
| `sheetOverlay` | `justifyContent: 'flex-end'` empuja el panel hacia abajo |
| `sheetBackdrop` | `absoluteFillObject` cubre toda la pantalla con fondo oscuro |
| `sheetContainer` | Panel blanco con esquinas superiores redondeadas (`borderTopLeftRadius: 18`) |
| `sheetHandle` | Barrita gris centrada de 44x5 px, indica arrastre visual |
| `optionButton` | Cada opcion tiene borde, padding y fondo gris muy claro |

---

## Resumen de distribucion

| Integrante | Que le toca | Pasos |
|---|---|---|
| **Fer** | Importaciones, estados, estructura visual, boton de confirmar, Modal completo | Pasos 1, 2, 3, 4 |
| **Erick** | Componente BottomSheet, animacion, boton de elegir modalidad, uso del BottomSheet con opciones | Pasos 5, 6 |
| **Alan** | Funcion `selectMode`, StatusBar, todos los estilos, integracion del estado con la UI | Estilos + integracion |
