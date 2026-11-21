#!/bin/bash
set -euo pipefail

BASE_URL="https://t.nil.ninja/phperkaigi/2026/code-battle"

fetch() {
  curl -fsS --create-dirs -o "archives/$2" "$BASE_URL/$1"
}

# Icons
fetch files/img/Lemnis/icon.png          files/img/Lemnis/icon.png
fetch files/img/ShotaArima/icon.jpg      files/img/ShotaArima/icon.jpg
fetch files/img/akamah/icon.png          files/img/akamah/icon.png
fetch files/img/okashoi/icon.png         files/img/okashoi/icon.png
fetch files/img/takaram/icon.png         files/img/takaram/icon.png
fetch files/img/tkooler-lufar/icon.png   files/img/tkooler-lufar/icon.png

# API
fetch api/games                  api/games.json
fetch api/games/1                api/games/1.json
fetch api/games/2                api/games/2.json
fetch api/games/3                api/games/3.json
fetch api/games/4                api/games/4.json
fetch api/games/5                api/games/5.json
fetch api/games/6                api/games/6.json
fetch api/games/7                api/games/7.json
fetch api/games/8                api/games/8.json
fetch api/games/9                api/games/9.json
fetch api/games/10               api/games/10.json
fetch api/games/11               api/games/11.json
fetch api/games/12               api/games/12.json
fetch api/games/13               api/games/13.json
fetch api/games/14               api/games/14.json
fetch api/games/15               api/games/15.json
fetch api/games/1/watch/ranking  api/games/1/watch/ranking.json
fetch api/games/2/watch/ranking  api/games/2/watch/ranking.json
fetch api/games/3/watch/ranking  api/games/3/watch/ranking.json
fetch api/games/4/watch/ranking  api/games/4/watch/ranking.json
fetch api/games/5/watch/ranking  api/games/5/watch/ranking.json
fetch api/games/6/watch/ranking  api/games/6/watch/ranking.json
fetch api/games/7/watch/ranking  api/games/7/watch/ranking.json
fetch api/games/8/watch/ranking  api/games/8/watch/ranking.json
fetch api/games/9/watch/ranking  api/games/9/watch/ranking.json
fetch api/games/10/watch/ranking api/games/10/watch/ranking.json
fetch api/games/11/watch/ranking api/games/11/watch/ranking.json
fetch api/games/12/watch/ranking api/games/12/watch/ranking.json
fetch api/games/13/watch/ranking api/games/13/watch/ranking.json
fetch api/games/14/watch/ranking api/games/14/watch/ranking.json
fetch api/games/15/watch/ranking api/games/15/watch/ranking.json
fetch api/tournaments/1          api/tournaments/1.json

# Fix tournament results
#
#   user_id: 3=okashoi 5=tkooler-lufar 7=Lemnis 10=takaram 14=akamah
jq -c '
  (.tournament.entries | map({key: (.user.user_id | tostring), value: .user}) | from_entries) as $users
  | .tournament.matches |= map(
      if   .round == 0 and .position == 1 then .winner_user_id = 10 | .player1_score = 89  | .player2_score = 74
      elif .round == 0 and .position == 3 then                          .player1_score = 71  | .player2_score = 50
      elif .round == 1 and .position == 0 then .player2 = $users["10"] | .winner_user_id = 10 | .player1_score = 179 | .player2_score = 160
      elif .round == 1 and .position == 1 then .winner_user_id = 7  | .player1_score = 268 | .player2_score = 367
      elif .round == 2 and .position == 0 then .player1 = $users["10"] | .player2 = $users["7"] | .winner_user_id = 10 | .player1_score = 141 | .player2_score = 200
      else . end)
' archives/api/tournaments/1.json > archives/api/tournaments/1.json.tmp
mv archives/api/tournaments/1.json.tmp archives/api/tournaments/1.json

# Rewrite labels of tournament participants
#
#   user_id: 2=ShotaArima 3=okashoi 5=tkooler-lufar 7=Lemnis 10=takaram 14=akamah
grep -rlE '"user_id":(2|3|5|7|10|14),' archives/api | sort | while read -r f; do
  jq -c '
    {"10": "優勝", "7": "準優勝", "3": "ベスト4", "14": "ベスト4", "5": "ベスト6", "2": "ベスト6"} as $labels
    | walk(
        if type == "object" and has("user_id") and has("label")
        then .label = ($labels[.user_id | tostring] // .label)
        else . end)
  ' "$f" > "$f.tmp"
  mv "$f.tmp" "$f"
done
