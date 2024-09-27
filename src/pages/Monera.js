import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, View, Image, StyleSheet, TextInput, Modal, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';


const Monera = () => {
  const [organisms, setOrganisms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrganisms, setFilteredOrganisms] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrganism, setSelectedOrganism] = useState(null);

  const itemsPerPage = 10;

  //Buscar dados da API com Axios, usando fetchData para carregar os dados por página
  const fetchData = async (pageNum = 1) => {
    try {
      const response = await axios.get(`http://192.168.1.103:3000/monera?_page=${pageNum}&_limit=${itemsPerPage}`);
      if (pageNum === 1) {
        setOrganisms(response.data);
        setFilteredOrganisms(response.data);
      } else {
        setOrganisms(prev => [...prev, ...response.data]);
        setFilteredOrganisms(prev => [...prev, ...response.data]);
      }
      setLoading(false);
      setIsFetching(false);
    } catch (error) {
      console.error('Error ao buscar dados da API', error);
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Carregar mais dados
  const loadMoreData = () => {
    if (!isFetching) {
      setPage(prevPage => prevPage + 1);
      setIsFetching(true);
      fetchData(page + 1);
    }
  };

  //Filtro de pesquisa
  const searchFilter = (text) => {
    setSearch(text);
    if (text === '') {
      setFilteredOrganisms(organisms);
    } else {
      const filtered = organisms.filter((organism) =>
        organism.name.toLowerCase().includes(text.toLowerCase()) ||
        organism.description.toLowerCase().includes(text.toLowerCase()) ||
        organism.nutrition.toLowerCase().includes(text.toLowerCase()) ||
        organism.cellType.toLowerCase().includes(text.toLowerCase()) ||
        organism.cellOrganization.toLowerCase().includes(text.toLowerCase()) ||
        organism.reproduction.toLowerCase().includes(text.toLowerCase()) ||
        organism.respiration.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOrganisms(filtered);
    }
  };

  const openModal = (organism) => {
    setSelectedOrganism(organism);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrganism(null);
    setModalVisible(false);
  };

  //Renderizar itens da lista
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text><Text style={styles.label}>Nutrição:</Text> {item.nutrition}</Text>
        <Text><Text style={styles.label}>Tipo de Célula:</Text> {item.cellType}</Text>
        <Text><Text style={styles.label}>Organização Celular:</Text> {item.cellOrganization}</Text>
        <Text><Text style={styles.label}>Reprodução:</Text> {item.reproduction}</Text>
        <Text><Text style={styles.label}>Respiração:</Text> {item.respiration}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={search}
        onChangeText={searchFilter}
      />
      <FlatList
        data={filteredOrganisms}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
      />

      {selectedOrganism && (
        // Modal para expandir o item selecionado
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedOrganism.image }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedOrganism.name}</Text>
              <Text>{selectedOrganism.description}</Text>
              <Text><Text style={styles.label}>Nutrição:</Text> {selectedOrganism.nutrition}</Text>
              <Text><Text style={styles.label}>Tipo de Célula:</Text> {selectedOrganism.cellType}</Text>
              <Text><Text style={styles.label}>Organização Celular:</Text> {selectedOrganism.cellOrganization}</Text>
              <Text><Text style={styles.label}>Reprodução:</Text> {selectedOrganism.reproduction}</Text>
              <Text><Text style={styles.label}>Respiração:</Text> {selectedOrganism.respiration}</Text>
              <Button title="Fechar" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#009929',
  },
  searchInput: {
    height: 40,
    borderColor: '#27a3df',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: '#27a3df',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#006414',
  },
  label: {
    fontWeight: 'bold',
    color: '#009929',
  },
  description: {
    color: '#5ccb5f',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#006414',
  }
});


export default Monera;
