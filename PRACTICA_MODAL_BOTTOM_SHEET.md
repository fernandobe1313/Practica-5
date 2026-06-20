# Practica guiada: Modal y Bottom Sheet en React Native

Proyecto objetivo: `miapp2`

Archivo recomendado para implementar despues: `miapp2/screens/ModalScreen.js`

Duracion total estimada: 40 minutos

Participantes: 3 personas

> Nota importante: este documento solo disena la practica. No modifica ningun archivo de `miapp2`. Cuando el equipo decida implementarla, el mejor lugar es `miapp2/screens/ModalScreen.js`, porque ese archivo ya existe y esta reservado para esta practica.

---

## 1. Objetivo general de la practica (Alan) tambien es el que presentara al principio a nosotros y dará la bienvenida a la clase.

Al terminar la practica, el estudiante debe poder:

1. Explicar que es un `Modal` en React Native y para que se usa.
2. Controlar la visibilidad de un `Modal` usando `useState`.
3. Usar props comunes de `Modal`: `visible`, `animationType`, `transparent`, `onRequestClose`, `onShow` y `onDismiss`.
4. Entender que React Native trae `Modal` como componente nativo, pero no trae un componente `BottomSheet` oficial dentro de `react-native`.
5. Construir un Bottom Sheet sencillo usando componentes disponibles en el proyecto actual: `Modal`, `Animated`, `View`, `Text`, `Pressable` y `StyleSheet`.
6. Controlar el estado del Bottom Sheet con `useState` y animarlo con `Animated.Value`.
7. Diferenciar cuando conviene usar un Modal y cuando conviene usar un Bottom Sheet.

---

## 2. Contexto del proyecto `miapp2` (Alan)

El proyecto `miapp2` usa actualmente:

- `expo`
- `react`
- `react-native`
- `react-native-web`
- `expo-status-bar`

No tiene instalada una libreria especializada como `@gorhom/bottom-sheet`. Por eso, para una practica guiada de 40 minutos, lo mas recomendable es:

- Usar el componente nativo `Modal` de React Native.
- Crear un Bottom Sheet educativo usando `Modal` + `Animated`.
- No instalar dependencias nuevas durante la practica, para evitar perder tiempo en configuraciones.

### Entonces, donde se debe hacer la practica? (Alan)

La practica se debe implementar en:

```txt
miapp2/screens/ModalScreen.js
```

Ese archivo ya existe y actualmente solo muestra un texto. Es ideal porque:

- El nombre coincide con el tema.
- Mantiene la practica separada de otras pantallas.
- Permite que el menu de la app apunte a esa pantalla si ya se esta usando `MenuScreen`.
- Evita tocar otros componentes del proyecto.

---

## 3. Investigacion teorica: Modal (Fer)

### Que es un Modal? (Fer)

Un `Modal` es una interfaz que aparece por encima de la pantalla actual. Sirve para interrumpir temporalmente el flujo normal y pedir una accion, mostrar informacion importante o confirmar una decision.

En React Native, `Modal` es un componente oficial incluido en `react-native`. No se instala aparte.

Ejemplos comunes:

- Confirmar que el usuario quiere eliminar algo.
- Mostrar detalles de un producto.
- Presentar un formulario corto.
- Mostrar un aviso importante.
- Pedir permiso antes de continuar.

### Cuando usar un Modal? (Fer)

Conviene usar un Modal cuando:

- La informacion necesita atencion inmediata.
- El usuario debe tomar una decision antes de seguir.
- La accion es importante o irreversible.
- Se quiere enfocar al usuario en una tarea corta.

Ejemplo:

> "Estas seguro de que deseas eliminar esta tarjeta?"

### Cuando no usar un Modal? (Fer)

No conviene usarlo cuando:

- La informacion no es urgente.
- El contenido es largo y podria estar en otra pantalla.
- Se abusa de ventanas emergentes y se vuelve molesto.
- El usuario necesita comparar informacion con la pantalla anterior.

### Props mas usadas de Modal (Fer)

#### `visible`

Controla si el Modal se muestra o no.

```jsx
<Modal visible={modalVisible}>
```

Normalmente se conecta con un estado:

```jsx
const [modalVisible, setModalVisible] = useState(false);
```

Si `modalVisible` es `true`, el Modal aparece. Si es `false`, desaparece.

#### `animationType`

Define la animacion de entrada y salida.

Valores comunes:

- `none`: aparece sin animacion.
- `slide`: entra desde abajo.
- `fade`: aparece con desvanecimiento.

Ejemplo:

```jsx
<Modal animationType="fade">
```

