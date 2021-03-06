#!/usr/bin/env bash

# Copy this file into /usr/bin/mozc_emacs_helper for CI testing

echo '((mozc-emacs-helper . t)(version . "2.23.2815.102")(config . ((preedit-method . roman))))'
while read; do
    echo '((emacs-event-id . 0)(emacs-session-id . 0)(output . ((id . "4699392882498462715")(mode . hiragana)(consumed . t)(preedit . ((cursor . 3)(segment ((annotation . underline)(value . "いえす")(value-length . 3)(key . "いえす")))))(candidates . ((size . 3)(candidate ((index . 0)(value . "イエス・キリスト")(annotation . ((description . "[全] カタカナ")))(id . 0))((index . 1)(value . "イエス")(annotation . ((description . "[全] カタカナ")))(id . 1))((index . 2)(value . "イエスキリスト")(annotation . ((description . "[全] カタカナ")))(id . 2)))(position . 0)(category . suggestion)(display-type . main)(footer . ((label . "Tabキーで選択")))(page-size . 9)))(status . ((activated . t)(mode . hiragana)(comeback-mode . hiragana)))(all-candidate-words . ((candidates ((id . 0)(index . 0)(key . "いえすきりすと")(value . "イエス・キリスト")(annotation . ((description . "[全] カタカナ"))))((id . 1)(index . 1)(value . "イエス")(annotation . ((description . "[全] カタカナ"))))((id . 2)(index . 2)(key . "いえすきりすと")(value . "イエスキリスト")(annotation . ((description . "[全] カタカナ")))))(category . suggestion))))))'
done
