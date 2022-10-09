import { Dict, position_enum } from "./Board.js";

export function pawn() {
  var self = this;
  self.pawn = { check_init, possiblePositions };

  function check_init(rank, file, type, count) {
    // black pawn
    if (type == "U+265F" && rank == 2 && count[type] <= 8 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.black_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    }
    // white pawn
    else if (type == "U+2659" && rank == 7 && count[type] <= 8 && Dict.board[rank][file] == ".") {
      try {
        Dict.board[rank][file] = Dict.white_pieces[type];
        return Dict.board;
      } catch (err) {
        console.log("\n잘못된 type입니다.\n");
        return false;
      }
    } else {
      console.log("\n" + file + rank + "에 ♟을 놓을 수 없습니다.\n");
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

    if (Dict.board[rank][file] in Dict.black_pieces) {
      if (rank_idx + 1 < 8) {
        result.push(file_enum[file_idx] + rank_enum[rank_idx + 1]);
      }
    } else if (Dict.board[rank][file] in Dict.white_pieces) {
      if (rank_idx - 1 >= 0) {
        result.push(file_enum[file_idx] + rank_enum[rank_idx - 1]);
      }
    }

    return result;
  }
}
