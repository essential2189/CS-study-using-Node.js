import { Dict, position_enum } from "./Board.js";

export function bishop() {
  var self = this;
  self.bishop = { check_init, possiblePositions };

  function check_init(rank, file, type, count) {
    // black bishop
    if (type == "U+265D" && (file == "C" || file == "F") && rank == 1 && count[type] <= 2 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.black_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    } else if (type == "U+2657" && (file == "C" || file == "F") && rank == 8 && count[type] <= 2 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.white_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    } else {
      console.log("\n" + file + rank + "에 ♝을 놓을 수 없습니다.\n");
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
    left_up(file_idx, rank_idx, result);
    right_up(file_idx, rank_idx, result);
    right_down(file_idx, rank_idx, result);
    left_down(file_idx, rank_idx, result);

    return result;
  }
}
