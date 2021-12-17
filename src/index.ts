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

export async function activate(context: ExtensionContext): Promise<void> {
  const predict = await createPool()

  let enabled = false

  async function enable() {
    enabled = true
    window.showMessage(`Mozc enabled!`)
    const changeMapScripts = [
      `inoremap <silent><expr> <space> pumvisible() ? \\"<C-n>\\" : \\"\<space>\\"`,
      `inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm() : \\"\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>\\"`,
      `inoremap <silent><expr> <tab> pumvisible() ? \\"<C-n>\\" : \\"\<tab>\\"`,
      `inoremap <silent><expr> <S-tab> pumvisible() ? \\"<C-p>\\" : \\"\<S-tab>\\"`,
    ]
    await Promise.all(
      changeMapScripts.map((script) =>
        workspace.nvim.eval(`execute("${script}")`),
      ),
    )
  }

  async function disable() {
    enabled = false
    window.showMessage(`Mozc disabled!`)
    const restoreMapScripts = [
      `inoremap <space> <space>`,
      `inoremap <cr> <cr>`,
      `inoremap <tab> <tab>`,
      `inoremap <S-tab> <S-tab>`,
    ]
    await workspace.nvim.eval('')
    await Promise.all(
      restoreMapScripts.map((script) =>
        workspace.nvim.eval(`execute("${script}")`),
      ),
    )
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
      10000,
      [],
    ),
  )
}
