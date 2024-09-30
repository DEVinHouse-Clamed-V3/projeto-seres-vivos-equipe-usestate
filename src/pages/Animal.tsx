import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Alert, FlatList, Image } from "react-native";
import { globalStyles } from "../styles/global";

// Para rodar o servidor JSON Server, execute o comando abaixo no terminal:
// npx json-server --host 192.168.0.2 database.json -p 3000

type Animal = {
  id: string;
  name: string;
  description: string;
  nutrition: string;
  cellType: string;
  cellOrganization: string;
  reproduction: string;
  respiration: string;
  image: string;
};

const Animal = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.2:3000/animais")
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => {
        Alert.alert("Erro ao carregar os dados", error.message);
      });
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={animals}
        keyExtractor={(animal) => animal.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>

            <View style={styles.infoView}>
              <Text style={styles.title}>{item.name}</Text>
            </View>

            <View style={styles.infoView}>
              <Text style={styles.text}>{item.description}</Text>
            </View>

            <View style={styles.infoView}>
              <Text style={styles.bold}>Nutrição: </Text>
              <Text style={styles.text}>{item.nutrition}</Text>
            </View>

            <View style={styles.infoView}>
              <Text style={styles.bold}>Tipo de Célula: </Text>
              <Text style={styles.text}>{item.cellType}</Text>
            </View>

            <View style={styles.infoView}>
              <Text style={styles.bold}>Organização Celular: </Text>
              <Text style={styles.text}>{item.cellOrganization}</Text>
            </View>

            <View style={styles.infoView}>
              <Text style={styles.bold}>Reprodução: </Text>
              <Text style={styles.text}>{item.reproduction}</Text>
            </View>

            <View style={styles.infoView}>
              <Text style={styles.bold}>Respiração: </Text>
              <Text style={styles.text}>{item.respiration}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    fontSize: 14,
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Animal;
