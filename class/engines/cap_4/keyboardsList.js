const keyboardsLayouts = {
  numeric: {

    label: 'Números',
    rows: [

      ['1', '2', '3', '4',{ label: '[(]', shift: '\\lfloor', variants: ['\\lfloor', '\\lbrack', '\\lbrace', '\\vert'] },{ label: '[backspace]', width: 1 }],
      [ '5','6','7', '8',{ label: '[)]', shift: '\\rfloor', variants: ['\\rfloor', '\\rbrack', '\\rbrace', '\\vert'] },'-'],
      [  '9', '0','.', ',','[left]', '[right]'],
      // ["+", "-", { latex: "\\cdot", label: "*" }, "\\frac", ".", ",", "[left]", "[right]"],
    ]
  },

  functions: {

    label: 'Funciones',
    rows: [
      [{latex: '\\vert\\placeholder[]{}\\vert'},{ latex: 'f\\left(x\\right)', width: 2 }, { label: 'tan()', latex: '\\tan\\left(#?\\right)', shift: '\\tan^{-1}\\left(#?\\right)', width: 2 }, '\\sqrt{#?}',{ label: '[backspace]', width: 1 }],
      [{}, { label: 'cos()', latex: '\\cos\\left(#?\\right)', shift: '\\cos^{-1}\\left(#?\\right)', width: 2 },{ label: 'sin()', latex: '\\sin\\left(#?\\right)', shift: '\\sin^{-1}\\left(#?\\right)', width: 2 }, { label: 'ln()', latex: '\\ln\\left(#?\\right)' }, { label: '[shift]', width: 1 }],
      [{},{  latex:'\\frac{\\placeholder{}}{\\placeholder{}} '} ,'\\exponentialE^{#?}', { latex: '\\left(\\placeholder[]{}\\right)^2', }, '\\frac{1}{()}','[left]', '[right]']

    ],

  },

  symbols: {
    label: 'Símbolos',
    rows: [

      [{ label: '/', latex:'\\frac{\\placeholder{}}{\\placeholder{}} '} ,'+', '-','n', { latex: '\\cdot', label: '*' }, { latex: '\\lbrace', shift: '\\vert' }, { latex: '\\rbrace', shift: '\\vert' }, { latex: '\\cup', shift: '\\cap', variants: ['\\cap'] }, { label: '[backspace]', width: 1 }],
      [{ label: 'R', variants: ['Z'], shift: 'Z' },'x', 'y', '=',{ label: 'aᵇ', latex: '#@^{#?}' },   '\\nexists', '\\pi', '\\infty',{ label: '[shift]', width: 1 }],
      [';', '\\lfloor', '\\rfloor', 'c','\\lbrack', '\\rbrack','[left]', '[right]'],
    ]

  },





























  numericV2: {

    label: 'Números',
    rows: [

      ['1', '2', '3', '+', '=', { label: '[backspace]', width: 1 }],
      ['4', '5', '6', '-', 'x', 'y',],
      ['7', '8', '9', '\\cdot', '[(]', '[)]'],
      ['.', '0', ',', '\\frac', '[left]', '[right]'],



    ]
  },



  functionsV2: {

    label: 'Funciones',
    rows: [

      [{ latex: 'f\\left(x\\right)', width: 2 }, { latex: '#?^2', shift: { label: 'aᵇ', latex: '#@^{#?}' } }, '\\sqrt{#?}', '\\lbrace', '\\rbrace', { label: '[backspace]', width: 1 }],
      [{ label: 'sin()', latex: '\\sin\\left(#?\\right)', shift: { label: '\\sin^{-1}\\left(\\right)', latex: '\\sin^{-1}\\left(#?\\right)' }, width: 2 }, '\\ln\\left(\\right)', '\\exponentialE^{#?}', '\\lbrack', '\\rbrack', ';'],
      [{ label: 'cos()', latex: '\\cos\\left(#?\\right)', shift: { label: '\\cos^{-1}\\left(\\right)', latex: '\\cos^{-1}\\left(#?\\right)' }, width: 2 }, 'R', '\\infty', { label: '[(]', shift: '\\lfloor' }, { label: '[)]', shift: '\\rfloor' }, '\\cup'],
      [{ label: 'tan()', latex: '\\tan\\left(#?\\right)', shift: { label: '\\tan^{-1}\\left(\\right)', latex: '\\tan^{-1}\\left(#?\\right)' }, width: 2 }, '\\nexists', '\\pi', '[left]', '[right]', { label: '[shift]', width: 1 }]


    ]

  },


}