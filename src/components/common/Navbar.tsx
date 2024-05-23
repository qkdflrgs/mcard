import { colors } from '@styles/colorPalette'
import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'
import useUser from '@hooks/useUser'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'

function Navbar() {
  const user = useUser()
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signup">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, handleLogout, showSignButton])

  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      css={navbarContainerStyles}
    >
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
  padding: 10px 24px;
`

export default Navbar
