import { spawn } from 'child_process'

export function parseEmacsMozcHelperResponse(response: string): string[] {
  const caps = response.matchAll(/value . "(.+?)"/g)
  const result: string[] = []
  for (const cap of caps) {
    if (cap[1] && !result.includes(cap[1])) {
      result.push(cap[1])
    }
  }
  return result
}

type PredictFn = (query: string) => Promise<string[]>

export async function createPool(): Promise<PredictFn> {
  const ps = spawn('mozc_emacs_helper')
  let seq = 0
  return new Promise((resolve) => {
    ps.stdout.once('data', (d) => {
      if (!String(d).includes('mozc-emacs-helper . t')) {
        throw new Error('Mozc initialization failed.')
      }
      function predict(query: string): Promise<string[]> {
        return new Promise((resolve) => {
          ps.stdout.once('data', (d) => {
            // ps.stdin.write(`(${seq} SendKey ${seq} enter)\n`)
            resolve(parseEmacsMozcHelperResponse(String(d)))
          })
          // ps.stdin.write(`(${seq} SendKey 0 "${query}")\n`)
          ps.stdin.write(`(${seq} SendKey ${seq} "${query}")\n`)
          seq++
        })
      }
      resolve(predict)
    })
  })
}
