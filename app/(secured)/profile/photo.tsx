import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Container, ImagePicker } from '@/components'
import { EditSvg } from '@/assets'

export default function PhotoScreen() {
  const [images, setImages] = useState<string[]>([]);
  return (
    <Container style={{alignItems: 'center'}}>
      <EditSvg/>
      <ImagePicker setState={setImages} limit={1}>
        <Text>Choose photo</Text>
      </ImagePicker>
    </Container>
  )
}