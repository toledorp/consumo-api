
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [post, setPost] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    buscarPost();
  }, []);

  async function buscarPost() {
    try {
      setCarregando(true);
      setErro('');

      const resposta = await axios.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      );

      setPost(resposta.data);
    } catch (error) {
      setErro('Erro ao buscar a publicação.');
      console.log(error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cabecalho}>Consumo de API com Axios</Text>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text>Carregando publicação...</Text>
        </View>
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : post ? (
        <View style={styles.card}>
          <Text style={styles.titulo}>{post.title}</Text>
          <Text style={styles.conteudo}>{post.body}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#f5f5f5',
  },
  cabecalho: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  centro: {
    alignItems: 'center',
    marginTop: 50,
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  conteudo: {
    fontSize: 16,
    lineHeight: 24,
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
