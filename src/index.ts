import {
  commands,
  ExtensionContext,
  Range,
  window,
  languages,
  TextDocument,
  Position,
  workspace,
} from 'coc.nvim'
import { alphabetToKana, TRIGGER_KEYS } from './alphabetToKana'
import { createPool } from './mozc-cli'

// 日本語を打てるようにするプラグインです。
// この文章もcoc-mozc で書いてます.
// zc で console.log になるようにしているので、 mozc と打つのが辛い。

export async function activate(context: ExtensionContext): Promise<void> {
  const predict = await createPool()

  let enabled = false

  const settings = {
    mozcPriority: Number(await workspace.nvim.getVar('mozc_priority')) || 10000,
  }

  async function enable() {
    enabled = true
    window.showMessage(`Mozc enabled!`)
    workspace.nvim.eval(`execute('doautocmd User MozcEnabled')`)
  }

  async function disable() {
    enabled = false
    window.showMessage(`Mozc disabled!`)
    workspace.nvim.eval(`execute('doautocmd User MozcDisabled')`)
  }

  context.subscriptions.push(
    commands.registerCommand('mozc.enable', enable),

    commands.registerCommand('mozc.disable', disable),

    commands.registerCommand('mozc.toggle', () => {
      if (enabled) {
        disable()
      } else {
        enable()
      }
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
          if (!enabled) {
            return []
          }
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
      settings.mozcPriority, // Maybe user does not use both Japanese input and normal input
      [],
    ),
  )
}
