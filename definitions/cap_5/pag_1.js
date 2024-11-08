const defBoards = {
  board_1: {
    artifact: 'artifact_1',
    styles: {
      boundingbox: [-4, 4, 4, -4],
      axies: {
        y: { visible: true },
        x: { visible: true },
      },
    },
  },
};
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js
const def = {
  scrollNav: {
    tittle: 'Diagrama Segmento Horizontal',
    lexico: 'Complete marcando los pasos. La P significa "pasos".',
  },
  artifacts: {
    artifact_1: {
      board: 'board_1',
      engine: VectorEngine,
      border: true,
      parent: 'lexico-content',
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: 'Error desde la def',
            //tiene que tener estos valores
            values: [['5']],
          },
        },
      },
    },

    artifact_raiting: {
      parent: 'scroll-container',
      questions: {
        question_1: {
          value: '¿Fue fácil?',
        },
      },
      engine: EngineOwner,
    },
  },
};

new CreateView(def, defBoards);
