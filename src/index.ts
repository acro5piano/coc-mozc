import {
  commands,
  ExtensionContext,
  window,
  languages,
  TextDocument,
  Position,
} from 'coc.nvim'
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

          while (isLowerAlpha(singleChar) && offset != 0) {
            inputString = singleChar + inputString
            offset -= 1
            singleChar = getPrevSingleChar(offset)
          }

          const items = await predict('いえす')
          return items.map((item) => ({
            label: item,
            sortText: inputString,
            filterText: inputString,
          }))
        },
      },
      [],
      1000,
      [],
    ),

    // workspace.registerKeymap(
    //   ['n'],
    //   'mozc-keymap',
    //   async () => {
    //     window.showMessage(`registerKeymap`)
    //   },
    //   { sync: false },
    // ),
    //
    // workspace.registerAutocmd({
    //   event: 'InsertLeave',
    //   request: true,
    //   callback: () => {
    //     window.showMessage(`registerAutocmd on InsertLeave`)
    //   },
    // }),
  )
}

// HUGE thanks to coc-rime
// https://github.com/tonyfettes/coc-rime/blob/1f78456e56c4b17fc5de6d0d06f3a81bc829342d/src/ctype.ts#L23
function _isAlpha(char: string): number {
  if (char.length != 1) {
    return 0
  }
  const charCode = char.charCodeAt(0)
  if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
    return 1
  } else if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) {
    return -1
  } else {
    return 0
  }
}

export function isAlpha(char: string): boolean {
  return (_isAlpha(char) != 0) as boolean
}

export function isLowerAlpha(char: string): boolean {
  return _isAlpha(char) === -1
}

export function isUpperAlpha(char: string): boolean {
  return _isAlpha(char) === 1
}
