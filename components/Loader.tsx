import colors from '@/constants/Colors'
import Container from './Container'
import { ActivityIndicator } from 'react-native'

export default function Loader() {
  return (
    <Container style={{alignItems: 'center', justifyContent:"center"}}>
        <ActivityIndicator size='large' color={colors.blue} />
    </Container>
  )
}
