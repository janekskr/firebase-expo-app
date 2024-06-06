import { useEffect, useRef, useState } from 'react';
import { Container, Post, Text, View } from "@/components";
import colors from "@/constants/Colors";
import { usePosts, useUser } from "@/providers/FirebaseProvider";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from '@tanstack/react-query';
import BottomSheet from "@gorhom/bottom-sheet";
import { Post as PostType } from '@/lib/types';
import QuestBottomSheet from '@/components/BottomSheet';
import { subscribeToPosts } from '@/lib/api';

export default function HomeScreen() {
  const [post, setPost] = useState<PostType | null>(null);
  const user = useUser()
  const posts = usePosts()
  const queryClient = useQueryClient()

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheet = () => {
    if (post) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToPosts((updatedPosts) => {
      queryClient.setQueryData(['posts'], updatedPosts);
    });

    return () => unsubscribe();
  }, [queryClient]);

  useEffect(handleSheet, [post]);

  if (!posts || posts.length < 1) {
    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <Text type="title" style={{ color: colors.blue }}>Brak postów!</Text>
      </Container>
    );
  }

  return (
    <View style={{flex:1, padding: 10, paddingVertical: 15}}>
      <FlashList
      data={posts}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return <Post post={item} setPost={setPost} user={user!} />;
      }}
      estimatedItemSize={posts.length}
    />
    <QuestBottomSheet ref={bottomSheetRef} data={post} setData={setPost} />
    </View>  
  );

}

// const posts: PostType[] = [
//   {
//       id: "1",
//       author: {
//           username: "nature_lover",
//           profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQev_JK5LvT9fbdYZ5ZJPFxhIXLiF2sujU_QL6_2HZ9W1LDF9UZ1BuLvpm6WrQMlboFNy8&usqp=CAU",
//           id: "user1"
//       },
//       description: "Spędziłem niesamowity dzień w lesie! 🌲🌿 #Nature #Peace",
//       imageUrls: ["https://api.wallpapers.ai/static/downloads/14d86e8ca33d45cea3c38f126d29b940/upscaled/000000_151974678_kdpmpp2m15_PS7.5_make_vallheim_lively_4k_wallpaper_for_me._digital_art_concept_art_[upscaled].jpg"],
//       timestamp: new Date("2024-06-01T10:00:00Z")
//   },
//   {
//       id: "2",
//       author: {
//           username: "foodie_jane",
//           profilePicture:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2HhBiBUDMkob8AmekJBc1Lj-NvBct90XSDiwrXhgF1-sKqR4AGU9jZJlqv_hHI0HDmRs&usqp=CAU",
//           id: "user2"
//       },
//       description: "Kolejna wizyta w mojej ulubionej restauracji! 🍕🍝 #Foodie #Delicious",
//       imageUrls: ["https://images.nightcafe.studio/jobs/dkI9uH0V3bvZQZL9DvpQ/dkI9uH0V3bvZQZL9DvpQ--1--ru3um.jpg?tr=w-1600,c-at_max"],
//       timestamp: new Date("2024-06-03T12:30:00Z")
//   }
// ];