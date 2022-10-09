import { Dict, position_enum } from "./Board.js";

export function queen() {
  var self = this;
  self.queen = { check_init, possiblePositions };

  function check_init(rank, file, type, count) {
    // black queen
    if (type == "U+265B" && file == "E" && rank == 1 && count[type] <= 1 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.black_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    } // white rook
    else if (type == "U+2655" && file == "E" && rank == 8 && count[type] <= 1 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.white_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    } else {
      console.log("\n" + file + rank + "에 ♛을 놓을 수 없습니다.\n");
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

    function right(file_idx, rank_idx, result) {
      // 오른쪽 탐색
      while (file_idx < 7) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx]][file_enum[file_idx + 1]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx]][file_enum[file_idx + 1]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[++file_idx] + rank_enum[rank_idx]);
      }
    }
    function left(file_idx, rank_idx, result) {
      //왼쪽 탐색
      while (file_idx > 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx]][file_enum[file_idx - 1]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx]][file_enum[file_idx - 1]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[--file_idx] + rank_enum[rank_idx]);
      }
    }
    //위 탐색
    function up(file_idx, rank_idx, result) {
      while (rank_idx > 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[file_idx] + rank_enum[--rank_idx]);
      }
    }
    // 아래 탐색
    function down(file_idx, rank_idx, result) {
      while (rank_idx < 7) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[file_idx] + rank_enum[++rank_idx]);
      }
    }
    // 대각 왼쪽 위 탐색
    function left_up(file_idx, rank_idx, result) {
      while (rank_idx > 0 && file_idx > 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx - 1]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx - 1]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[--file_idx] + rank_enum[--rank_idx]);
      }
    }
    // 대각 오른쪽 위 탐색
    function right_up(file_idx, rank_idx, result) {
      while (rank_idx > 0 && file_idx < 7) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx + 1]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx - 1]][file_enum[file_idx + 1]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[++file_idx] + rank_enum[--rank_idx]);
      }
    }
    //대각 오른쪽 아래 탐색
    function right_down(file_idx, rank_idx, result) {
      while (rank_idx < 7 && file_idx < 7) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx + 1]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx + 1]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[++file_idx] + rank_enum[++rank_idx]);
      }
    }
    // 대각 왼쪽 아래 탐색
    function left_down(file_idx, rank_idx, result) {
      while (rank_idx < 7 && file_idx > 0) {
        if (Dict.board[rank][file] in Dict.white_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx - 1]] in Dict.white_pieces) {
          break;
        } else if (Dict.board[rank][file] in Dict.black_pieces && Dict.board[rank_enum[rank_idx + 1]][file_enum[file_idx - 1]] in Dict.black_pieces) {
          break;
        }
        result.push(file_enum[--file_idx] + rank_enum[++rank_idx]);
      }
    }

    right(file_idx, rank_idx, result);
    left(file_idx, rank_idx, result);
    up(file_idx, rank_idx, result);
    down(file_idx, rank_idx, result);
    left_up(file_idx, rank_idx, result);
    right_up(file_idx, rank_idx, result);
    right_down(file_idx, rank_idx, result);
    left_down(file_idx, rank_idx, result);

    return result;
  }
}
