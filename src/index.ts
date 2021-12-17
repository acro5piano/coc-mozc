import {
  commands,
  ExtensionContext,
  Range,
  window,
  languages,
  TextDocument,
  Position,
} from 'coc.nvim'
import { alphabetToKana, TRIGGER_KEYS } from './alphabetToKana'
import { createPool } from './mozc-cli'

export async function activate(context: ExtensionContext): Promise<void> {
  window.showMessage(`coc-mozc works!`)
  const predict = await createPool()

  context.subscriptions.push(
    commands.registerCommand('coc-mozc.Command', async () => {
      window.showMessage(`coc-mozc Commands works!`)
    }),

    languages.registerCompletionItemProvider(
      'mozc',
      'Mozc',
      null,
      {
        async provideCompletionItems(
          document: TextDocument,
          position: Position,
        ) {
          let offset = document.offsetAt(position)
          const getPrevSingleChar = (offset: number): string => {
            return document.getText({
              start: document.positionAt(offset - 1),
              end: document.positionAt(offset),
            })
          }

          let singleChar = getPrevSingleChar(offset)
          let inputString = ''

          while (TRIGGER_KEYS.includes(singleChar) && offset !== 0) {
            inputString = singleChar + inputString
            offset -= 1
            singleChar = getPrevSingleChar(offset)
          }

          const inputRange: Range = {
            start: document.positionAt(offset),
            end: position,
          }

          const query = alphabetToKana(inputString)
          const items = (await predict(query)).map((item) => ({
            label: item,
            sortText: inputString,
            filterText: inputString,
            textEdit: { range: inputRange, newText: item },
          }))
          return items
        },
      },
      TRIGGER_KEYS,
      1000,
      [],
    ),
  )
}
