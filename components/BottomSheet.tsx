import { Feather } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { Text } from "./Themed";
import { forwardRef, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { router } from "expo-router";
import { Post } from "@/lib/types";
import { useUser } from "@/providers/FirebaseProvider";
import colors from "@/constants/Colors";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/lib/api";

interface QuestBottomSheetProps extends Omit<BottomSheetProps, "children"> {
  data: Post | null;
  setData: (authorId: Post | null) => void;
}

interface CustomButtonProps {
  onPress: () => void;
  iconName: any;
  title: React.ReactNode;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
}

const CustomButton = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  iconName,
  color = "black",
}: CustomButtonProps) => (
  <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
    <Feather name={iconName} size={24} color={color} />
    <Text weight="semibold" style={[styles.buttonText, { color }, textStyle]}>
      {title}
    </Text>
  </Pressable>
);

const QuestBottomSheet = forwardRef<BottomSheet, QuestBottomSheetProps>(
  ({ data, setData, ...rest }, ref) => {
    const user = useUser();

    const mutation = useMutation({
      mutationFn: (id: string) => deletePost(id),
    })

    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
      []
    );
    return (
      <BottomSheet
        {...rest}
        index={-1}
        ref={ref}
        snapPoints={["25%"]}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onClose={() => setData(null)}
      >
        <View style={styles.container}>
          {user?.uid === data?.author.id ? (
            <>
              <CustomButton
                onPress={() => {
                  router.push("/quests/edit");
                  setData(null);
                }}
                title="Edytuj"
                iconName="edit"
              />
              <CustomButton
                onPress={() => {
                  mutation.mutate(data?.id!);
                  setData(null);
                }}
                title="Usuń zadanie"
                iconName="trash-2"
                color="red"
              />
            </>
          ) : (
            <>
              <CustomButton
                onPress={() => {
                  router.push({
                    pathname: "/(secured)/(drawer)/profile/[id]",
                    params: { id: data?.author.id },
                  });
                  setData(null);
                }}
                title="Profil twórcy"
                iconName="user"
              />
              {/* <CustomButton
                onPress={() => {
                  router.push({
                    pathname: "/(secured)/reporting/quest/[questId]",
                    params: { questId: data?.id },
                  });
                  setData(null);
                }}
                title="Zgłoś post"
                iconName="flag"
                color="red"
              /> */}
            </>
          )}
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    marginTop: 4.5,
  },
  acceptButton: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignSelf: "center",
    backgroundColor: colors.blue,
    marginBottom: 40,
    borderRadius: 45,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default QuestBottomSheet;
