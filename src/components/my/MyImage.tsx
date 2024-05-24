import useUser from '@hooks/useUser'
import { app, storage, store } from '@remote/firebase'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ChangeEvent } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@atoms/user'

interface MyImageProps {
  size?: number
  mode?: 'default' | 'upload'
}

function MyImage({ size = 40, mode = 'default' }: MyImageProps) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

    const upload = await uploadBytes(storageRef, files[0])
    const downloadUrl = await getDownloadURL(upload.ref)

    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-512.png'
        }
        alt="프로필 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' && (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
