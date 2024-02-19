// AboutPage.js
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { style_01 } from '../styles/style_01';

const teamMembers = [
  {
    name: 'Emmanuel Rodriguez Solano',
    career: 'Ingenieria en tecnologias de la información',
  },
  {
    name: 'Alejandro Rodríguez Jaen',
    career: 'Ingenieria en tecnologias de la información',
  },
  {
    name: 'Jhon Allen Valerin',
    career: 'Ingenieria en tecnologias de la información',
  },
  {
    name: 'Jose Nuñez Guerrero',
    career: 'Ingenieria en tecnologias de la información',
  },
];

import foto1 from '../imgs/fotos/emma.jpg';
import foto2 from '../imgs/fotos/ale.jpg';
import foto3 from '../imgs/fotos/Jhon.jpg';
import foto4 from '../imgs/fotos/Jose.jpg';

const fotos = [foto1, foto2, foto3, foto4];

const AboutPage = () => {
  return (
    <ScrollView style={style_01.divMain}>
      <Text style={style_01.pageTitle}>Sobre Nosotros</Text>
      <Text style={style_01.p1}>
        Somos estudiantes de Ingeniería en Tecnologías de la Información apasionados por la tecnología.
      </Text>
      <Text style={style_01.p1}>
        Exploramos el fascinante mundo de los volcanes de Costa Rica, investigando su geología y actividad.
      </Text>
      {teamMembers.map((member, index) => (
        <View key={index} style={[style_01.teamMember, { marginBottom: 16 }]}>
          <Image
            source={fotos[index]}
            style={style_01.memberPhoto}
          />
          <Text style={style_01.h2}>{member.name}</Text>
          <Text style={style_01.p1}>{member.career}</Text>
        </View>
      ))}
      <View style={style_01.divFooter}>
        <Text style={style_01.textFooter}>Universidad Técnica Nacional </Text>
        <Text style={style_01.textFooter}>Sede del pacifico </Text>
        <Text style={style_01.textFooter}>2024 </Text>
      </View>
    </ScrollView>
  );
};

export default AboutPage;
