let ourBoxes = Array.from(document.querySelectorAll(".ticTacColumn > div"));
let PlayAganistPc = true;

const winningNumbers = {
  1: [0, 1, 2],
  2: [3, 4, 5],
  3: [6, 7, 8],
  4: [0, 3, 6],
  5: [1, 4, 7],
  6: [2, 5, 7],
  7: [0, 4, 8],
  8: [2, 4, 6]
};

const gameRules = () => {
  const init = () => {
    this.playerturn = "X";
    this.playerWon = null;
    this.gameFinished = false;
    this.timesPlayed = 0;
    this.aganistPC = PlayAganistPc;
    this.OurBoxesObject = {};
  };

  const changePlayerTurn = () =>
    this.playerturn === "X" ? (this.playerturn = "O") : (this.playerturn = "X");

  const setPlayerWon = arg =>
    arg === "X" || (arg === "O" ? (this.playerWon = arg) : null);

  const finishGame = () => {
    let newText = document.createElement("H1");
    newText.innerText = `${this.playerWon} Won the game`;
    document.getElementsByTagName("body")[0].append(newText);
    this.gameFinished = true;
  };

  const checkIfSomeWon = () => {
    const checkIfWonByArray = arr => {
      let xWon = true;
      let oWon = true;
      let allClicked = true;

      arr.map(num =>
        !this.OurBoxesObject[num].clicked
          ? (allClicked = false)
          : this.OurBoxesObject[num].classList.value === "X"
          ? (oWon = false)
          : this.OurBoxesObject[num].classList.value === "O"
          ? (xWon = false)
          : null
      );

      if (allClicked)
        if (oWon || xWon) {
          this.playerWon = this.OurBoxesObject[arr[0]].classList.value;
          finishGame();
        }
    };

    Object.keys(winningNumbers).map(key =>
      checkIfWonByArray(winningNumbers[key])
    );
  };

  const setBoxesObject = (arg, arg2) => (this.OurBoxesObject[arg] = arg2);

  const boxClicked = arg => (this.OurBoxesObject[arg].clicked = true);

  const setClickedAndChosen = (arg, arg2, arg3, arg4) => {
    this.OurBoxesObject[arg].classList.add(arg2);
    this.OurBoxesObject[arg].clicked = true;

    if (arg3 === 1) this.priority1 = true;
    else if (arg3 === 2) this.priority2 = true;

    this.timesPlayed++;

    if (arg4) checkIfSomeWon();
    return true;
  };

  const bestMove = () => {
    let ourNumbers = Object.keys(winningNumbers);

    let char = "X";
    let otherChar = "O";

    this.priority1 = false;
    this.priority2 = false;

    if (this.timesPlayed === 0) {
      if (this.OurBoxesObject[4].classList.value === char) {
        let random = Math.floor(Math.random() * 4);
        let randomFrom = [0, 2, 6, 8];
        return setClickedAndChosen(randomFrom[random], otherChar, 1);
      } else return setClickedAndChosen(4, otherChar, 1);
    } else {
      this.timesPlayed++;

      ourNumbers.find(key => {
        if (
          this.OurBoxesObject[winningNumbers[key][0]].classList.value ===
            otherChar &&
          this.OurBoxesObject[winningNumbers[key][1]].classList.value ===
            otherChar &&
          !this.OurBoxesObject[winningNumbers[key][2]].clicked
        )
          return setClickedAndChosen(
            winningNumbers[key][2],
            otherChar,
            1,
            true
          );
        else if (
          this.OurBoxesObject[winningNumbers[key][1]].classList.value ===
            otherChar &&
          this.OurBoxesObject[winningNumbers[key][2]].classList.value ===
            otherChar &&
          !this.OurBoxesObject[winningNumbers[key][0]].clicked
        )
          return setClickedAndChosen(
            winningNumbers[key][0],
            otherChar,
            1,
            true
          );
        else if (
          this.OurBoxesObject[winningNumbers[key][0]].classList.value ===
            otherChar &&
          this.OurBoxesObject[winningNumbers[key][2]].classList.value ===
            otherChar &&
          !this.OurBoxesObject[winningNumbers[key][1]].clicked
        )
          return setClickedAndChosen(
            winningNumbers[key][1],
            otherChar,
            1,
            true
          );
        else return false;
      });

      if (!this.priority1) {
        ourNumbers.find(key => {
          if (
            this.OurBoxesObject[winningNumbers[key][0]].classList.value ===
              char &&
            this.OurBoxesObject[winningNumbers[key][1]].classList.value ===
              char &&
            !this.OurBoxesObject[winningNumbers[key][2]].clicked
          )
            return setClickedAndChosen(winningNumbers[key][2], otherChar, 2);
          else if (
            this.OurBoxesObject[winningNumbers[key][1]].classList.value ===
              char &&
            this.OurBoxesObject[winningNumbers[key][2]].classList.value ===
              char &&
            !this.OurBoxesObject[winningNumbers[key][0]].clicked
          )
            return setClickedAndChosen(winningNumbers[key][0], otherChar, 2);
          else if (
            this.OurBoxesObject[winningNumbers[key][0]].classList.value ===
              char &&
            this.OurBoxesObject[winningNumbers[key][2]].classList.value ===
              char &&
            !this.OurBoxesObject[winningNumbers[key][1]].clicked
          )
            return setClickedAndChosen(winningNumbers[key][1], otherChar, 2);
          else return false;
        });
      }

      if (!this.priority2 && !this.priority1) {
        ourNumbers.find(key => {
          if (
            this.OurBoxesObject[winningNumbers[key][0]].classList.value ===
              char &&
            !this.OurBoxesObject[winningNumbers[key][2]].clicked &&
            !this.OurBoxesObject[winningNumbers[key][1]].clicked
          )
            return setClickedAndChosen(winningNumbers[key][2], otherChar);
          else if (
            this.OurBoxesObject[winningNumbers[key][2]].classList.value ===
              char &&
            !this.OurBoxesObject[winningNumbers[key][0]].clicked &&
            !this.OurBoxesObject[winningNumbers[key][1]].clicked
          )
            return setClickedAndChosen(winningNumbers[key][0], otherChar);
          else if (
            this.OurBoxesObject[winningNumbers[key][1]].classList.value ===
              char &&
            !this.OurBoxesObject[winningNumbers[key][2]].clicked &&
            !this.OurBoxesObject[winningNumbers[key][0]].clicked
          )
            return setClickedAndChosen(winningNumbers[key][2], otherChar);
          else return false;
        });
      }
    }
  };

  return {
    setPlayerWon,
    init,
    boxClicked,
    checkIfSomeWon,
    finishGame,
    bestMove,
    setBoxesObject,
    changePlayerTurn
  };
};

domLoad = () => {
  ourBoxes.map((box, ind) => {
    gameRules().setBoxesObject(ind, box);
    box.addEventListener("click", e => {
      if (!this.gameFinished) {
        if (!box.clicked) {
          if (this.playerturn === "X") box.classList.add("X");
          else if (this.playerturn === "O") box.classList.add("O");

          gameRules().boxClicked(ind);
          gameRules().checkIfSomeWon();

          if (this.aganistPC) gameRules().bestMove();
          else gameRules().changePlayerTurn();
        }
      }
    });
  });
};

window.addEventListener("load", () => {
  gameRules().init();
  domLoad();
});
