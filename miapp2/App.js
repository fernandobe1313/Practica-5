/* Zona1: importaciones de componentes de archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';

/* Zona2: Main - hogar de los componentes*/


export default function App() {
  return (
    <View style={styles.container}>

      <Perfil estiloExt={styles.tarjetaRoja} nombre="Fernando Daniel Bello García" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatri="9°" />

      <Perfil
        estiloExt={styles.terjetaVerde}
        nombre="Fernando Daniel Bello García"
        carrera="Desarrollo de Software"
        materia="Programación para Dispositivos Móviles"
        cuatri="7°"
      />

      <Perfil estiloExt={styles.tarjetaRoja} nombre="Fernando Daniel" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatri="9°" />


      <StatusBar style="auto" />

    </View>
  );
}


// export default function App() {
//   return (
//     <View style={styles.container}>

//       <Text> ---------------------------------------- Componente Propio Nativos --------------------------------------  </Text>

//       <Text>Repaso de componentes </Text>
//       <Perfil></Perfil>


//       <Image source={require('./assets/wave.png')} />
//       <Text>Hola mundo React Native</Text>

//       <Text> ---------------------------------------- Componente Propio Simple --------------------------------------  </Text>


//       <Saludo></Saludo>


//       <Text> ---------------------------------------- Componente Propio Compuesto--------------------------------------  </Text>


//       <Saludo2></Saludo2>

//       <StatusBar style="auto" />
//     </View>
//   );
// }

/* Zona3: Estilos y posicionamiento */
/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },

  tarjetaRoja: { backgroundColor: '#FF6B6B', },

  terjetaVerde: { backgroundColor: '#6BCB77', }
});








