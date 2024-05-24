import { CREDIT_OPTIONS, DATE_OPTIONS, SALARY_OPTIONS } from '@constants/apply'
import { ApplyValues } from '@models/apply'
import Select from '@common/Select'
import { ChangeEvent, useCallback, useState } from 'react'
import FixedBottomButton from '@common/FixedBottomButton'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
interface BasicInfoProps {
  onNext: (infoValues: InfoValues) => void
}

function BasicInfo({ onNext }: BasicInfoProps) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const isAllSelected = Object.values(infoValues).every((value) => value)

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={SALARY_OPTIONS}
        placeholder="연소득을 선택해주세요"
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={CREDIT_OPTIONS}
        placeholder="신용점수를 선택해주세요"
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={DATE_OPTIONS}
        placeholder="결제일을 선택해주세요"
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={!isAllSelected}
      />
    </div>
  )
}

export default BasicInfo