Para una confirmacion, `fade` se siente natural. Para una pantalla que sube desde abajo, `slide` comunica mejor movimiento.

#### `transparent`

Permite que el Modal tenga fondo transparente, de modo que podamos disenar un overlay oscuro atras.

```jsx
<Modal transparent={true}>
```

Esto es muy usado para crear cuadros centrados:

```jsx
<View style={styles.overlay}>
  <View style={styles.modalCard}>
    <Text>Contenido del modal</Text>
  </View>
</View>
```

#### `onRequestClose`

Funcion que se ejecuta cuando el sistema solicita cerrar el Modal. En Android es especialmente importante porque se relaciona con el boton fisico o gesto de "atras".

```jsx
<Modal onRequestClose={() => setModalVisible(false)}>
```

Buena practica: siempre ponerla cuando uses `Modal`.

#### `onShow`

Funcion que se ejecuta cuando el Modal ya se mostro.

```jsx
<Modal onShow={() => console.log('Modal abierto')}>
```

Puede servir para:

- Registrar eventos.
- Preparar datos.
- Limpiar campos.
- Mostrar mensajes.

#### `onDismiss`

Funcion que se ejecuta cuando el Modal ya se cerro. En la documentacion oficial se marca como prop de iOS.

```jsx
<Modal onDismiss={() => console.log('Modal cerrado')}>
```

#### `presentationStyle`

Prop usada principalmente en iOS para controlar el estilo de presentacion:

- `fullScreen`
- `pageSheet`
- `formSheet`
- `overFullScreen`

Para una practica basica, no es obligatorio usarla, pero si conviene mencionarla.

#### `statusBarTranslucent`

Prop de Android. Permite que el Modal se dibuje debajo de la barra de estado.

```jsx
<Modal statusBarTranslucent>
```

Es util cuando se quiere que el overlay cubra toda la pantalla.

--------------------------------------------------------------------------------------------------------------------------------------

## 4. Investigacion teorica: Bottom Sheet (Erick)

### Que es un Bottom Sheet? (Erick)

Un Bottom Sheet es un panel que aparece desde la parte inferior de la pantalla. A diferencia del Modal centrado, el Bottom Sheet conserva mas contexto visual de la pantalla principal.

Ejemplos comunes:

- Acciones rapidas.
- Opciones de compartir.
- Filtros.
- Seleccion de metodo de pago.
- Detalles rapidos de un elemento.
- Menu contextual.

### Bottom Sheet es nativo en React Native? (Erick)

React Native no trae un componente oficial llamado `BottomSheet` dentro de `react-native`.

Hay tres formas comunes de trabajar con Bottom Sheets:

1. Construir uno sencillo con componentes nativos:
   - `Modal`
   - `Animated`
   - `Pressable`
   - `View`

2. Usar una libreria especializada:
   - `@gorhom/bottom-sheet`
   - Es de las opciones mas usadas en proyectos reales.

3. Usar componentes de una libreria UI:
   - React Native Paper
   - NativeBase
   - Tamagui
   - UI Kitten

Para esta practica, se recomienda la opcion 1 porque el proyecto no tiene dependencias extra.

### Diferencia entre Modal y Bottom Sheet (Erick)

| Caracteristica | Modal | Bottom Sheet |
|---|---|---|
| Posicion | Normalmente centrado o pantalla completa | Pegado a la parte inferior |
| Nivel de interrupcion | Alto | Medio |
| Uso ideal | Confirmaciones, alertas importantes, formularios cortos | Opciones, filtros, acciones secundarias |
| Contexto visible | Menor | Mayor |
| Sensacion de navegacion | Interrumpe | Complementa |

### Props comunes si se usa una libreria como `@gorhom/bottom-sheet` (Erick)

Aunque en esta practica se construira un Bottom Sheet manual, conviene conocer las props que suelen existir en una libreria real:

- `snapPoints`: alturas o porcentajes donde el panel puede detenerse, por ejemplo `['25%', '50%']`.
- `index`: posicion inicial del sheet; algunas librerias usan `-1` para cerrado.
- `enablePanDownToClose`: permite cerrar arrastrando hacia abajo.
- `onChange`: detecta cuando cambia la posicion del sheet.
- `backgroundStyle`: estilos del fondo del panel.
- `handleStyle`: estilos del area superior donde se arrastra.
- `handleIndicatorStyle`: estilos de la pequena barra visual.
- `keyboardBehavior`: comportamiento cuando aparece el teclado.

En nuestra version educativa, convertiremos esas ideas a props propias:

- `visible`
- `onClose`
- `title`
- `height`
- `children`
- `closeOnBackdropPress`

--------------------------------------------------------------------------------------------------------------------------------------------------

