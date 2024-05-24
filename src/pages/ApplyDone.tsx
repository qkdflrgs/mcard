import FixedBottomButton from '@common/FixedBottomButton'
import Text from '@common/Text'
import Flex from '@common/Flex'
import { parse } from 'qs'

function ApplyDonePage() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex>
      <Text>
        {success === 'true'
          ? '카드가 발급되었습니다'
          : '카드 발급에 실패했습니다'}
      </Text>

      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDonePage
