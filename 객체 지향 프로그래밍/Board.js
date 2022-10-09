import { pawn } from "./Pawn.js";
import { rook } from "./Rook.js";
import { queen } from "./Queen.js";
import { knight } from "./Knight.js";
import { bishop } from "./Bishop.js";

const p = new pawn();
const r = new rook();
const bi = new bishop();
const k = new knight();
const q = new queen();

export const Dict = {
  black_pieces: { "U+265F": "♟", "U+265E": "♞", "U+265D": "♝", "U+265C": "♜", "U+265B": "♛" },
  white_pieces: { "U+2659": "♙", "U+2658": "♘", "U+2657": "♗", "U+2656": "♖", "U+2655": "♕" },
  chess_pieces: { "U+265F": "♟", "U+265E": "♞", "U+265D": "♝", "U+265C": "♜", "U+265B": "♛", "U+2659": "♙", "U+2658": "♘", "U+2657": "♗", "U+2656": "♖", "U+2655": "♕" },
  white_score: 0,
  black_score: 0,

  count_black: { "U+265F": 0, "U+265E": 0, "U+265D": 0, "U+265C": 0, "U+265B": 0 },
  count_white: { "U+2659": 0, "U+2658": 0, "U+2657": 0, "U+2656": 0, "U+2655": 0 },

  score_list: { "U+265F": 1, "U+265E": 3, "U+265D": 3, "U+265C": 5, "U+265B": 9, "U+2659": 1, "U+2658": 3, "U+2657": 3, "U+2656": 5, "U+2655": 9 },
  board: {
    1: { A: ["U+265C"], B: ["U+265E"], C: ["U+265D"], D: ["."], E: ["U+265B"], F: ["U+265D"], G: ["U+265E"], H: ["U+265C"] },
    2: { A: ["U+265F"], B: ["U+265F"], C: ["U+265F"], D: ["U+265F"], E: ["U+265F"], F: ["U+265F"], G: ["U+265F"], H: ["U+265F"] },
    3: { A: ["."], B: ["."], C: ["."], D: ["."], E: ["."], F: ["."], G: ["."], H: ["."] },
    4: { A: ["."], B: ["."], C: ["."], D: ["."], E: ["."], F: ["."], G: ["."], H: ["."] },
    5: { A: ["."], B: ["."], C: ["."], D: ["."], E: ["."], F: ["."], G: ["."], H: ["."] },
    6: { A: ["."], B: ["."], C: ["."], D: ["."], E: ["."], F: ["."], G: ["."], H: ["."] },
    7: { A: ["U+2659"], B: ["U+2659"], C: ["U+2659"], D: ["U+2659"], E: ["U+2659"], F: ["U+2659"], G: ["U+2659"], H: ["U+2659"] },
    8: { A: ["U+2656"], B: ["U+2658"], C: ["U+2657"], D: ["."], E: ["U+2655"], F: ["U+2657"], G: ["U+2658"], H: ["U+2656"] },
  },
};

// enum
export const position_enum = {
  rank: ["1", "2", "3", "4", "5", "6", "7", "8"],
  file: ["A", "B", "C", "D", "E", "F", "G", "H"],
};
Object.freeze(position_enum);

