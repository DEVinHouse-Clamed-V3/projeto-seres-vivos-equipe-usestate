import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

const Fungos = () => {
  const [fungos, setFungos] = useState([]);

  useEffect(() => {
    axios;
    axios
      .get("http://192.168.1.70:3000/fungos")
      .then((response) => {
      setFungos(response.data);
      })
      .catch(() => {
        Alert.alert("Não foi possível obter a lista do Reino Fungi");
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={fungos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.othersInfos}>Nutrição: {item.nutrition}</Text>
            <Text style={styles.othersInfos}>
              Tipo Celular: {item.cellType}
            </Text>
            <Text style={styles.othersInfos}>
              Organização Celular: {item.cellOrganization}
            </Text>
            <Text style={styles.othersInfos}>
              Reprodução: {item.reproduction}
            </Text>
            <Text style={styles.othersInfos}>
              Respiração: {item.respiration}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#006414",
    shadowColor: "#006414",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#006414",
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#006414",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#006414",
    alignSelf: "center",
  },
  othersInfos: {
    fontSize: 16,
    lineHeight: 25,
    color: "#9f9f9f",
  },
});

export default Fungos;
