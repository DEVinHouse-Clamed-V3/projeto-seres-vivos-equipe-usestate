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
  Modal,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

const Fungos = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fungos, setFungos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFungos, setFilteredFungos] = useState(fungos);

  useEffect(() => {
    axios;
    axios
      .get("http://192.168.1.70:3000/fungos")
      .then((response) => {
        setFungos(response.data);
        setFilteredFungos(response.data);
      })
      .catch(() => {
        Alert.alert("Não foi possível obter a lista do Reino Fungi");
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);

    if (text === "") {
      setFilteredFungos(fungos);
    } else {
      const filtered = fungos.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFungos(filtered);
    }
  };

  function Spacer(props) {
    return <View style={{ height: props.size, width: props.size }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonInfo}
        title="Nova Tarefa"
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonInfoText}>
          Quer conhecer as principais caracteríscas dos fungos? Clique Aqui!
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.inputCards}
        placeholder="Buscar fungos"
        value={search}
        placeholderTextColor="#ccc"
        maxLength={25}
        autoCorrect={true}
        onChangeText={handleSearch}
      />

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.containerModal}>
          <ImageBackground
            source={require("../../assets/fun.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", flex: 1 }}
          >
            <View style={styles.intro}>
              <Text style={styles.introText}>
                Os fungos são seres heterótrofos, eucariontes, unicelulares ou
                pluricelulares. Se reproduzem de forma sexuada ou assexuada.
              </Text>
              <Spacer size={10} />
              <Text style={styles.introText}>
                São encontrados em quase todos os lugares, como no ar, no solo,
                nas plantas e até nos alimentos.
              </Text>
              <Spacer size={10} />
              <Text style={styles.introText}>
                Hoje são classificados em cinco grupos principais: quitrídeos,
                zigomicetos, glomeromicetos, ascomicetos e basidiomicetos.
              </Text>
              <Spacer size={10} />
              <Text style={styles.introText}>
                Junto com as bactérias, atuam na decomposição da matéria
                orgânica. Além disso, são bastante utilizados na culinária e na
                indústria farmacêutica.
              </Text>
              <Spacer size={10} />
              <Text style={styles.introText}>
                É importante lembrar que os fungos podem causar doenças, tais
                como: Onicomicose, Candidíase, Rinossinusite, Meningite fúngica
                e Pneumocistose.
              </Text>
            </View>
          </ImageBackground>
        </View>
      </Modal>

      <FlatList
        data={filteredFungos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInitial: {
    fontSize: 20,
    color: "#9f9f9f",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonInfo: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "#006414",
    shadowColor: "#006414",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonInfoText: {
    color: "#9f9f9f",
    textAlign: "center",
    fontSize: 16,
  },
  inputCards: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "#006414",
    shadowColor: "#006414",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  containerModal: {
    height: "100%",
  },
  intro: {
    marginTop: 80,
    marginHorizontal: 10,
  },
  introText: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    lineHeight: 26,
    alignItems: "center",
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
    width: 300,
    height: 180,
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
    color: "#9f9f9f",
    alignSelf: "center",
  },
});

export default Fungos;
