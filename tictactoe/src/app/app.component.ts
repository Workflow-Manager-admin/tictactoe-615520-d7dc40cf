import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Game board represented as a 3x3 array
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  currentPlayer: 'X' | 'O' = 'X';
  winner: string | null = null;
  isDraw: boolean = false;

  // Make a move at the specified position
  makeMove(row: number, col: number): void {
    // Return if cell is already filled or game is over
    if (this.board[row][col] || this.winner || this.isDraw) {
      return;
    }

    // Place the current player's symbol
    this.board[row][col] = this.currentPlayer;

    // Check for winner
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
      return;
    }

    // Check for draw
    if (this.checkDraw()) {
      this.isDraw = true;
      return;
    }

    // Switch player
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  // Reset the game
  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
  }

  // Check for a winner
  private checkWinner(): boolean {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][0] === this.board[i][2]
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] &&
        this.board[0][i] === this.board[1][i] &&
        this.board[0][i] === this.board[2][i]
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] &&
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    ) {
      return true;
    }

    if (
      this.board[0][2] &&
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    ) {
      return true;
    }

    return false;
  }

  // Check for a draw
  private checkDraw(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }

  // Get game status message
  getStatus(): string {
    if (this.winner) {
      return `Player ${this.winner} wins!`;
    }
    if (this.isDraw) {
      return 'Game is a draw!';
    }
    return `Player ${this.currentPlayer}'s turn`;
  }
}
