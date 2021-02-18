import {useNavigation} from '@react-navigation/native'


export const useNavigate = () => {
    const {navigate} = useNavigation()
    return navigate
}
