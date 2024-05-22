import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'
import {
  collection,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}
