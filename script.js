var PACMAN = PACMAN || {};
PACMAN.Function = PACMAN.Function || {};
PACMAN.Function.ExcutePacMan = (function () {

  const $actionElement = {
    inputX: $("#x_input"),
    inputY: $("#y_input"),
    inputFace: $("#face_input"),
    pacmanBtn: $("#place_pacman"),
    actionBtn: $(".btn"),
    gridElement: $("td"),
    report: $("#report_data"),
  };

  let initPacMan = false;
  const { inputX, inputY, inputFace } = $actionElement;
  let faceArray = ["north", "east", "south", "west"],
      faceIndex = 4;

  const Init = {

    Load: () => {
      $actionElement.pacmanBtn.on("click", function(e)  {
        e.preventDefault();
        Init.SetPacManIcon(inputX.val(), inputY.val(), inputFace.val());
      });

      $actionElement.actionBtn.on("click",function (e) {
        e.preventDefault();
        const command = $(this).data("action");
        if (initPacMan) {
          if (command == "move") {
            Init.MovePacMan();
          } else if (command == "left" || command == "right") {
            Init.RotatePacMan(command);
          } else if (command == "report") {
            Init.GenerateReport();
          }
        } else {
          alert("please place pacman");
          return false;
        }
      });
    },
    SetPacManIcon: (X, Y, Face, setValue = false) => {
      // clear DOM
      Init.ResetPacMan();
      initPacMan = true;
      $(`#${String(X)}${String(Y)}`).html(
          `<img class="pacman-img face-${Face}" id="pacman" src="images/pocman.png"/>`
      );

      if (setValue) {
        inputX.val(X);
        inputY.val(Y);
        inputFace.val(Face);
      }
    },

    ResetPacMan: () => {
      const tds = $actionElement.gridElement;
      Array.from(tds).forEach((td) => $(`${td.localName}#${td.id}`).html(""));
      $actionElement.report.html('')
    },

    MovePacMan: () => {
      let x = Number(inputX.val()),
          y = Number(inputY.val()),
          face = inputFace.val();

      switch (face) {
        case faceArray[0]:
          x = ++x > 4 ? 4 : x;
          break;
        case faceArray[2]:
          x = --x < 0 ? 0 : x;
          break;
        case faceArray[3]:
          y = --y < 0 ? 0 : y;
          break;
        case faceArray[1]:
          y = ++y > 4 ? 4 : y;
          break;
      }
      Init.SetPacManIcon(x, y, face, true);
    },

    RotatePacMan: (mode) => {
      let x = Number(inputX.val()),
          y = Number(inputY.val()),
          index = faceIndex;

      if (mode == "right") {
        index += 1;
        if (index > 3) {
          index = 0;
        }
      } else if (mode == "left") {
        index -= 1;
        if (index < 0) {
          index = 3;
        }
      }
      faceIndex = index;
      Init.SetPacManIcon(x, y, faceArray[faceIndex], true);
    },

    GenerateReport: () => {
      let x = Number(inputX.val()),
          y = Number(inputY.val()),
          face = inputFace.val();
      $actionElement.report.html(`Output: ${x},${y},${face.toUpperCase()}`);
    },
  };
  return Init;
})();

$(function () {
  "use strict";
  PACMAN.Function.ExcutePacMan.Load();
});
