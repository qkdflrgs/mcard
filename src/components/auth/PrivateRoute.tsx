import useUser from '@hooks/useUser'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useUser()

  if (user == null) return <Navigate to="/signin" replace={true} />

  return <>{children}</>
}

export default PrivateRoute
