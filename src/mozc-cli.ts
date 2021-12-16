import { Socket } from 'net'
import net from 'net'
import path from 'path'
import os from 'os'

async function main() {
  // const sock = new Socket({
  //   readable: true,
  //   writable: true,
  // })

  const socket = net.createConnection(
    // path.resolve(os.homedir(), '.mozc/.session.ipc'),
    '/run/user/1000/sway-ipc.1000.1424.sock',
    () => {
      console.log('connected')
    },
  )
  socket.on('error', (e) => {
    console.log(e)
  })
  socket.on('data', (data) => {
    console.log(String(data))
  })
  socket.write(format(4))
  setTimeout(() => {
    socket.destroy()
  }, 1000)
}

var constants = {
  MAGIC_STRING: 'i3-ipc',
}

function format(type: number) {
  const size = 0
  let msg = constants.MAGIC_STRING
  msg += packInt(size, type)
  return msg
}

// https://github.com/badboy/node-i3/blob/master/lib/node-i3.js
function packInt(size: number, type: number) {
  const args = Array.prototype.slice.call([size, type])
  let result = ''
  args.forEach(function (e) {
    result += String.fromCharCode(e & 0xff)
    result += String.fromCharCode((e >> 8) & 0xff)
    result += String.fromCharCode((e >> 16) & 0xff)
    result += String.fromCharCode((e >> 24) & 0xff)
  })
  return result
}

main()
