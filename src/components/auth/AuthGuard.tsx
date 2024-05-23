import { userAtom } from '@atoms/user'
import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

interface AuthGuardProps {
  children: React.ReactNode
}

function AuthGuard({ children }: AuthGuardProps) {
  const [initialize, setInitialize] = useState<boolean>(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }
    setInitialize(true)
  })

  if (initialize === false) return null

  return <>{children}</>
}

export default AuthGuard
