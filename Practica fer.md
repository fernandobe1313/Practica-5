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