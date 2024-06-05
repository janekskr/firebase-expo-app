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