## 5. Concepto clave: State con `useState` (Alan)

En React, el estado permite que un componente recuerde informacion entre renders. En esta practica se usara para controlar:

- Si el Modal esta abierto o cerrado.
- Si el Bottom Sheet esta abierto o cerrado.
- Que opcion selecciono el usuario.

Ejemplo:

```jsx
const [modalVisible, setModalVisible] = useState(false);
const [sheetVisible, setSheetVisible] = useState(false);
const [selectedOption, setSelectedOption] = useState('Tarjeta');
```

Lectura:

- `modalVisible` es el valor actual.
- `setModalVisible` es la funcion para cambiarlo.
- `false` es el valor inicial.

Cuando se hace:

```jsx
setModalVisible(true);
```

React vuelve a renderizar el componente y el Modal aparece.

Cuando se hace:

```jsx
setModalVisible(false);
```

React vuelve a renderizar y el Modal se oculta.

### Tip importante (Alan)

No se debe cambiar el estado directamente.

Incorrecto:

```jsx
modalVisible = true;
```

Correcto:

```jsx
setModalVisible(true);
```

------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 6. Practica guiada (Alan y Fer y Erick)

### Tema de ejemplo (Fer) solo es explicar lo que se hará

Se construira una pantalla de "Reserva de clase" con dos interacciones:

1. Un `Modal` para confirmar la reserva.
2. Un `Bottom Sheet` para elegir el metodo de asistencia.

La pantalla tendra:

- Titulo.
- Datos de una clase.
- Boton para abrir el Bottom Sheet.
- Boton para abrir el Modal de confirmacion.
- Texto que muestra la opcion seleccionada.

### Resultado esperado (Erick) solo es explicar lo que saldrá al final de la práctica

El usuario podra:

1. Ver una clase disponible.
2. Abrir un Bottom Sheet.
3. Elegir entre:
   - Presencial
   - En linea
   - Grabacion
4. Abrir un Modal de confirmacion.
5. Confirmar o cancelar la reserva.

---

## 7. Distribucion del tiempo (Alan y Fer y Erick)

### Minutos 0-5: Introduccion (Fer y Alan y Erick) esta parte es la del principio de la presentanción por lo tanto nos la saltamos

Responsable: Persona 1

Actividades:

- Explicar que es un Modal. (esto lo hizo fer)
- Explicar que es un Bottom Sheet. (esto lo hizo erick)
- Decir que se implementara en `ModalScreen.js`. (esto lo hizo alan)
- Aclarar que Bottom Sheet no viene como componente nativo oficial de React Native, pero se puede construir con componentes nativos. (esto lo hizo erick)

### Minutos 5-15: Modal nativo (fer)

Responsable: Persona 1 

Actividades:

- Importar `Modal`.
- Crear estado `modalVisible`.
- Agregar boton para abrirlo.
- Explicar props:
  - `visible`
  - `animationType`
  - `transparent`
  - `onRequestClose`
  - `onShow`
- Crear botones de cancelar y confirmar.

### Minutos 15-28: Bottom Sheet educativo (Erick)

Responsable: Persona 2

Actividades:

- Crear estado `sheetVisible`.
- Crear componente interno `BottomSheet`.
- Usar `Modal` como base.
- Usar `Animated.Value` para simular entrada desde abajo.
- Explicar props del Bottom Sheet creado:
  - `visible`
  - `onClose`
  - `title`
  - `height`
  - `children`
  - `closeOnBackdropPress`

### Minutos 28-36: Integracion con State (Alan)

Responsable: Persona 3

Actividades:

- Crear estado `selectedMode`.
- Conectar opciones del Bottom Sheet con `setSelectedMode`.
- Mostrar en pantalla la opcion seleccionada.
- Confirmar la reserva desde el Modal.
- Explicar como el estado actualiza la UI.

### Minutos 36-40: Cierre y preguntas (Fer y Alan y Erick)

Responsables: Personas 1, 2 y 3

Actividades:

- Comparar Modal vs Bottom Sheet.
- Mencionar buenas practicas.
- Mostrar posibles mejoras.
- Resolver dudas rapidas.

---

## 8. Division equitativa entre 3 personas esta parte es la explicacion de las diapositivas por lo tanto nos la saltamos

### Persona 1: Modal nativo y teoria inicial

Tiempo aproximado: 13 minutos

Responsabilidades:

- Presentar la introduccion.
- Explicar para que sirve `Modal`.
- Implementar el Modal de confirmacion.
- Explicar las props principales del Modal.
- Explicar `modalVisible` y `setModalVisible`.

Frases clave:

