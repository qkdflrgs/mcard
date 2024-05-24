import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

interface FullPageLoaderProps {
  message?: string
}

function FullPageLoader({ message }: FullPageLoaderProps) {
  return (
    <Flex
      style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          width={'40%'}
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          alt="로딩 이미지"
        />
        {message && (
          <>
            <Spacing size={120} />
            <Text bold={true} typography="t4">
              {message}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
