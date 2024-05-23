import { FormValues } from '@models/signup'
import Form from '@components/signup/Form'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, store } from '@/remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'

function SignupPage() {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: formValues.name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
