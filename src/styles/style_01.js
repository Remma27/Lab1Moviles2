// style_01.js
import { StyleSheet } from 'react-native';

const principal = '#1B2E66';

export const style_01 = StyleSheet.create({
  divHeader: {
    
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
   
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  divMain: {
    textAlign: 'center',
  },
  h1: {
    // Estilos para el título principal
  },
  textContainer: {
    alignItems: 'center',
   
  },
  p1: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,
  },
 
  teamMember: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50, // La mitad del ancho o altura para hacer la imagen redonda

    alignSelf: 'center',
  },
  h2: {
    color: 'principal',
    marginTop: 5,
   
    fontSize: 20,
    fontWeight: 'bold',
  },
  tarjeta: {
    backgroundColor: 'blanco',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  divFooter: {
    alignItems: 'center',
    backgroundColor : principal,
    width:420,
    height:420,
  },

});
