import { Pressable, TextStyle, ViewStyle } from 'react-native';

import * as ImagePickerAPI from 'expo-image-picker';

import { Text } from './Themed';

interface ImagePickerProps {
  setState: React.Dispatch<React.SetStateAction<string[]>>
  children: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
}

export default function ImagePicker({setState, children, style, textStyle}: ImagePickerProps) {
  const pickImage = async () => {
    const result = await ImagePickerAPI.launchImageLibraryAsync({
      mediaTypes: ImagePickerAPI.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,      
    });

    if (!result.canceled) {
      const uri = result.assets.map((asset) => asset.uri)
      setState(prev => [...prev, ...uri].length > 5 ? prev: [...prev, ...uri])
    } else {
      setState(prev => prev)
    }
  };

  return (
    <Pressable onPress={pickImage} style={[{alignItems: "center", gap: 8}, style]}>
        {children}
        <Text
          style={textStyle}
          weight="medium"
        >
          Dodaj zdjęcie
        </Text>
    </Pressable>
  )
}