- "El Modal aparece por encima de la pantalla actual."
- "La prop `visible` se conecta directamente con un estado booleano."
- "En Android, `onRequestClose` es muy importante para cerrar con el boton de atras."

### Persona 2: Bottom Sheet

Tiempo aproximado: 13 minutos

Responsabilidades:

- Explicar que React Native no trae `BottomSheet` oficial.
- Crear el componente `BottomSheet` con `Modal` y `Animated`.
- Explicar la animacion de entrada desde abajo.
- Explicar las props creadas para el componente.

Frases clave:

- "Un Bottom Sheet es un panel inferior que muestra opciones sin cambiar completamente de pantalla."
- "Estamos usando `Modal` como contenedor y `Animated` para simular el movimiento."
- "En proyectos reales se podria usar `@gorhom/bottom-sheet`, pero aqui lo hacemos sin instalar dependencias."

### Persona 3: State, integracion y cierre

Tiempo aproximado: 14 minutos

Responsabilidades:

- Explicar `useState`.
- Conectar la seleccion del Bottom Sheet con la pantalla.
- Explicar `selectedMode`.
- Mostrar como se confirma la reserva.
- Cerrar con comparacion y buenas practicas.

Frases clave:

- "El estado es lo que permite que la interfaz reaccione a las acciones del usuario."
- "Cuando llamamos `setSelectedMode`, React vuelve a pintar la pantalla con el nuevo valor."
- "Usamos Modal para confirmar y Bottom Sheet para escoger opciones."

---------------------------------------------------------------------------------------------------------------------

## 9. Paso a paso de implementacion (esta es de la cual nos basaremos para realizar la presentacion, no es para copiar ni mucho menos pero si para tener una guia de que debemos decir en cada paso cuando estemos programando o explicando)

> Esta seccion esta pensada para que el equipo la siga durante la exposicion. No se debe pegar todo de golpe al inicio; conviene construirlo por partes para que se vea el aprendizaje.

### Paso 1: Preparar imports (Fer)

En `miapp2/screens/ModalScreen.js`, se reemplazarian los imports iniciales por:

```jsx
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
```

Explicacion:

- `useState`: controla valores que cambian.
- `useRef`: guarda una referencia que no se reinicia en cada render.
- `useEffect`: ejecuta codigo cuando cambia una dependencia.
- `Animated`: permite animar valores.
- `Modal`: componente nativo para mostrar contenido encima de la pantalla.
- `Pressable`: componente para botones o zonas presionables.

### Paso 2: Crear estados principales (Fer)

Dentro de `ModalScreen`:

```jsx
const [modalVisible, setModalVisible] = useState(false);
const [sheetVisible, setSheetVisible] = useState(false);
const [selectedMode, setSelectedMode] = useState('Presencial');
const [reservationConfirmed, setReservationConfirmed] = useState(false);
```

Explicacion:

- `modalVisible`: abre o cierra el Modal.
- `sheetVisible`: abre o cierra el Bottom Sheet.
- `selectedMode`: guarda la opcion elegida.
- `reservationConfirmed`: muestra si la reserva fue confirmada.

### Paso 3: Crear estructura visual base (Fer)

```jsx
return (
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

    <Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
      <Text style={styles.secondaryButtonText}>Elegir modalidad</Text>
    </Pressable>

    <Pressable style={styles.primaryButton} onPress={() => setModalVisible(true)}>
      <Text style={styles.primaryButtonText}>Confirmar reserva</Text>
    </Pressable>

    <StatusBar style="auto" />
  </View>
);
```

Punto didactico:

- Los botones no abren nada por magia.
- Los botones cambian estado.
- El estado hace que aparezcan componentes.

### Paso 4: Agregar Modal de confirmacion (Fer)

Debajo de los botones, dentro del `return`, se agrega:

```jsx
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
```

Explicacion de props:

- `visible={modalVisible}`: muestra u oculta el Modal.
- `animationType="fade"`: aparece con desvanecimiento.
- `transparent`: permite ver el overlay personalizado.
- `statusBarTranslucent`: ayuda a cubrir toda la pantalla en Android.
- `onShow`: se ejecuta al abrir.
- `onRequestClose`: permite cerrar cuando el sistema lo solicita.

### Paso 5: Crear componente BottomSheet (Erick)

Debajo de `ModalScreen`, antes de los estilos, se puede crear:

```jsx
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
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
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
```

Explicacion:

- El Bottom Sheet usa `Modal` para aparecer encima de la pantalla.
- `translateY` controla que tan abajo esta el panel.
- Cuando `visible` es `true`, `translateY` va a `0`.
- Cuando `visible` es `false`, `translateY` vuelve a `height`.
- `children` permite meter cualquier contenido dentro del Bottom Sheet.

