// HUGE thanks to coc-rime
// https://github.com/tonyfettes/coc-rime/blob/1f78456e56c4b17fc5de6d0d06f3a81bc829342d/src/ctype.ts#L23
export function isLowerAlpha(char: string): boolean {
  if (char.length !== 1) {
    return false
  }
  // Special case
  if (char === '.' || char === ',') {
    return true
  }
  const charCode = char.charCodeAt(0)
  if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
    return false
  } else if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) {
    return true
  } else {
    return false
  }
}
