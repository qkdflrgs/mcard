import { FormValues } from '@models/signin'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import Flex from '@common/Flex'
import TextField from '@common/TextField'
import Button from '@common/Button'
import Spacing from '@common/Spacing'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import Text from '@common/Text'
import { colors } from '@styles/colorPalette'
import validator from 'validator'

interface FormProps {
  onSubmit: (formValues: FormValues) => void
}

function Form({ onSubmit }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
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
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={!isPossibleSubmit}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

function validate(formValue: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValue.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValue.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  return errors
}

export default Form
