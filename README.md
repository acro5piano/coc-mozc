[![release](https://github.com/acro5piano/coc-mozc/actions/workflows/release.yml/badge.svg)](https://github.com/acro5piano/coc-mozc/actions/workflows/release.yml)
[![test](https://github.com/acro5piano/coc-mozc/actions/workflows/test.yml/badge.svg)](https://github.com/acro5piano/coc-mozc/actions/workflows/test.yml)

# coc-mozc

Mozc input method source for coc.nvim. It shows mozc suggestion to COC's completion list.

![image](https://user-images.githubusercontent.com/10719495/146517271-344c36dd-cf84-4707-abad-797bb859eebf.png)
![image](https://user-images.githubusercontent.com/10719495/146516289-1a794449-fd61-4e68-8a60-5c70eb12980d.png)

## Why

In terminal, it is hard to input Japanese with OS standard IME. With coc-mozc, you can input Japanese just like code suggestion.

## Install

### Prerequisite

`mozc_emacs_helper` is required!

For ubuntu:

```
sudo apt-get install emacs-mozc
```

### Install coc-mozc via `CocInstall`

```
:CocInstall coc-mozc
```

## Example settings

```vim
" Selects the first prediction by pressing Enter, meaning insert ひらがな
autocmd User MozcEnabled execute('inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"')
autocmd User MozcDisabled execute('inoremap <cr> <cr>')

" C-j toggles mozc mode
inoremap <expr> <C-j> execute(':CocCommand mozc.toggle')

" Disable mozc when insert leave
au InsertLeave * execute(':CocCommand mozc.disable')

```

# Known Issues & TODO

- Unable to convert partially
  - Ideally, cursor movement should trigger partial conversion
- No undo conversion feature
- SPACE should trigger conversion Kana to Kanji

## Inspired By

- https://github.com/tonyfettes/coc-rime/blob/master/src/index.ts
- https://github.com/yasuyuky/SublimeMozcInput

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
