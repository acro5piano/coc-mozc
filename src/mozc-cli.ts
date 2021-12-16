import { Socket } from 'net'
import path from 'path'
import os from 'os'

async function main() {
  const sock = new Socket({
    readable: true,
    writable: true,
  })

  sock.connect(path.resolve(os.homedir(), '.mozc/.session.ipc'))

  sock
}

main()