### Paso 6: Usar el BottomSheet en la pantalla (Erick)

Dentro del `return`, despues del Modal de confirmacion, se agrega:

```jsx
<BottomSheet
  visible={sheetVisible}
  onClose={() => setSheetVisible(false)}
  title="Elige modalidad"
  height={330}
>
  <Pressable
    style={styles.optionButton}
    onPress={() => {
      setSelectedMode('Presencial');
      setReservationConfirmed(false);
      setSheetVisible(false);
    }}
  >
    <Text style={styles.optionTitle}>Presencial</Text>
    <Text style={styles.optionText}>Asiste al salon asignado.</Text>
  </Pressable>

  <Pressable
    style={styles.optionButton}
    onPress={() => {
      setSelectedMode('En linea');
      setReservationConfirmed(false);
      setSheetVisible(false);
    }}
  >
    <Text style={styles.optionTitle}>En linea</Text>
    <Text style={styles.optionText}>Recibe el enlace de videollamada.</Text>
  </Pressable>

  <Pressable
    style={styles.optionButton}
    onPress={() => {
      setSelectedMode('Grabacion');
      setReservationConfirmed(false);
      setSheetVisible(false);
    }}
  >
    <Text style={styles.optionTitle}>Grabacion</Text>
    <Text style={styles.optionText}>Consulta la clase despues.</Text>
  </Pressable>
</BottomSheet>
```

Punto didactico:

- Cada opcion actualiza `selectedMode`.
- Tambien reinicia `reservationConfirmed` a `false`.
- Luego cierra el Bottom Sheet.

Esto muestra un uso real de state:

```jsx
setSelectedMode('En linea');
setReservationConfirmed(false);
setSheetVisible(false);
```

--------------------------------------------------------------------------------------------------------------------------------------

## 10. Codigo final sugerido para `ModalScreen.js` (este solamente es para darnos cuenta y guiarnos de como debe ser el codigo final)

> Este codigo es una propuesta completa para implementar despues. No fue aplicado al proyecto.

```jsx
/* Zona1: importaciones de componentes de archivos*/
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

/* Zona2: Main - hogar de los componentes*/
export default function ModalScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState('Presencial');
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  function selectMode(mode) {
    setSelectedMode(mode);
    setReservationConfirmed(false);
    setSheetVisible(false);
  }

  return (
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

      <Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
        <Text style={styles.secondaryButtonText}>Elegir modalidad</Text>
      </Pressable>

      <Pressable style={styles.primaryButton} onPress={() => setModalVisible(true)}>
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

/* Zona3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fb',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#18202f',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#5f6b7a',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#18202f',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#3f4a5a',
    marginBottom: 6,
  },
  primaryButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#1f6feb',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1f6feb',
    fontSize: 16,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 22,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#18202f',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#3f4a5a',
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#edf1f7',
  },
  confirmButton: {
    backgroundColor: '#1f6feb',
  },
  cancelButtonText: {
    color: '#3f4a5a',
    fontWeight: '700',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  sheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#c7ced8',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#18202f',
    marginBottom: 14,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#dfe4ea',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f9fafc',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#18202f',
    marginBottom: 4,
  },
  optionText: {
    fontSize: 14,
    color: '#5f6b7a',
  },
});
```

---

## 11. Explicacion de las props usadas en la practica 

### Props usadas en `Modal`

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

| Prop | Tipo | Para que sirve | Como se usa en la practica |
|---|---|---|---|
| `visible` | boolean | Muestra u oculta el Modal | Depende de `modalVisible` |
| `animationType` | string | Define la animacion | Se usa `fade` |
| `transparent` | boolean | Permite fondo transparente | Se usa para crear overlay |
| `statusBarTranslucent` | boolean | Cubre mejor la pantalla en Android | Se activa |
| `onShow` | function | Ejecuta codigo al abrir | Manda mensaje a consola |
| `onRequestClose` | function | Cierra al usar boton atras/sistema | Cambia estado a `false` |

### Props creadas para `BottomSheet`

```jsx
<BottomSheet
  visible={sheetVisible}
  onClose={() => setSheetVisible(false)}
  title="Elige modalidad"
  height={330}
>
```

| Prop | Tipo | Para que sirve | Como se usa |
|---|---|---|---|
| `visible` | boolean | Muestra u oculta el Bottom Sheet | Depende de `sheetVisible` |
| `onClose` | function | Funcion para cerrarlo | Ejecuta `setSheetVisible(false)` |
| `title` | string | Titulo del panel | Muestra "Elige modalidad" |
| `height` | number | Altura del panel | Usa `330` |
| `closeOnBackdropPress` | boolean | Permite cerrar tocando afuera | Por defecto `true` |
| `children` | React nodes | Contenido interno | Botones de modalidad |

