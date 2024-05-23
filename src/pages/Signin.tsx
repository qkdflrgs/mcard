import { FormValues } from '@models/signin'
import Form from '@components/signin/Form'
import { useCallback } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useAlertContext } from '@/contexts/AlertContext'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '계정 정보를 다시 확인해주세요',
              onButtonClick: () => {},
            })

            return
          }
        }

        open({
          title: '잠시 후 다시 시도해주세요',
          onButtonClick: () => {},
        })
      }
    },
    [open, navigate],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SigninPage
