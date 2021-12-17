import test from 'ava'
import { parseEmacsMozcHelperResponse, createPool } from './mozc-cli'

test('parseEmacsMozcHelperResponse', async (t) => {
  const input =
    '((emacs-event-id . 0)(emacs-session-id . 0)(output . ((id . "4699392882498462715")(mode . hiragana)(consumed . t)(preedit . ((cursor . 3)(segment ((annotation . underline)(value . "いえす")(value-length . 3)(key . "いえす")))))(candidates . ((size . 3)(candidate ((index . 0)(value . "イエス・キリスト")(annotation . ((description . "[全] カタカナ")))(id . 0))((index . 1)(value . "イエス")(annotation . ((description . "[全] カタカナ")))(id . 1))((index . 2)(value . "イエスキリスト")(annotation . ((description . "[全] カタカナ")))(id . 2)))(position . 0)(category . suggestion)(display-type . main)(footer . ((label . "Tabキーで選択")))(page-size . 9)))(status . ((activated . t)(mode . hiragana)(comeback-mode . hiragana)))(all-candidate-words . ((candidates ((id . 0)(index . 0)(key . "いえすきりすと")(value . "イエス・キリスト")(annotation . ((description . "[全] カタカナ"))))((id . 1)(index . 1)(value . "イエス")(annotation . ((description . "[全] カタカナ"))))((id . 2)(index . 2)(key . "いえすきりすと")(value . "イエスキリスト")(annotation . ((description . "[全] カタカナ")))))(category . suggestion))))))'
  const res = parseEmacsMozcHelperResponse(input)
  t.deepEqual(res, ['いえす', 'イエス・キリスト', 'イエス', 'イエスキリスト'])
})

test.only('createPool', async (t) => {
  const predict = await createPool()
  const res1 = await predict('いえす')
  t.true(res1.length > 0)
  const res2 = await predict('いえす')
  t.true(res2.length > 0)
  t.deepEqual(res1, res2)
})
