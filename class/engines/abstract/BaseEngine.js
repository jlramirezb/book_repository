class BaseEngine {
  constructor() {
    this.htmlNode = null;
    this.interactiveInputs = [];
    this.timerInteraction = 0;
    this.Timer = null;
    this.timerActive = false;
    this.validateStatus = true;
    this.onFocus = null;
  }

  initTimer() {
    /* agregar todos los eventos necesarios o que peudan tener el ejercicio */
    this.htmlNode.addEventListener('mouseenter', this.iniciarTimer);
    this.htmlNode.addEventListener('mouseleave', this.detenerTimer);
    this.htmlNode.addEventListener('input', (e) => {
      this.validateStatus = false;
      this.iniciarTimer(e);
    });
    this.htmlNode.addEventListener('blur', this.detenerTimer);
  }

  iniciarTimer = (e) => {
    if (this.timerActive) {
      // console.log('se llama pero no se crea otro timer');
      return;
    }
    this.onFocus = e.target;
    const onFocus = e.target;
    this.timerActive = true;
    this.Timer = setInterval(() => {
      if (this.onFocus.hasFocus && !this.onFocus.hasFocus()) {
        this.detenerTimer();
        return;
      }

      this.timerInteraction = this.timerInteraction + 1;
      console.log(this.timerInteraction);
    }, 1000);
  };

  detenerTimer = () => {
    // console.log('detener');
    this.timerActive = false;
    clearInterval(this.Timer);
    this.Timer = null;
  };

  resetTimer = () => {
    // console.log(`Tiempo transcurrido: ${this.timerInteraction} segundos;`);
    clearInterval(this.Timer);
    this.timerInteraction = 0;
  };

  validate = () => {
    if (this.validateStatus) {
      //status: posibles estatus
      //1: Correct
      //2: incorrect
      //3: notChange

      return { status: 3 };
    } else {
      this.validateStatus = !this.validateStatus;

      const dataMod = {
        ...this.validation.iniTMainValidations(
          this,
          this.conditions,
          this.defBoard,
        ),
        timer: this.timerInteraction,
      };

      this.resetTimer();
      this.detenerTimer();
      return dataMod;
    }
  };

  reset() {
    this.resetMain();
  }

  return() {
    this.returnMain();
  }

  eyowasa(inputs) {
    const mathfields = inputs.filter((input) => input.tagName === 'MATH-FIELD');

    mathfields.forEach((math) => {
      math.mathVirtualKeyboardPolicy = 'manual';
      math.addEventListener('focusin', () => {
        mathVirtualKeyboard.layouts = [
          {
            label: 'Números',
            rows: [
              [
                { class: 'contentLettersMathlive', label: '1', key: '1' },
                { class: 'contentLettersMathlive', label: '2', key: '2' },
                { class: 'contentLettersMathlive', label: '3', key: '3' },
                { class: 'contentLettersMathlive', label: '4', key: '4' },
                { class: 'contentLettersMathlive', label: '5', key: '5' },
                {
                  class: 'contentLettersMathliveAction',
                  label: '<svg class="SvgNormalize arrowLeftKeyboard"><svg>',
                  command: ['performWithFeedback', 'moveToPreviousChar'],
                },
                {
                  class: 'contentLettersMathliveAction',
                  label: '<svg class="SvgNormalize arrowRigthKeyboard"><svg>',
                  command: ['performWithFeedback', 'moveToNextChar'],
                },
              ],
              [
                { class: 'contentLettersMathlive', label: '6', key: '6' },
                { class: 'contentLettersMathlive', label: '7', key: '7' },
                { class: 'contentLettersMathlive', label: '8', key: '8' },
                { class: 'contentLettersMathlive', label: '9', key: '9' },
                { class: 'contentLettersMathlive', label: '0', key: '0' },
                { class: 'contentLettersMathlive', label: '=', key: '=' },
                {
                  class: 'contentLettersMathliveAction font-glyph bottom right',
                  label: '<svg class="iconDeleteKeyboard SvgNormalize"><svg>',
                  width: 1.5,
                  command: ['performWithFeedback', 'deleteBackward'],
                },
              ],
              [
                { class: 'contentLettersMathlive', label: '+', key: '+' },
                { class: 'contentLettersMathlive', latex: '-', key: '-' },
                { class: 'contentLettersMathlive', label: '*', key: '*' },
                {
                  class: 'contentLettersMathlive',
                  insert: '\\frac{\\placeholder{}}{\\placeholder{}}',
                },
                { class: 'contentLettersMathlive', insert: '\\div' },
                { class: 'contentLettersMathlive', insert: '/' },
                { class: 'contentLettersMathlive', label: '.', key: '.' },
                { class: 'contentLettersMathlive', label: ',', key: ',' },
              ],
              [
                { class: 'contentLettersMathlive', label: '(', key: '(' },
                { class: 'contentLettersMathlive', label: ')', key: ')' },
                { class: 'contentLettersMathlive', label: '{', key: '{' },
                { class: 'contentLettersMathlive', label: '}', key: '}' },
                { class: 'contentLettersMathlive', label: '[', key: '[' },
                { class: 'contentLettersMathlive', label: ']', key: ']' },
                { class: 'contentLettersMathlive', label: ';', key: ';' },
              ],
              [{ label: '[separator]', width: 0.5 }],
            ],
          },
          {
            label: 'Alfabeto',
            rows: [
              [
                { label: '[separator]', width: 0.5 },
                { class: 'contentLettersMathlive', label: 'q', key: 'q' },
                { class: 'contentLettersMathlive', label: 'w', key: 'w' },
                { class: 'contentLettersMathlive', label: 'e', key: 'e' },
                { class: 'contentLettersMathlive', label: 'r', key: 'r' },
                { class: 'contentLettersMathlive', label: 't', key: 't' },
                { class: 'contentLettersMathlive', label: 'y', key: 'y' },
                { class: 'contentLettersMathlive', label: 'u', key: 'u' },
                { class: 'contentLettersMathlive', label: 'i', key: 'i' },
                { class: 'contentLettersMathlive', label: 'o', key: 'o' },
                { class: 'contentLettersMathlive', label: 'p', key: 'p' },

                { label: '[separator]', width: 0.5 },
              ],
              [
                { label: '[separator]', width: 0.5 },
                { class: 'contentLettersMathlive', label: 'a', key: 'a' },
                { class: 'contentLettersMathlive', label: 's', key: 's' },
                { class: 'contentLettersMathlive', label: 'd', key: 'd' },
                { class: 'contentLettersMathlive', label: 'f', key: 'f' },
                { class: 'contentLettersMathlive', label: 'g', key: 'g' },
                { class: 'contentLettersMathlive', label: 'h', key: 'h' },
                { class: 'contentLettersMathlive', label: 'j', key: 'j' },
                { class: 'contentLettersMathlive', label: 'k', key: 'k' },
                { class: 'contentLettersMathlive', label: 'l', key: 'l' },
                {
                  class: 'contentLettersMathliveAction',
                  label: '<svg class="SvgNormalize arrowLeftKeyboard"><svg>',
                  command: ['performWithFeedback', 'moveToPreviousChar'],
                },
                {
                  class: 'contentLettersMathliveAction',
                  label: '<svg class="SvgNormalize arrowRigthKeyboard"><svg>',
                  command: ['performWithFeedback', 'moveToNextChar'],
                },
                { label: '[separator]', width: 0.5 },
              ],
              [
                { label: '[separator]', width: 0.5 },

                { class: 'contentLettersMathlive', label: 'z', key: 'z' },
                { class: 'contentLettersMathlive', label: 'x', key: 'x' },
                { class: 'contentLettersMathlive', label: 'c', key: 'c' },
                { class: 'contentLettersMathlive', label: 'v', key: 'v' },
                { class: 'contentLettersMathlive', label: 'b', key: 'b' },
                { class: 'contentLettersMathlive', label: 'n', key: 'n' },
                { class: 'contentLettersMathlive', label: 'm', key: 'm' },
                {
                  class: 'contentLettersMathliveAction font-glyph bottom right',
                  label: '<svg class="iconDeleteKeyboard SvgNormalize"><svg>',
                  width: 1.5,
                  command: ['performWithFeedback', 'deleteBackward'],
                },
              ],
            ],
          },
        ];
        mathVirtualKeyboard.show();
      });

      math.addEventListener('focusout', () => mathVirtualKeyboard.hide());
      math.addEventListener('focus', () => mathVirtualKeyboard.show());
    });
  }
}
