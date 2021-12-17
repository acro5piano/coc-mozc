import test from 'ava'
import { alphabetToKana } from './alphabetToKana'

test('alphabetToKana', async (t) => {
  t.is(alphabetToKana('a'), 'あ')
  t.is(alphabetToKana('i'), 'い')
  t.is(alphabetToKana('iesu'), 'いえす')
  t.is(alphabetToKana('kaminari'), 'かみなり')
  t.is(alphabetToKana('yakuza'), 'やくざ')
  t.is(alphabetToKana('minnna'), 'みんな')
  t.is(alphabetToKana('indo'), 'いんど')
  t.is(alphabetToKana('kokkei'), 'こっけい')
  t.is(alphabetToKana('.'), '。')
  t.is(alphabetToKana(','), '、')
  t.is(alphabetToKana('iketeru,toomou'), 'いけてる、とおもう')
})