### State usado en la practica

| Estado | Valor inicial | Funcion que lo cambia | Uso |
|---|---|---|---|
| `modalVisible` | `false` | `setModalVisible` | Abrir/cerrar Modal |
| `sheetVisible` | `false` | `setSheetVisible` | Abrir/cerrar Bottom Sheet |
| `selectedMode` | `'Presencial'` | `setSelectedMode` | Mostrar modalidad elegida |
| `reservationConfirmed` | `false` | `setReservationConfirmed` | Mostrar si la reserva esta confirmada |

---

## 12. Tips para explicar durante la practica

### Tip 1: Un Modal no es una pantalla nueva

Aunque puede verse como una pantalla, en realidad aparece encima de la pantalla actual.

### Tip 2: `visible` casi siempre se controla con state

La combinacion mas comun es:

```jsx
const [visible, setVisible] = useState(false);
```

Y luego:

```jsx
<Modal visible={visible}>
```

### Tip 3: Siempre piensa como se cierra

Un error comun es abrir el Modal y no dejar una forma clara de cerrarlo.

Debe haber al menos una de estas salidas:

- Boton cancelar.
- Boton cerrar.
- Tocar fuera.
- `onRequestClose`.

### Tip 4: Bottom Sheet no siempre reemplaza al Modal

Si la accion es critica, usa Modal.

Si son opciones rapidas, usa Bottom Sheet.

### Tip 5: El estado debe tener nombres claros

Mejor:

```jsx
const [modalVisible, setModalVisible] = useState(false);
```

Peor:

```jsx
const [x, setX] = useState(false);
```

### Tip 6: El estado derivado debe cuidarse

En la practica, si el usuario cambia la modalidad despues de confirmar, se reinicia:

```jsx
setReservationConfirmed(false);
```

Esto evita que la pantalla diga "Confirmada" con una modalidad que todavia no fue confirmada.

---

## 13. Posibles errores y como resolverlos

### Error: El Modal aparece siempre abierto

Causa probable:

```jsx
const [modalVisible, setModalVisible] = useState(true);
```

Solucion:

```jsx
const [modalVisible, setModalVisible] = useState(false);
```

### Error: El boton no abre el Modal

Revisar que el `onPress` cambie el estado:

```jsx
onPress={() => setModalVisible(true)}
```

### Error: El Modal no cierra en Android

Revisar `onRequestClose`:

```jsx
onRequestClose={() => setModalVisible(false)}
```

### Error: El Bottom Sheet no se ve

Revisar:

- Que `visible={sheetVisible}` este conectado.
- Que el boton haga `setSheetVisible(true)`.
- Que el `sheetContainer` tenga altura.
- Que el `Modal` tenga `transparent`.

### Error: La animacion no se nota

Revisar:

```jsx
useNativeDriver: true
```

Y que se este animando una propiedad compatible, como `transform`.

---

## 14. Preguntas para hacer al grupo

1. Que prop del Modal controla si aparece o desaparece?
2. Por que usamos `useState` en vez de una variable normal?
3. Que diferencia visual hay entre `fade` y `slide`?
4. Por que `onRequestClose` es importante?
5. En que caso usarian un Modal y en que caso un Bottom Sheet?
6. Que pasa si cambiamos `selectedMode`?
7. Por que reiniciamos `reservationConfirmed` al cambiar modalidad?

--------------------------------------------------------------------------------------------

## 15. Guion de practica en video

> No se genera video directamente desde este entorno, pero este guion esta preparado para grabarlo como presentacion de apoyo. Puede usarse con OBS, celular, Zoom, Meet o la grabadora de pantalla.

### Video: "Modal y Bottom Sheet en React Native"

Duracion sugerida del video: 8 a 12 minutos

#### Escena 1: Presentacion del tema (Alan)

Tiempo: 0:00 - 0:45

Narrador: Persona 1

Guion:

"Hola, en esta practica vamos a trabajar con dos patrones muy usados en aplicaciones moviles: Modal y Bottom Sheet. Usaremos React Native dentro del proyecto `miapp2`, especificamente en el archivo `ModalScreen.js`. La idea es crear una pantalla de reserva de clase donde podamos confirmar una accion con un Modal y elegir una modalidad con un Bottom Sheet."

Mostrar en pantalla:

- Estructura del proyecto.
- Archivo `miapp2/screens/ModalScreen.js`.

#### Escena 2: Que es un Modal (Fer)

Tiempo: 0:45 - 2:00

