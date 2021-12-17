![image](https://user-images.githubusercontent.com/10719495/146516289-1a794449-fd61-4e68-8a60-5c70eb12980d.png)

# coc-mozc

NeoVim の日本語入力を Mozc で出来るようにするプラグインです。 COC のサジェストのリストに表示されるようになります。

Mozc input method source for coc.nvim

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

# Known Issues

- 部分確定できない
  - カーソル移動をトリガーとして、部分的に確定したい
- c-h で戻った時に、今度は部分的に確定されてしまう
- ユーザーが下記のキーに何かしらのショートカットを設定している場合、切り替えの時点で奪ってしまう
  - TAB
  - S-TAB
  - CR
  - SPACE
- SPACE で候補選択するようになっているので、ローマ字として入力を確定させる方法が欲しい
  - 例えば、 `Vim は` と打とうとするとしんどい
  - F10 とかを実装すれば大丈夫そう
- Fcitx などの挙動に近づけるために、 SPACE で一個目の予測を選択、 CR でひらがなとして入力、としているが、やや分かりにくい
  - 特に英語と日本語の混じった文章を書く時に辛い
  - 入力中にひらがなとして表示されている状態が望ましい
  - SPACE や C-N は、最初の一回だけ 2 つ下に移動して欲しい
  - 大文字入力した時に候補が出なくて改行してしまうミスも引き起こす

上記の問題はありつつ、まあ一旦動くから良しとしている。

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
