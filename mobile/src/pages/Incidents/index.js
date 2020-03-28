import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import styles from './styles';
import logoImg from '../../assets/logo.png'
import api from '../../services/api';

export default function Incidents() {
  const navegation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navegationToDetail(incident) {
    navegation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return false;
    }
    console.log(incidents.length)
    if (total > 0 && incidents.length === total) {
      return false;
    }
    setLoading(true);

    const response = await api.get('/incidents',
      { params: { page } }
    );

    setIncidents([...incidents, ...response.data]);
    console.log(parseInt(response.headers['x-total-count']))
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false);

  }
  useEffect(() => {
    loadIncidents();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>
        Bem-vindo!
      </Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>
      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.1}
        renderItem={({ item: incident }) => (

          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>
              ONG:
            </Text>
            <Text style={styles.incidentValue}>
              {incident.name}
            </Text>

            <Text style={styles.incidentProperty}>
              CASO:
            </Text>
            <Text style={styles.incidentValue}>
              {incident.title}
            </Text>

            <Text style={styles.incidentProperty}>
              VALOR:
            </Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navegationToDetail(incident)}>
              <Text style={styles.detailsButtonText}>
                Ver mais detalhes
                </Text>
              <Feather name='arrow-right' size={16} color="#E02041" />
            </TouchableOpacity>
          </View>

        )}
      />
    </View>
  );
}


