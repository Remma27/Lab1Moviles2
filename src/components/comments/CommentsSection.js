import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const username = "Username"; // Aqui emma deberia poner el nombre que se jala de la bd

    const handleAddComment = () => {
        if (newComment.trim()) {
            // una lista donde se agrega tanto el nombre del usuario como el contenido del comentario
            setComments([...comments, { text: newComment, user: username }]);
            setNewComment('');
        }
    };

    return (
        <View style={styles.container}>
            {/* La lista de comentarios tiene su propio scroll, asi se pueden visualizar mejor */}
            <ScrollView style={styles.commentsContainer}>
                {comments.map((comment, index) => (
                    <View key={index} style={styles.comment}>
                        <Text style={styles.username}>{comment.user}</Text>
                        <Text>{comment.text}</Text>
                    </View>
                ))}
            </ScrollView>
            
            <View style={styles.inputContainer}>
                <TextInput
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Escribe un comentario..."
                    style={styles.input}
                />
                <Button title="Enviar" onPress={handleAddComment} />
            </View>
        </View>
    );
};

// Estilos mieo para los comentarios 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    commentsContainer: {
        flex: 1, 
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderColor: 'lightgrey',
    },
    input: {
        flex: 1, 
        marginRight: 10, 
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        borderRadius: 5,
    },
    comment: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    username: {
        fontWeight: 'bold',
    },
});

export default CommentsSection;