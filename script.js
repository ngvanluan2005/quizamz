let DEFAULT_POINTS = 4;
const pointElement = document.querySelector(".point");
const URLs =
  "https://gist.githubusercontent.com/cmota/f7919cd962a061126effb2d7118bec72/raw/96ae8cbebd92c97dfbe53ad8927a45a28f8d2358/questions.json";
const container = document.getElementById("container");
const getQuestion = () => {
  fetch(URLs)
    .then((response) => response.json())
    .then((data) => {
      handleData(data);
    });
};

const handleData = (data) => {
  const randomNumber = Math.floor(Math.random() * data.length);
  container.innerHTML = `
    <p class="question">
      Question: ${data[randomNumber].question}
    </p>
    <ul id="answer">
      <li class="answers">A. ${data[randomNumber].A}</li>
      <li class="answers">B. ${data[randomNumber].B}</li>
      <li class="answers">C. ${data[randomNumber].C}</li>
      <li class="answers">D. ${data[randomNumber].D}</li>
    </ul>
    `;
  clickedAnswer([...document.querySelectorAll(".answers")]);

  const check = document.getElementById("check");
  check.onclick = () => {
    checkAnswer(
      data[randomNumber].answer,
      !document.querySelector(".answers.fillColorSelected")
        ? alert("err")
        : document.querySelector(".answers.fillColorSelected")
    );
    getPoint();
    linhtinh();
  };
  document.getElementById("next").setAttribute("disabled", true);
  document.getElementById("next").classList.remove("enableNextButton");
};
window.addEventListener("load", () => {
  getQuestion();
  getPoint();
  localStorage.getItem("point") == null
    ? localStorage.setItem("point", DEFAULT_POINTS)
    : localStorage.setItem("point", localStorage.getItem("point"));
});

const clickedAnswer = (arrElement) => {
  arrElement.map((item) => {
    item.addEventListener("click", (e) => {
      handleClickedAnswer(e);
    });
  });
};
const handleClickedAnswer = (e) => {
  if (!document.querySelector(".fillColorSelected")) {
    funcAddClass(e, "fillColorSelected");
  } else {
    document
      .querySelector(".fillColorSelected")
      .classList.remove("fillColorSelected");
    funcAddClass(e, "fillColorSelected");
  }
};
const funcAddClass = (element, className) => {
  element.target.classList.add(className);
};
const checkAnswer = (answerCorrect, answerUser) => {
  if (answerCorrect == answerUser.textContent[0]) {
    answerUser.classList.add("fillCorrectColor");
    [...document.querySelectorAll(".answers")].map((item) => {
      item.style.pointerEvents = "none";
    });
    document.getElementById("next").removeAttribute("disabled");
    document.getElementById("next").classList.add("enableNextButton");
    localStorage.setItem("point", parseInt(localStorage.getItem("point")) + 1);
  } else {
    answerUser.classList.add("fillFailedColor");
    document.getElementById("next").setAttribute("disabled", true);
    document.getElementById("next").classList.remove("enableNextButton");
    localStorage.setItem("point", parseInt(localStorage.getItem("point")) - 2);
  }
};

const getPoint = () => {
  pointElement.innerHTML =
    "Current points: " + localStorage.getItem("point") || 0;
};
const linhtinh = () => {
  if (localStorage.getItem("point") < 0) {
    alert("ket thuc");
    document.body.innerHTML = `<div id="loser">BAN LA LOSER !<div>`;
  }
};
linhtinh();
const randomHexColor = () => {
  const CHARS = "0123456789abcdef";
  let str = "#";
  for (i = 0; i < 6; i++) {
    str += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return str;
};
const backgroundFill = () => {
  document.body.style.background = `linear-gradient(to right, ${randomHexColor()} , ${randomHexColor()})`;
};
setInterval(() => {
  backgroundFill();
}, 3000);
backgroundFill();
