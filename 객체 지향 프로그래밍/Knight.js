import { Dict, position_enum } from "./Board.js";

export function knight() {
  var self = this;
  self.knight = { check_init, possiblePositions };

  function check_init(rank, file, type, count) {
    // black knight
    if (type == "U+265E" && (file == "B" || file == "G") && rank == 1 && count[type] <= 2 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.black_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    }
    // white knight
    else if (type == "U+2658" && (file == "B" || file == "G") && rank == 8 && count[type] <= 2 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.white_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    } else {
      console.log("\n" + file + rank + "에 ♞을 놓을 수 없습니다.\n");
      return false;
    }
  }

  function possiblePositions(position) {
    let file = position.slice(0, -1);
    let rank = position.slice(-1);

    let file_enum = position_enum.file;
    let rank_enum = position_enum.rank;

    let file_idx = file_enum.indexOf(file);
    let rank_idx = rank_enum.indexOf(rank);
    let result = [];

    // 위 2칸 왼쪽 1칸
    function up2_left1(file_idx, rank_idx, result) {
      if (file_idx - 1 >= 0 && rank_idx - 2 >= 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx - 2]][file_enum[file_idx - 1]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx - 2]][file_enum[file_idx - 1]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx - 1] + rank_enum[rank_idx - 2]);
      }
    }
    // 위 2칸 오른쪽 1칸
    function up2_right1(file_idx, rank_idx, result) {
      if (file_idx + 1 < 8 && rank_idx - 2 >= 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx - 2]][file_enum[file_idx + 1]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx - 2]][file_enum[file_idx + 1]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx + 1] + rank_enum[rank_idx - 2]);
      }
    }
    // 위 1칸 오른쪽 2칸
    function up1_right2(file_idx, rank_idx, result) {
      if (file_idx + 2 < 8 && rank_idx - 1 >= 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx + 2]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx + 2]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx + 2] + rank_enum[rank_idx - 1]);
      }
    }
    // 아래 1칸 오른쪽 2칸
    function down1_right2(file_idx, rank_idx, result) {
      if (file_idx + 2 < 8 && rank_idx + 1 < 8) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx + 2]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx + 2]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx + 2] + rank_enum[rank_idx + 1]);
      }
    }
    // 아래 2칸 오른쪽 1칸
    function down2_right1(file_idx, rank_idx, result) {
      if (file_idx + 1 < 8 && rank_idx + 2 < 8) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx + 2]][file_enum[file_idx + 1]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx + 2]][file_enum[file_idx + 1]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx + 1] + rank_enum[rank_idx + 2]);
      }
    }
    // 아래 2칸 왼쪽 1칸
    function down2_left1(file_idx, rank_idx, result) {
      if (file_idx - 1 < 8 && rank_idx + 2 < 8) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx + 2]][file_enum[file_idx - 1]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx + 2]][file_enum[file_idx - 1]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx - 1] + rank_enum[rank_idx + 2]);
      }
    }
    // 아래 2칸 왼쪽 1칸
    function down1_left2(file_idx, rank_idx, result) {
      if (file_idx - 2 < 8 && rank_idx + 1 < 8) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx - 2]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx - 2]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx - 2] + rank_enum[rank_idx + 1]);
      }
    }
    // 위 1칸 왼쪽 2칸
    function up1_left2(file_idx, rank_idx, result) {
      if (file_idx - 2 >= 0 && rank_idx - 1 >= 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx - 2]] in Dict.white_pieces) {
          return;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx - 2]] in Dict.black_pieces) {
          return;
        }
        result.push(file_enum[file_idx - 2] + rank_enum[rank_idx - 1]);
      }
    }

    up2_left1(file_idx, rank_idx, result);
    up2_right1(file_idx, rank_idx, result);
    up1_right2(file_idx, rank_idx, result);
    down1_right2(file_idx, rank_idx, result);
    down2_right1(file_idx, rank_idx, result);
    down2_left1(file_idx, rank_idx, result);
    down1_left2(file_idx, rank_idx, result);
    up1_left2(file_idx, rank_idx, result);

    return result;
  }
}
