import Text from '@components/common/Text'
import FixedBottomButton from '@components/common/FixedBottomButton'
import ListRow from '@components/common/ListRow'
import Top from '@components/common/Top'
import { getCard } from '@remote/card'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Flex from '@components/common/Flex'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

function CardPage() {
  const { id = '' } = useParams()
  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    enabled: id !== '',
  })

  if (data == null) return null

  const subTitle = data.promotion
    ? removeHtmlTags(data.promotion.title)
    : data.tags.join(', ')

  return (
    <div>
      <Top title={`${data.corpName} ${data.name}`} subTitle={subTitle} />
      <ul>
        {data.benefit.map((text, index) => {
          return (
            <motion.li
              initial={{ opacity: 0, translateX: -90 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
            >
              <ListRow
                as="div"
                key={text}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {data.promotion && (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(data.promotion.terms)}</Text>
        </Flex>
      )}

      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <path
        d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        fill="#6563ff"
      />
    </svg>
  )
}

function removeHtmlTags(text: string) {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }

  return output
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

export default CardPage