export function Board() {
  this.initPiece = function (type, position) {
    let file = position.slice(0, -1);
    let rank = position.slice(-1);

    // black pieces 타입 check
    if (type == "U+265F") {
      let r_pawn = p.pawn.check_init(rank, file, type, Dict.count_black);
      if (r_pawn != false) {
        Dict.board = r_pawn;
        Dict.count_black[type] = Dict.count_black[type] + 1;
      }
    } else if (type == "U+265E") {
      let r_knight = k.knight.check_init(rank, file, type, Dict.count_black);
      if (r_knight != false) {
        Dict.board = r_knight;
        Dict.count_black[type] = Dict.count_black[type] + 1;
      }
    } else if (type == "U+265D") {
      let r_bishop = bi.bishop.check_init(rank, file, type, Dict.count_black);
      if (r_bishop != false) {
        Dict.board = r_bishop;
        Dict.count_black[type] = Dict.count_black[type] + 1;
      }
    } else if (type == "U+265C") {
      let r_rook = r.rook.check_init(rank, file, type, Dict.count_black);
      if (r_rook != false) {
        Dict.board = r_rook;
        Dict.count_black[type] = Dict.count_black[type] + 1;
      }
    } else if (type == "U+265B") {
      let r_queen = q.queen.check_init(rank, file, type, Dict.count_black);
      if (r_queen != false) {
        Dict.board = r_queen;
        Dict.count_black[type] = Dict.count_black[type] + 1;
      }
    }

    // white pieces 타입 check
    if (type == "U+2659") {
      let r_pawn = p.pawn.check_init(rank, file, type, Dict.count_white);
      if (r_pawn != false) {
        Dict.board = r_pawn;
        Dict.count_white[type] = Dict.count_white[type] + 1;
      }
    } else if (type == "U+2658") {
      let r_knight = k.knight.check_init(rank, file, type, Dict.count_white);
      if (r_knight != false) {
        Dict.board = r_knight;
        Dict.count_white[type] = Dict.count_white[type] + 1;
      }
    } else if (type == "U+2657") {
      let r_bishop = bi.bishop.check_init(rank, file, type, Dict.count_white);
      if (r_bishop != false) {
        Dict.board = r_bishop;
        Dict.count_white[type] = Dict.count_white[type] + 1;
      }
    } else if (type == "U+2656") {
      let r_rook = r.rook.check_init(rank, file, type, Dict.count_white);
      if (r_rook != false) {
        Dict.board = r_rook;
        Dict.count_white[type] = Dict.count_white[type] + 1;
      }
    } else if (type == "U+2655") {
      let r_queen = q.queen.check_init(rank, file, type, Dict.count_white);
      if (r_queen != false) {
        Dict.board = r_queen;
        Dict.count_white[type] = Dict.count_white[type] + 1;
      }
    }
    return Dict.board;
  };

  this.setPiece = function (type, position) {
    let file = position.slice(0, -1);
    let rank = position.slice(-1);

    Dict.board[rank][file] = type;
    return Dict.board;
  };

  this.move = function (from, to) {
    let from_file = from.slice(0, -1);
    let from_rank = from.slice(-1);
    let to_file = to.slice(0, -1);
    let to_rank = to.slice(-1);

    if (Dict.board[to_rank][to_file] == ".") {
      Dict.board[to_rank][to_file] = Dict.board[from_rank][from_file];
      Dict.board[from_rank][from_file] = ".";
      return true;
    }
    // from == to : black
    else if (Dict.board[to_rank][to_file] != "." && Dict.board[from_rank][from_file] in Dict.black_pieces && Dict.board[to_rank][to_file] in Dict.black_pieces) {
      return false;
    }
    // from == to : white
    else if (Dict.board[to_rank][to_file] != "." && Dict.board[from_rank][from_file] in Dict.white_pieces && Dict.board[to_rank][to_file] in Dict.white_pieces) {
      return false;
    }
    // from : black, to : white
    else if (Dict.board[to_rank][to_file] != "." && Dict.board[from_rank][from_file] in Dict.black_pieces && Dict.board[to_rank][to_file] in Dict.white_pieces) {
      Dict.black_score += Dict.score_list[Dict.board[to_rank][to_file]];
      Dict.board[to_rank][to_file] = Dict.board[from_rank][from_file];
      Dict.board[from_rank][from_file] = ".";

      if (to_rank == 8 && Dict.board[from_rank][from_file] == "U+265F") {
        Dict.board[to_rank][to_file] = "U+265B";
      }

      console.log("Black Score : " + Dict.black_score);
      console.log("White Score : " + Dict.white_score);
      return true;
    }
    // from : white, to : black
    else if (Dict.board[to_rank][to_file] != "." && Dict.board[from_rank][from_file] in Dict.white_pieces && Dict.board[to_rank][to_file] in Dict.black_pieces) {
      Dict.white_score += Dict.score_list[Dict.board[to_rank][to_file]];
      Dict.board[to_rank][to_file] = Dict.board[from_rank][from_file];
      Dict.board[from_rank][from_file] = ".";

      if (to_rank == 1 && Dict.board[from_rank][from_file] == "U+2659") {
        Dict.board[to_rank][to_file] = "U+2655";
      }

      console.log("Black Score : " + Dict.black_score);
      console.log("White Score : " + Dict.white_score);
      return true;
    } else {
      console.log("move error");
    }
  };

  this.display = function (dis_board = Dict.board) {
    let print_board = "  ABCDEFGH\n";
    for (let i in dis_board) {
      let temp = "";
      for (let j in dis_board[i]) {
        if (Dict.board[i][j] in Dict.chess_pieces) {
          temp += Dict.chess_pieces[Dict.board[i][j]];
        } else {
          temp += Dict.board[i][j];
        }
      }
      print_board += i + " " + temp + "\n";
    }
    print_board += "  ABCDEFGH" + "\n";
    return print_board;
  };

  this.score = function () {
    return [Dict.white_score, Dict.black_score];
  };
}
