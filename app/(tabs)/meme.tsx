import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Modal, TouchableWithoutFeedback, TextInput, Button, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Meme: React.FC = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      source: require('@/assets/images/Meme.jpg'),
      likes: 175,
      dislikes: 11,
      comments: [{ text: 'Super', user: 'other' }, { text: 'Nice', user: 'other' }, { text: 'Ok', user: 'other' }],
      showComments: false,
      liked: false,
      disliked: false,
    },
    {
      id: 2,
      source: require('@/assets/images/six.jpeg'),
      likes: 333,
      dislikes: 118,
      comments: [{ text: 'Super', user: 'other' }, { text: 'Nice', user: 'other' }, { text: 'Ok', user: 'other' }],
      showComments: false,
      liked: false,
      disliked: false,
    },

    {
      id: 3,
      source: require('@/assets/images/ten.jpg'),
      likes: 333,
      dislikes: 118,
      comments: [{ text: 'Super', user: 'other' }, { text: 'Nice', user: 'other' }, { text: 'Ok', user: 'other' }],
      showComments: false,
      liked: false,
      disliked: false,
    },

    {
      id: 4,
      source: require('@/assets/images/seven.jpeg'),
      likes: 333,
      dislikes: 118,
      comments: [{ text: 'Super', user: 'other' }, { text: 'Nice', user: 'other' }, { text: 'Ok', user: 'other' }],
      showComments: false,
      liked: false,
      disliked: false,
    },
    {
      id: 5,
      source: require('@/assets/images/paste.jpg'),
      likes: 333,
      dislikes: 118,
      comments: [{ text: 'Super', user: 'other' }, { text: 'Nice', user: 'other' }, { text: 'Ok', user: 'other' }],
      showComments: false,
      liked: false,
      disliked: false,
    },

    {
      id: 6,
      source: require('@/assets/images/nine.jpeg'),
      likes: 333,
      dislikes: 118,
      comments: [{ text: 'Super', user: 'other' }, { text: 'Nice', user: 'other' }, { text: 'Ok', user: 'other' }],
      showComments: false,
      liked: false,
      disliked: false,
    },

  ]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [newComment, setNewComment] = useState('');

  const openAppOrWeb = async (url: string, fallbackUrl: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(fallbackUrl);
    }
  };

  const addComment = (index: number) => {
    if (newComment.trim() !== '') {
      const newImages = [...images];
      newImages[index].comments.push({ text: newComment, user: 'me' });
      setImages(newImages);
      setNewComment('');
    }
  };

  const deleteComment = (imageIndex: number, commentIndex: number) => {
    const newImages = [...images];
    newImages[imageIndex].comments.splice(commentIndex, 1);
    setImages(newImages);
  };

  const toggleLike = (index: number) => {
    const newImages = [...images];
    if (newImages[index].liked) {
      newImages[index].likes -= 1;
    } else {
      newImages[index].likes += 1;
      if (newImages[index].disliked) {
        newImages[index].dislikes -= 1;
        newImages[index].disliked = false;
      }
    }
    newImages[index].liked = !newImages[index].liked;
    setImages(newImages);
  };

  const toggleDislike = (index: number) => {
    const newImages = [...images];
    if (newImages[index].disliked) {
      newImages[index].dislikes -= 1;
    } else {
      newImages[index].dislikes += 1;
      if (newImages[index].liked) {
        newImages[index].likes -= 1;
        newImages[index].liked = false;
      }
    }
    newImages[index].disliked = !newImages[index].disliked;
    setImages(newImages);
  };

  const toggleComments = (index: number) => {
    const newImages = [...images];
    newImages[index].showComments = !newImages[index].showComments;
    setImages(newImages);
  };

  return (
    <ScrollView style={styles.container}>
      {images.map((image, index) => (
        <View key={image.id}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Lorem Ipsum (GLOBEL)</Text>
          </View>
          <Text style={styles.subHeader}>
            Tag to your best Friend {' '}
          </Text>
          <Image
            source={image.source}
            style={[styles.image, image.id === 2 && styles.largeImage]}
          />
          <View style={styles.reactionContainer}>
            <TouchableOpacity style={styles.reaction} onPress={() => toggleLike(index)}>
              <Ionicons name={image.liked ? "thumbs-up" : "thumbs-up-outline"} size={24} color={image.liked ? 'red' : 'black'} />
              <Text>{image.likes}</Text>
              <Text style={styles.reactionText}>LIKES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction} onPress={() => toggleComments(index)}>
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text>{image.comments.length}</Text>
              <Text style={styles.reactionText}>COMMENTS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction} onPress={() => toggleDislike(index)}>
              <Ionicons name={image.disliked ? "thumbs-down" : "thumbs-down-outline"} size={24} color={image.disliked ? 'red' : 'black'} />
              <Text>{image.dislikes}</Text>
              <Text style={styles.reactionText}>DISLIKES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction} onPress={() => setShowShareOptions(true)}>
              <Ionicons name="share-outline" size={28} color="black" />
              <Text>SHARE</Text>
            </TouchableOpacity>
          </View>
          {image.showComments && (
            <View style={styles.commentSection}>
              {image.comments.map((comment, cIndex) => (
                <TouchableOpacity
                  key={cIndex}
                  style={[styles.commentContainer, comment.user === 'me' ? styles.userComment : styles.otherComment]}
                  onLongPress={() =>
                    comment.user === 'me' &&
                    Alert.alert(
                      'Delete Comment',
                      'Are you sure you want to delete this comment?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => deleteComment(index, cIndex),
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <Text style={styles.comment}>{comment.text}</Text>
                </TouchableOpacity>
              ))}
              <View style={styles.addCommentContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment"
                  value={newComment}
                  onChangeText={setNewComment}
                />
                <Button title="Submit" onPress={() => addComment(index)} />
              </View>
            </View>
          )}
        </View>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showShareOptions}
        onRequestClose={() => setShowShareOptions(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowShareOptions(false)}>
          <View style={styles.modalBackdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.socialMediaRow}>
              <TouchableOpacity onPress={() => openAppOrWeb('fb://facewebmodal/f?href=https://www.facebook.com', 'https://www.facebook.com')}>
                <FontAwesome name="facebook" size={24} color="blue" style={styles.icon} />
                <Text style={styles.socialMediaText}>FACEBOOK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openAppOrWeb('tg://resolve?domain=telegram', 'https://telegram.org')}>
                <FontAwesome name="telegram" size={24} color="blue" style={styles.icon} />
                <Text style={styles.socialMediaText}>TELEGRAM</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.socialMediaRow}>
              <TouchableOpacity onPress={() => openAppOrWeb('whatsapp://send?text=', 'https://www.whatsapp.com')}>
                <FontAwesome name="whatsapp" size={24} color="green" style={styles.icon} />
                <Text style={styles.socialMediaText}>WHATSAPP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openAppOrWeb('twitter://user?screen_name=twitter', 'https://twitter.com')}>
                <FontAwesome name="twitter" size={24} color="skyblue" style={styles.icon} />
                <Text style={styles.socialMediaText}>TWITTER</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowShareOptions(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  headerContainer: {
    backgroundColor: '#D3A4F7',
    padding: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    paddingLeft: 10,
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 20,
    marginVertical: 10,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
  largeImage: {
    height: 500, // Set the desired height for the second image
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    columnGap: 30,
  },
  reaction: {
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 12,
    color: '#000',
  },
  commentSection: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  userComment: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1ffc7',
  },
  otherComment: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  comment: {
    fontSize: 16,
    marginVertical: 5,
  },
  addCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: '70%',
    marginVertical: 10,
    marginRight: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  socialMediaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  icon: {
    alignSelf: 'center',
  },
  socialMediaText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
  },
});

export default Meme;
