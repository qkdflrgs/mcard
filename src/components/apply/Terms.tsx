import { TERMS } from '@constants/apply'
import Agreement from '@common/Agreement'
import { MouseEvent, useCallback, useState } from 'react'
import FixedBottomButton from '@common/FixedBottomButton'
import { ApplyValues } from '@models/apply'

interface TermsProps {
  onNext: (terms: ApplyValues['terms']) => void
}

function Terms({ onNext }: TermsProps) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return TERMS.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const isAllAgreements = Object.values(termsAgreements).every((agree) => agree)

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={isAllAgreements}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {TERMS.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!isAllAgreements}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
