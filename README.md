[![release](https://github.com/acro5piano/coc-mozc/actions/workflows/release.yml/badge.svg)](https://github.com/acro5piano/coc-mozc/actions/workflows/release.yml)
[![test](https://github.com/acro5piano/coc-mozc/actions/workflows/test.yml/badge.svg)](https://github.com/acro5piano/coc-mozc/actions/workflows/test.yml)


# coc-mozc

NeoVim の日本語入力を Mozc で出来るようにするプラグインです。 COC のサジェストのリストに表示されるようになります。

Mozc input method source for coc.nvim

![image](https://user-images.githubusercontent.com/10719495/146517271-344c36dd-cf84-4707-abad-797bb859eebf.png)
![image](https://user-images.githubusercontent.com/10719495/146516289-1a794449-fd61-4e68-8a60-5c70eb12980d.png)


## Why

In terminal, it is hard to input Japanese with OS standard IME. With coc-mozc, you can input Japanese just like code suggestion.

## Install

Prerequisite

- `mozc_emacs_helper` is required!

For ubuntu:

```
sudo apt-get install emacs-mozc
```

```
:CocInstall coc-mozc
```

## Example settings

```vim
" Leader + z toggles mozc mode
nmap <silent> <Leader>z :CocCommand mozc.toggle<CR>
```

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
