class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  //============= la methode de la classe Question
  isCorrectAnswer(choice) {
    return choice === this.answer;
  }
}
// ================== creation des instances de la classe Question
const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];
// ================== création de la classe Quiz
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionsIndex = 0;
  }
  //============= les methodes de la classe Quiz
  getCurentQestion() {
    return this.questions[this.currentQuestionsIndex];
  }
  guess(answer) {
    if (this.getCurentQestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionsIndex++;
  }
  hasEnded() {
    return this.currentQuestionsIndex >= questions.length;
  }
}
//=============AFFICHER le QUIZ
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  // ===
  question: function () {
    this.elementShown("question", quiz.getCurentQestion().text);
  },
  // =====
  choices: function () {
    let choices = quiz.getCurentQestion().choices;
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    //  Affichage des choix + prise en compte du choix
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  // progess
  progres: function () {
    this.elementShown(
      "progress",
      `Question ${quiz.currentQuestionsIndex + 1} sur ${quiz.questions.length}
      `
    );
  },
  // ecran, de fin
  endQuiz: function () {
    let endQuizHTML = `
    <h1>Quiz terminé !</h1>
    <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length} </h3>
    `;
    this.elementShown("quiz", endQuizHTML);
  },
};

//============== LOGIQUE DU JEU
quizApp = () => {
  if (quiz.hasEnded()) {
    //Ecran de fin
    display.endQuiz();
  } else {
    // afficher quesion, choix et progression
    display.question();
    display.choices();
    display.progres();
  }
};

//==============Création de QUIZ
let quiz = new Quiz(questions);
quizApp();
