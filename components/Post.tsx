import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Post as PostType, Like } from "@/lib/types";
import { View as ColoredView, Text } from "./Themed";
import ProfilePicture from "./ProfilePicture";
import { Image } from "expo-image";
import TimeElement from "./Time";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import Button from "./Button";
import { likePost, subscribeToLikes, unlikePost } from "@/lib/api"
import colors from "@/constants/Colors";

interface PostProps {
  post: PostType;
  setPost: (authorId: PostType | null) => void;
  optionsVisible?: boolean;
  user?: {
    uid: string;
  };
}

const Post: React.FC<PostProps> = ({
  post,
  setPost,
  optionsVisible = true,
  user,
}) => {
  const imagesLength = post.imageUrls?.length;
  const [likes, setLikes] = useState<Like[]>([]);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeToLikes(post.id, (snapshot) => {
      
      setLikes(snapshot);
    });

    return () => unsubscribe();
  }, [post.id]);

  useEffect(() => {
    if (user) {
      setLiked(likes.some((like) => like.userId === user.uid));
    }
  }, [likes, user]);

  const handleLikeButtonPress = () => {
    if (user) {
      if (liked) {
        unlikePost(post.id, user.uid)
      } else {
        likePost(post.id, user.uid);
        
      }
      setLiked(prev => !prev)
    }
  };

  return (
    <ColoredView style={styles.post}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
          <ProfilePicture width={45} src={post.author.profilePicture} />
          <View>
            <Text style={styles.author} type="initials" numberOfLines={1} ellipsizeMode="tail">
              {post.author.username}
            </Text>
            <TimeElement
              date={post.timestamp.toDate()}
              style={{ fontSize: 11, color: "dimgray" }}
              type="created"
            />
          </View>
        </View>
        {optionsVisible && (
          <Button onPress={() => setPost(post)}>
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </Button>
        )}
      </View>

      <Text style={styles.description}>{post.description}</Text>

      {(imagesLength && imagesLength > 0) ? (
        <>
          {imagesLength !== 2 && (
            <Image
              source={{ uri: post.imageUrls![0] }}
              style={[styles.image, { borderRadius: 15 }]}
            />
          )}
          <View style={styles.postImages}>
            {post
              .imageUrls!.slice(
                imagesLength === 2 ? 0 : 1,
                imagesLength === 2 ? 2 : 3
              )
              .map((url, index) => (
                <View
                  key={index}
                  style={[
                    styles.imageContainer,
                    index === 0 && styles.firstImage,
                  ]}
                >
                  <Image source={{ uri: url }} style={styles.image} />
                  {index === 1 && imagesLength > 3 && (
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>
                        +{post.imageUrls!.length - 3}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
          </View>
        </>
      ): null}

      <View style={{flexDirection: "row", gap: 15, marginTop: 10, marginLeft: 5}}>
        <Button onPress={handleLikeButtonPress}>
          <AntDesign name={liked ? "heart" : "hearto"} size={24} color={liked ? colors.red: "black"} />
        </Button>
        <Text>Polubione przez: {likes.length}</Text>
      </View>
    </ColoredView>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 16,
    gap: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#f6f6f6",
    marginBottom: 32,
  },
  profilePicture: {
    borderColor: "#e6d2c0",
    borderWidth: 3,
  },
  author: {
    fontSize: 15,
  },
  description: {
    fontSize: 14,
  },
  postImages: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  firstImage: {
    marginRight: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#555",
  },
});

export default Post;