Narrador: Persona 1

Guion:

"Un Modal es una ventana que aparece encima de la pantalla actual. Se usa cuando necesitamos que el usuario preste atencion a una accion especifica, por ejemplo confirmar una reserva. En React Native, Modal viene incluido dentro de `react-native`, asi que no necesitamos instalar nada."

Mostrar en pantalla:

```jsx
import { Modal } from 'react-native';
```

Continuacion:

"La prop mas importante es `visible`, porque define si el Modal se muestra o no. Esa prop normalmente se conecta con `useState`."

Mostrar:

```jsx
const [modalVisible, setModalVisible] = useState(false);
```

#### Escena 3: Implementacion del Modal (Fer)

Tiempo: 2:00 - 4:00

Narrador: Persona 1

Guion:

"Ahora agregamos un boton que cambia `modalVisible` a `true`. Cuando eso pasa, React vuelve a renderizar y el Modal aparece."

Mostrar:

```jsx
<Pressable onPress={() => setModalVisible(true)}>
  <Text>Confirmar reserva</Text>
</Pressable>
```

Luego:

"Dentro del Modal usamos `animationType='fade'`, `transparent` para personalizar el fondo, y `onRequestClose` para cerrarlo correctamente, especialmente en Android."

Mostrar:

```jsx
<Modal
  visible={modalVisible}
  animationType="fade"
  transparent
  onRequestClose={() => setModalVisible(false)}
>
```

#### Escena 4: Que es un Bottom Sheet (Erick)

Tiempo: 4:00 - 5:15

Narrador: Persona 2

Guion:

"Un Bottom Sheet es un panel que aparece desde la parte inferior de la pantalla. Es muy util para mostrar opciones rapidas, como elegir una modalidad, aplicar filtros o mostrar acciones secundarias. React Native no trae un componente Bottom Sheet oficial, asi que en esta practica lo construiremos usando Modal y Animated."

Mostrar:

```jsx
function BottomSheet({ visible, onClose, title, height, children }) {
  // ...
}
```

#### Escena 5: Animacion del Bottom Sheet (Erick)

Tiempo: 5:15 - 7:30

Narrador: Persona 2

Guion:

"Para simular que el panel sube desde abajo usamos `Animated.Value`. Cuando el Bottom Sheet esta cerrado, su posicion es igual a su altura. Cuando se abre, animamos ese valor hasta cero."

Mostrar:

```jsx
const translateY = useRef(new Animated.Value(height)).current;
```

Mostrar:

```jsx
Animated.timing(translateY, {
  toValue: visible ? 0 : height,
  duration: visible ? 250 : 200,
  useNativeDriver: true,
}).start();
```

Continuacion:

"Despues aplicamos ese valor en el estilo con `transform`."

Mostrar:

```jsx
transform: [{ translateY }]
```

#### Escena 6: State e integracion (Alan)

Tiempo: 7:30 - 9:30

Narrador: Persona 3

Guion:

"Ahora conectamos el Bottom Sheet con el estado `selectedMode`. Cada vez que el usuario toca una opcion, guardamos esa modalidad y cerramos el panel."

Mostrar:

```jsx
function selectMode(mode) {
  setSelectedMode(mode);
  setReservationConfirmed(false);
  setSheetVisible(false);
}
```

Continuacion:

"Esto demuestra una idea central de React: la interfaz depende del estado. Si cambia `selectedMode`, tambien cambia el texto que vemos en pantalla."

Mostrar:

```jsx
<Text>Modalidad: {selectedMode}</Text>
```

#### Escena 7: Comparacion final (Alan)

Tiempo: 9:30 - 10:45

Narradores: Personas 1, 2 y 3

Guion:

"Usamos Modal para confirmar una accion importante."

"Usamos Bottom Sheet para mostrar opciones rapidas desde la parte inferior."

"Y usamos State para controlar que se abre, que se cierra y que opcion selecciono el usuario."

Mostrar tabla:

```txt
Modal: confirmar, alertar, enfocar.
Bottom Sheet: opciones, filtros, acciones rapidas.
State: controlar la interfaz.
```

#### Escena 8: Cierre (Alan)

Tiempo: 10:45 - 11:30

Narrador: Persona 1

Guion:

"Con esto terminamos la practica. Como mejora, podriamos agregar gestos reales para arrastrar el Bottom Sheet, o instalar una libreria como `@gorhom/bottom-sheet` en un proyecto mas avanzado. Pero para esta practica, ya entendimos el funcionamiento base usando solo herramientas disponibles en React Native."

-------------------------------------------------------------------------------------------------------------------------------------------

## 16. Guion para exposicion presencial de 40 minutos

