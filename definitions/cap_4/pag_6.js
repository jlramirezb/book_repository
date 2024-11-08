let defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-3, -2, -1, 1, 2, 3],
        yv: ['-3', '-2', '-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
      },
      grid: true,
      boundingbox: [-4, 6, 4, -2],
    },
  },
}

const def2 =
{

  artifact_2: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {
        mathEcuation: 'x^(2)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\left(\\right)^{2}',
        xCoords: [
          [
            -1.5, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 1.5
          ],
        ],

             
      },
    }
  },


}

const defQuiz = {
  artifact_1: {
    quizType: 'table',
    rendering: 'rendering_1',
    keyBoardProfile: ['numeric','functions','symbols'],
    quiz: {

      cells:
                [
                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    type: 'text',
                                    data: 'Tecla',
                                  }
                                ]
                    },
                    {
                      nodes:
                                [

                                  {
                                    //tipo de pregunta
                                    type: 'mathfield',
                                    //label,Answer,Validation
                                    data: {
                                      label: '',
                                      condition: 'left(right)^2',
                                      questionType: 'basic'
                                    }
                                  },

                                ]
                    },
                  ],
                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'Notación funcional',
                                    formato: {

                                    }
                                  }



                                ]
                    },

                    {
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'mathfieldSet',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: 'f\\left(x\\right)=\\placeholder[value_1]{}',
                                      condition: {
                                        value_1: 'x^2'
                                      },
                                      questionType: 'basic'
                                    }
                                  },
                                ]
                    },

                  ],
                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'Ecuación en dos variables',
                                    formato: {

                                    }
                                  }
                                ]
                    },

                    {
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'mathfieldSet',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: 'y=\\placeholder[value_1]{}',
                                      condition: {
                                        value_1: 'x^2',
                                      },
                                      questionType: 'basic'

                                    }
                                  },
                                ]
                    },

                  ],


                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'Pares ordenados',
                                    formato: {

                                    }
                                  }
                                ]
                    },

                    {
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'mathfieldSet',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: '\\left(x,\\placeholder[value_1]{})',
                                      condition: {
                                        value_1: 'x^2'
                                      },
                                      questionType: 'basic'
                                    }
                                  },
                                ]
                    },

                  ],

                ],
    }
  },

  artifact_3: {
    quizType: 'standard',
    rendering: 'rendering_2',
    keyBoardProfile:  ['numeric','functions','symbols'],
    quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'horizontal',
          nodes:
                        [
                          {
                            //tipo de pregunta
                            type: 'radio',
                            //label,Answer,Validation
                            data: {
                              label: `Si  x ∈ (0,1), ¿Quién es mayor entre x &nbsp y  &nbsp
                                    <math>
                                    <msup>
                                        <mi>x</mi>
                                        <mn>2</mn>
                                    </msup>
                                    </math> ?<br> &nbsp;`,
                              condition: '0',
                              optionList:
                                        [
                                          'x',
                                          `<math>
                                            <msup>
                                                <mi>x</mi>
                                                <mn>2</mn>
                                            </msup>
                                            </math>`,
                                        ],
                              questionType: 'expression'
                            }
                          },
                        ]
        },

        {
          layout: 'horizontal',
          nodes:
                        [
                          {
                            //tipo de pregunta
                            type: 'radio',
                            //label,Answer,Validation
                            data: {
                              label: `Si  x ∈ (1,3), ¿Quién es mayor entre x  &nbsp y  &nbsp
                                    <math>
                                    <msup>
                                        <mi>x</mi>
                                        <mn>2</mn>
                                    </msup>
                                    </math> ?<br> &nbsp;`,

                              condition: '1',
                              optionList:
                                        [

                                          'x',
                                          `<math>
                                            <msup>
                                                <mi>x</mi>
                                                <mn>2</mn>
                                            </msup>
                                            </math>`,

                                        ],
                              questionType: 'expression'
                            }
                          },
                        ]
        },
        {
          layout: 'horizontal',
          nodes:
                        [
                          {
                            //tipo de pregunta
                            type: 'radio',
                            //label,Answer,Validation
                            data: {
                              label: '¿La altura de la curva en 0.5 es igual a la altura de la curva en -0.5?',
                              condition: '0',
                              optionList:
                                        [
                                          'Si',
                                          'No',
                                        ],
                              questionType: 'expression'
                            }


                          },

                        ]
        },
      ],
    }
  },
  artifact_4: {
    quizType: 'standard',
    rendering: 'rendering_3',
    keyBoardProfile:  ['numeric','functions','symbols'],
    quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'horizontal',
          nodes:
                        [
                          {
                            //tipo de pregunta
                            type: 'radio',
                            //label,Answer,Validation
                            data: {
                              label: 'Las funciones que cumplen con ƒ(x)=ƒ(-x) &nbsp se llaman pares.<br> Y sus curvas son simetricas con respecto al eje vertical.<br> ¿La parábola es simetrica con respecto a &nbsp y?',
                              condition: '0',
                              optionList:
                                        [
                                          'Si',
                                          'No',
                                        ],
                              questionType: 'expression'
                            }
                          },
                        ]
        },
        {
          layout: 'horizontal',
          nodes:
                        [
                          {
                            //tipo de pregunta
                            type: 'radio',
                            //label,Answer,Validation
                            data: {
                              label: '¿Su fórmula cumple con ƒ(x)=ƒ(-x)?',
                              condition: '0',
                              optionList:
                                        [
                                          'Si',
                                          'No',
                                        ],
                              questionType: 'expression'
                            }



                          },
                        ]
        },
      ],
    }
  },
}

let def = {
  example_artifact_1: {

    variableX: '7',
    buttonsActive: false,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width: '250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]

    },
    defaultinput: {
      screen: { defaultText: [{ textValue: 'x', disabled: true }, { textValue: 'x^2', disabled: true }] },
      key: { defaultText: [{ textValue: '\\left(\\space\\right)^2', disabled: true }] }
    },
    conditions: {
      screen: [[], [], []],
      //    key: []
    }
  },
}

const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()

generateArtifact(def)

new GenerateArtifactsEngineAlphabet(def2, defBoards)