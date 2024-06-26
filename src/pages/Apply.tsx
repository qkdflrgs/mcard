import useUser from '@hooks/useUser'
import { APPLY_STATUS } from '@models/apply'
import { updateApplyCard } from '@remote/apply'
import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@contexts/AlertContext'
import FullPageLoader from '@common/FullPageLoader'

const STATUS_MESSAGE = {
  [APPLY_STATUS.REDAY]: '카드 심사를 준비하고 있습니다 :)',
  [APPLY_STATUS.PROGRESS]: '카드를 심사하고 있습니다. 잠시만 기다려주세요 :)',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었습니다 :)',
}

function ApplyPage() {
  const user = useUser()
  const { id } = useParams()
  const navigate = useNavigate()
  const { open } = useAlertContext()
  const [readyToPoll, setReadyToPoll] = useState<boolean>(false)

  const { mutate, isLoading } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id as string,
    options: {
      onSuccess: (applied) => {
        if (applied == null) return

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) return null

  if (readyToPoll || isLoading)
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'REDAY']} />

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