### Persona 1

Tiempo: 0:00 - 13:00

Guion:

"Buenos dias. Nuestra practica trata sobre Modal y Bottom Sheet en React Native. Vamos a trabajar en `miapp2`, en el archivo `ModalScreen.js`, porque ya esta creado para este tema.

Primero, un Modal es una ventana que aparece encima de la pantalla actual. Se usa cuando queremos que el usuario confirme algo o vea informacion importante. React Native ya incluye este componente dentro de `react-native`.

La prop mas importante es `visible`, porque controla si aparece o no. Para manejarla usamos `useState`. Por ejemplo, `modalVisible` empieza en `false`, y cuando presionamos un boton hacemos `setModalVisible(true)`.

Tambien usamos `animationType`, que puede ser `none`, `slide` o `fade`. En este caso usamos `fade`, porque queremos una confirmacion suave. Usamos `transparent` para poder crear nuestro fondo oscuro, y `onRequestClose` para cerrar correctamente en Android.

El Modal de nuestra practica sirve para confirmar una reserva de clase. Si el usuario confirma, cambiamos `reservationConfirmed` a `true`; si cancela, solo cerramos el Modal."

### Persona 2

Tiempo: 13:00 - 26:00

Guion:

"Ahora vamos con Bottom Sheet. Un Bottom Sheet es un panel que aparece desde abajo. Es muy comun en apps moviles porque permite mostrar opciones sin sacar completamente al usuario de la pantalla.

Algo importante es que React Native no trae un Bottom Sheet oficial como componente nativo. Existen librerias como `@gorhom/bottom-sheet`, pero nuestro proyecto no la tiene instalada. Por eso construiremos una version educativa usando `Modal` y `Animated`.

Creamos una funcion llamada `BottomSheet` que recibe props: `visible`, `onClose`, `title`, `height`, `closeOnBackdropPress` y `children`.

La prop `visible` indica si se muestra. `onClose` es la funcion para cerrar. `title` muestra el encabezado. `height` define la altura. `children` permite pasarle contenido, en este caso las opciones de modalidad.

Para la animacion usamos `Animated.Value`. Si el Bottom Sheet esta cerrado, lo mandamos hacia abajo usando su altura. Si esta abierto, lo movemos a cero. Esto da la sensacion de que sube desde la parte inferior."

### Persona 3

Tiempo: 26:00 - 40:00

Guion:

"Para cerrar, vamos a explicar como conectamos todo con State. Tenemos cuatro estados principales: `modalVisible`, `sheetVisible`, `selectedMode` y `reservationConfirmed`.

`modalVisible` abre o cierra el Modal. `sheetVisible` abre o cierra el Bottom Sheet. `selectedMode` guarda la modalidad elegida: presencial, en linea o grabacion. `reservationConfirmed` guarda si el usuario ya confirmo.

Cuando el usuario abre el Bottom Sheet y selecciona una opcion, usamos una funcion `selectMode`. Esa funcion actualiza `selectedMode`, reinicia la confirmacion a `false` y cierra el Bottom Sheet.

Esto demuestra que en React Native la pantalla responde al estado. No cambiamos el texto manualmente; cambiamos el estado, y React actualiza la interfaz.

Como conclusion: Modal es mejor para confirmar acciones importantes. Bottom Sheet es mejor para mostrar opciones rapidas. Y `useState` es la herramienta que nos permite controlar ambos componentes."

---

## 17. Fuentes consultadas

- React Native Docs, `Modal`, version 0.81: https://reactnative.dev/docs/0.81/modal
- React Native Docs, `Animated`, version 0.81: https://reactnative.dev/docs/0.81/animated
- React Docs, `useState`: https://react.dev/reference/react/useState
- React Native Bottom Sheet by Gorhom, props v5: https://gorhom.dev/react-native-bottom-sheet/props
- React Native Bottom Sheet by Gorhom, usage v5: https://gorhom.dev/react-native-bottom-sheet/usage

---

## 18. Recomendacion final para la implementacion

Para esta practica de clase, usar `miapp2/screens/ModalScreen.js`.

No recomiendo instalar `@gorhom/bottom-sheet` para esta practica de 40 minutos porque el proyecto actual no tiene configuradas sus dependencias necesarias. Para una clase introductoria, construir el Bottom Sheet con `Modal` y `Animated` permite entender mejor el concepto sin depender de configuracion externa.

Si despues quieren hacer una version mas profesional, entonces si se puede crear una segunda practica con:

- `@gorhom/bottom-sheet`
- `react-native-reanimated`
- `react-native-gesture-handler`

Pero esa version seria mejor para una practica avanzada.
