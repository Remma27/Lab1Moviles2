import React from 'react';
		import { ScrollView,  Text, View} from 'react-native';
		import {style} from '../styles/style';
		import CommentsSection from '../components/comments/CommentsSection';
		const data = [
            
		];

		const Index = () => {
			return(
				<View>
					<View style={style.divMain}>
						<Text style={style.h1}>Volcanes de Costa Rica</Text>
						<Text style={style.p1}>
                            Costa Rica destaca por su naturaleza, en esta aplicacion
                            se dara informacion sobre los principales volcanes que 
                            existen en este maravilloso pais.
                        </Text>

						<ScrollView style={{marginTop:8}}>
							{data.map(item => <View style={style.tarjeta} key={item.codigo} >
								<Text>Código: {item.codigo}</Text>
								<Text>Nombre: {item.nombre}</Text>
								<Text>Nivel: {item.nivel}</Text>
								<Text>Créditos: {item.creditos}</Text>
							</View>)}
						</ScrollView>
						 {/* Aqui llamo yo al js de los comentarios, GG 
						 (NOTA: LOS COMENTARIOS AL PARECER NO SE LLEGAN A BORRAR, 
						 PERO NO AFECTA LA ESTETICA PORQUE ESTAN METIDOS EN SU PROPIO SCROLL) */}
						<CommentsSection />
            
					</View>
					



					<View style={style.divFooter}>
						<Text style={style.textFooter}>Carrera de Tecnologías de Información</Text>
						<Text style={style.textFooter}>Sede del Pacífico</Text>
					</View>
				</View>
			);
		}

		export default Index;