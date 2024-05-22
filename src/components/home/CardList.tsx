import { getCards } from '@/remote/card'
import { useInfiniteQuery } from 'react-query'
import ListRow from '../common/ListRow'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => {
      return getCards(pageParam)
    },
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, fetchNextPage, isFetching])

  if (data == null) return null

  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback && <div>{card.payback}</div>}
                withArrow={true}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
