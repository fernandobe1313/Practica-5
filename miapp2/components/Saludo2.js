import { View, Button, Image, Text } from "react-native";

export const Saludo2 = () => {
    return (
        <View>
            <Image source={require('../assets/wave.png')} />
            <Text>Soy un componente compuesto</Text>
            <Button tittle="Hola 203"> </Button>
        </View>
    )
}

