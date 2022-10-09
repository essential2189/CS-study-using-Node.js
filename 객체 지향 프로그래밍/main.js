import { pawn } from "./Pawn.js";
import { rook } from "./Rook.js";
import { queen } from "./Queen.js";
import { knight } from "./Knight.js";
import { bishop } from "./Bishop.js";
import { Board, Dict } from "./Board.js";
import promptSync from "prompt-sync";

let b = new Board();

let p = new pawn();
let r = new rook();
let bi = new bishop();
let k = new knight();
let q = new queen();

function getInput() {
  const prompt = promptSync();

  const input = prompt("명령을 입력하세요> ");

  return input;
}

function main() {
  let print_board = b.display();
  console.log("\n체스 보드를 초기화 했습니다.");
  console.log("score 입력 시 점수 확인 가능합니다.");
  console.log("exit 입력 시 종료합니다.\n");
  console.log(print_board);

  let turn_white = true;
  let possible_result = [];
  while (1) {
    let input = getInput();

    if (input == "exit") {
      break;
    }

    // ? 명령어
    if (input.slice(0, 1) == "?") {
      let file = input.slice(1, -1);
      let rank = input.slice(-1);

      if (turn_white == true) {
        if (Dict.board[rank][file] in Dict.white_pieces) {
          if (Dict.white_pieces[Dict.board[rank][file]] == "♙") {
            possible_result = p.pawn.possiblePositions(file + rank);
          } else if (Dict.white_pieces[Dict.board[rank][file]] == "♘") {
            possible_result = k.knight.possiblePositions(file + rank);
          } else if (Dict.white_pieces[Dict.board[rank][file]] == "♗") {
            possible_result = bi.bishop.possiblePositions(file + rank);
          } else if (Dict.white_pieces[Dict.board[rank][file]] == "♖") {
            possible_result = r.rook.possiblePositions(file + rank);
          } else if (Dict.white_pieces[Dict.board[rank][file]] == "♕") {
            possible_result = q.queen.possiblePositions(file + rank);
          }
          console.log(possible_result);
        } else {
          console.log("\n백색 체스말의 차례입니다.\n");
        }
      } else {
        if (Dict.board[rank][file] in Dict.black_pieces) {
          if (Dict.black_pieces[Dict.board[rank][file]] == "♟") {
            possible_result = p.pawn.possiblePositions(file + rank);
          } else if (Dict.black_pieces[Dict.board[rank][file]] == "♞") {
            possible_result = k.knight.possiblePositions(file + rank);
          } else if (Dict.black_pieces[Dict.board[rank][file]] == "♝") {
            possible_result = bi.bishop.possiblePositions(file + rank);
          } else if (Dict.black_pieces[Dict.board[rank][file]] == "♜") {
            possible_result = r.rook.possiblePositions(file + rank);
          } else if (Dict.black_pieces[Dict.board[rank][file]] == "♛") {
            possible_result = q.queen.possiblePositions(file + rank);
          }
          console.log(possible_result);
        } else {
          console.log("\n흑색 체스말의 차례입니다.\n");
        }
      } // else
      console.log("\n");
    } // ? 명령어

    // 이동
    if (input.includes("->")) {
      let split_input = input.split(">");
      let from_file = split_input[0].slice(0, 1);
      let from_rank = split_input[0].slice(1, 2);
      let to_file = split_input[1].slice(0, 1);
      let to_rank = split_input[1].slice(1, 2);
      let move_result = 0;

      if (Dict.board[from_rank][from_file] in Dict.white_pieces) {
        if (turn_white == true) {
          if (Dict.white_pieces[Dict.board[from_rank][from_file]] == "♙") {
            possible_result = p.pawn.possiblePositions(from_file + from_rank);
          } else if (Dict.white_pieces[Dict.board[from_rank][from_file]] == "♘") {
            possible_result = k.knight.possiblePositions(from_file + from_rank);
          } else if (Dict.white_pieces[Dict.board[from_rank][from_file]] == "♗") {
            possible_result = bi.bishop.possiblePositions(from_file + from_rank);
          } else if (Dict.white_pieces[Dict.board[from_rank][from_file]] == "♖") {
            possible_result = r.rook.possiblePositions(from_file + from_rank);
          } else if (Dict.white_pieces[Dict.board[from_rank][from_file]] == "♕") {
            possible_result = q.queen.possiblePositions(from_file + from_rank);
          }
          if (possible_result.includes(to_file + to_rank)) {
            move_result = b.move(from_file + from_rank, to_file + to_rank);
            if (move_result) {
              turn_white = false;
            } else {
              console.log("\n1해당 위치로 이동 실패\n");
            }
          } else {
            console.log("\n2해당 위치로 이동 실패\n");
          }
        } else {
          console.log("\n흑색 체스말의 차례입니다.\n");
        }
      } else if (Dict.board[from_rank][from_file] in Dict.black_pieces) {
        if (turn_white == false) {
          if (Dict.black_pieces[Dict.board[from_rank][from_file]] == "♟") {
            possible_result = p.pawn.possiblePositions(from_file + from_rank);
          } else if (Dict.black_pieces[Dict.board[from_rank][from_file]] == "♞") {
            possible_result = k.knight.possiblePositions(from_file + from_rank);
          } else if (Dict.black_pieces[Dict.board[from_rank][from_file]] == "♝") {
            possible_result = bi.bishop.possiblePositions(from_file + from_rank);
          } else if (Dict.black_pieces[Dict.board[from_rank][from_file]] == "♜") {
            possible_result = r.rook.possiblePositions(from_file + from_rank);
          } else if (Dict.black_pieces[Dict.board[from_rank][from_file]] == "♛") {
            possible_result = q.queen.possiblePositions(from_file + from_rank);
          }
          if (possible_result.includes(to_file + to_rank)) {
            move_result = b.move(from_file + from_rank, to_file + to_rank);
            if (move_result) {
              turn_white = true;
            } else {
              console.log("\n1해당 위치로 이동 실패\n");
            }
          } else {
            console.log("\n2해당 위치로 이동 실패\n");
          }
        } else {
          console.log("\n백색 체스말의 차례입니다.\n");
        }
      } else {
        console.log("\n3해당 위치로 이동 실패\n");
      }
    } // 이동 명령

    if (input == "score") {
      let s = b.score();
      console.log("White Score : " + s[0]);
      console.log("Black Score : " + s[1]);
    }
    print_board = b.display();
    console.log("\n" + print_board);
  }
}

main();
