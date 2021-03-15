import React, {useEffect} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {styleConfig} from '../../../../../../StyleConfig'
import {useStore} from 'effector-react'
import {$userData, $userPhoto, setUserPhoto} from '../../../models/models'
import {getDb} from '../../../../../../../utils/db'
import {ButtonEdit} from '../../../../uploading-veriffication/features/load-attributes/ui/atoms'
import {useNavigate} from '../../../../../../lib/hooks'
import {CameraSVG} from '../../../../../../ui/atoms/icons'
import {showTakePictureMenu} from '../../../../../../features/take-picture-menu/models'
import {PHOTOPROFILE} from '../../../../../../../utils/db/constants'
import {links} from '../../../../../../navigation/links'


type propsType = {
    enableButtonEdit?: boolean
}

export const PhotoProfileBlock: React.FC<propsType> = ({enableButtonEdit = false}) => {
    const navigate = useNavigate()
    const userPhoto = useStore($userPhoto)
    const userData = useStore($userData)


    const onPressEditProfile = () => {
        navigate(links.editProfile)
    }

    const pickImage = async () => {
        showTakePictureMenu()
    }


    const ButtonCamera = () => {
        if (!enableButtonEdit) {
            return (
                <TouchableOpacity onPress={pickImage} style={{position: 'absolute', top: 28, left: 28}}>
                    <CameraSVG color={'rgba(255,255,255,0.7)'}/>
                </TouchableOpacity>
            )
        } else return null
    }

    const EditButton = () => {
        if (enableButtonEdit) {
            return (
                <View style={styles.btnEditProfile}>
                    <ButtonEdit callback={onPressEditProfile}/>
                </View>
            )
        } else return null
    }


    useEffect(() => {
        getDb(PHOTOPROFILE)
            .then((data) => data && setUserPhoto(data))
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.photo}>
                {!!userPhoto?.toString() &&
                <Image style={{width: 80, height: 80, borderRadius: 50}} source={{uri: userPhoto?.toString()}}/>
                }
                <ButtonCamera/>
            </View>
            <EditButton/>
            <Text style={[styles.name, styles.textColor]}>{userData.first_name} {userData.last_name}</Text>
            <Text style={[styles.phone, styles.textColor]}>{userData.phone_number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#ccc',
    },
    textColor: {
        color: styleConfig.textColor.dark,
    },
    name: {
        marginTop: 10,
        fontFamily: 'IBMPlex-600',
        fontSize: 20,
        lineHeight: 26,
    },
    phone: {
        fontSize: 12,
        lineHeight: 16,
    },
    btnEditProfile: {
        position: 'absolute',
        right: 10,
        top: 0,
    },
})
