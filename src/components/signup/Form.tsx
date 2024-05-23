import { FormValues } from '@models/signup'
import Flex from '@common/Flex'
import TextField from '@common/TextField'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import FixedBottomButton from '@common/FixedBottomButton'
import Spacing from '@common/Spacing'
import validator from 'validator'

interface FormProps {
  onSubmit: (formValues: FormValues) => void
}

function Form({ onSubmit }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const [dirty, setDirty] = useState<Partial<FormValues>>()

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const isPossibleSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty?.email) && errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty?.password) && errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호 확인"
        name="rePassword"
        placeholder="비밀번호를 다시 입력해주세요"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty?.rePassword) && errors.rePassword}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="이름을 입력해주세요"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty?.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty?.name) && errors.name}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={!isPossibleSubmit}
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  display: flex;
  padding: 24px;
`

function validate(formValue: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValue.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValue.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  if (formValue.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  } else if (!validator.equals(formValue.rePassword, formValue.password)) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if (formValue.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

export default Form
