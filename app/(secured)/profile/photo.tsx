import React, { useState } from 'react'
import { Button, Container, ImagePicker, ProfilePicture, Text, View } from '@/components'
import { EditSvg } from '@/assets'
import { updateProfilePicture } from '@/providers/FirebaseProvider';
import { Alert } from 'react-native';

export default function PhotoScreen() {
  const [image, setImage] = useState<string[]>([]);
  return (
    <Container style={{ alignItems: 'center', gap: 10, paddingVertical: 40 }}>
        <Text weight='semibold' style={{fontSize: 22}}>Kliknij w zdjęcie aby je zmienić</Text>
        <ImagePicker setState={setImage} limit={1}>
          <ProfilePicture width={200} src={image[0]} />
        </ImagePicker>
        <Button type='solid' onPress={() => {image[0] ? updateProfilePicture(image[0]): Alert.alert("Wybierz zdjęcie")}}>Zapisz</Button>
    </Container>
  )
}