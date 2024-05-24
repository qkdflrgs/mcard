import { colors } from '@styles/colorPalette'
import { css } from '@emotion/react'
import { MouseEvent } from 'react'
import Flex from './Flex'
import Text from './Text'

interface AgreementProps {
  children: React.ReactNode
}

interface AgreementTitleProps {
  checked: boolean
  children: React.ReactNode
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}

interface AgreementDescriptionProps {
  link?: string
  checked: boolean
  children: React.ReactNode
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}

function Agreement({ children }: AgreementProps) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

function AgreementTitle({ checked, children, onChange }: AgreementTitleProps) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} withCircle={true} />
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  link,
  checked,
  children,
  onChange,
}: AgreementDescriptionProps) {
  return (
    <Flex as="li">
      <Flex
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      )}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
    >
      <g id="Layer_28" data-name="Layer 28">
        {withCircle && (
          <path
            fill={checked ? colors.blue : colors.grey}
            d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
          />
        )}
        <path
          fill={checked ? colors.blue : colors.grey}
          d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
        />
      </g>
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`

export default Agreement
