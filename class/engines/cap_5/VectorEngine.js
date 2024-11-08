class VectorEngine extends baseBoards {
  constructor(def, defBoard) {
    super(defBoard);
    this.allPoints = [];
    this.InputTarget = 0;
    this.targetInterval = 0;
    this.defBoard = defBoard;
    this.point = def?.point ?? {};
    this.idTemplate = def?.template?.id ?? 'temp-vector';
    this.conditions = def?.conditions ?? {};
    this.idboard = `${def.name}_board`;
    this.htmlNode = def?.template?.node ?? null;
    this.validation = new ValidationHorizontal(this.def);
    this.templateInsert();
    this.intervals = [];
    // this.lines = []
    this.activeStep = false;
    this.def = def;
  }

  templateInsert = () => {
    if (!document.querySelector('#temp-buttons')) {
      const buttonsTemplate = `
        <template id="temp-buttons">
          <button class="buttonTool styleBtn buttonTertiary buttonKey" title="value 1">1</button>
        </template>`;
      this.buttonsTemplate = buttonsTemplate;
      document.body.insertAdjacentHTML('afterend', this.buttonsTemplate);
    }

    if (!document.querySelector('#temp-vector')) {
      const $templateDefaults = `
        <template id="temp-vector">
          <div class="artifact-base  w-72 ms:w-80">
    
      <div class="statement-top border-solid border rounded-md border-black text-center">
        <input>asdasd</input>
      </div>
      <div id="cords" class="cords border-solid border rounded-md border-black textCenter w-full">
        <div class="text-nowrap gap-2 text-center border border-black rounded-md flex flex-row text-inline">
         ( 
          <math-field id="onefirstPoints" type="text" class="border border-black rounded-md  w-8 text-center"></math-field>, 
          <math-field id="oneSecondPoints" type="text" class="border border-black rounded-md  w-8 text-center"></math-field> 
          )( 
          <math-field id="twoFirstPoints" type="text" class="border border-black rounded-md  w-8 text-center"></math-field>, 
          <math-field id="twoSecondPoints" type="text" class="border border-black rounded-md  w-8 text-center"></math-field> 
          )
          <button class="bg-orange-400 rounded-md py-1 px-2" title="Segundo punto">Trazar</button>
        </div>
      </div>
      <div id="jxgbox" class="artifact-base border rounded-md w-full"></div>
    
      <div class="statement statement-bottom border-board-dark h-100 textCenter mt-1 mb-1"
        style="height: 100%; min-height: 30px; display: none;"></div>
      <div class="gap-2 text-center border border-black rounded-md flex flex-row">
        <math-field type="text" class="border border-black rounded-md w-12 text-center"></math-field>
        <math-field type="text" class="border border-black rounded-md w-12 text-center"></math-field>
        <math-field type="text" class="border border-black rounded-md w-12 text-center"></math-field>
        <math-field type="text" class="border border-black rounded-md w-12 text-center"></math-field>
      </div>
      <div class="all-btn border-board-dark">
        <div class="btn-base border-dark rounded">
          <div class="sectionBtn interactive-btn"></div>
          <div class="sectionBtn default-btn gap-2">
            <button class="reset styleBtn buttonSecundary buttonKey" title="Reset"></button>
            <button class="check styleBtn buttonPrimary buttonKey" title="Validar"></button>
          </div>
        </div>
      </div>
    </div>
        </template>`;
      this.template = $templateDefaults;
      document.body.insertAdjacentHTML('afterend', this.template);
    }

    this.tmpButton = document.querySelector('#temp-buttons');
    this.htmlNode = document
      .querySelector(`#${this.idTemplate}`)
      .content.firstElementChild.cloneNode(true);
    console.log(this);
    return this.htmlNode;
  };

  initEngine() {
    if (this.initBoardBase({ id: this.idboard, ...this.defBoard })) {
      console.log(this.board);
    }

    this.divCords = this.htmlNode.querySelector('#cords');
    this.pointCords = this.htmlNode.querySelectorAll('#cords math-field');

    this.divCords.addEventListener('input', () => {
      this.draw();
    });

    if (this.conditions.keyBoard && this?.defBoard?.topButtons) {
      this.htmlNode
        .querySelector('.statement-top')
        .addEventListener('click', (e) => {
          if (!e.target.classList.contains('buttonTool')) return;

          this.validateStatus = false;
          const interval = this.intervals[this.targetInterval];
          const mathfield = interval.inputs[this.InputTarget].mathfield;

          mathfield.value = e.target.textContent;

          if (this.InputTarget >= interval.inputs.length - 1) {
            this.InputTarget = 0;
          } else {
            this.InputTarget++;
          }

          if (this.targetInterval >= this.intervals.length - 1) {
            this.targetInterval = 0;
          } else {
            this.targetInterval++;
          }
        });

      this.htmlNode.querySelector('.statement-top').style.display = 'flex';
    }

    this.initTimer();
    if (this.defBoard?.slider === undefined) {
      const buttonContainer = this.htmlNode.querySelector('.default-btn');
      const curvesButton = buttonContainer.querySelector('.curves');
      if (curvesButton) curvesButton.style.display = 'none';
    }

    const curves = this.htmlNode.querySelector('.bton-tertiary');
    const statusCurvesBtn = this.defBoard?.btnSlider ?? true;
    if (!statusCurvesBtn) {
      curves.style.display = 'none';
    }

    this.statusInpModalidad = this.defBoard?.newInp ?? false;
    if (this.statusInpModalidad) {
      this.inputModalidate();
    }

    if (this.defBoard?.curioso ?? false) {
      this.eventos_points();
    }

    this.eyowasa(this.interactiveInputs);
  }
  draw() {
    const values = Array.from(this.pointCords).map((field) =>
      field.value !== '' ? Number(field.value) : null,
    );

    // Verifica que todos los valores sean válidos
    if (values.every((e) => e !== null)) {
      // Elimina los puntos anteriores
      this.board.removeObject(this.points);

      // Crea nuevas líneas con los valores actuales
      const lines = this.createLines({
        lines: [
          {
            points: [
              { x: values[0], y: values[1], style: { visible: true } },
              { x: values[2], y: values[3], style: { visible: true } },
            ],
            pointsStyle: { fixed: true },
            style: {
              straightFirst: true,
              straightLast: true,
              strokeColor: 'red',
              dash: 2,
              layer: 2,
            },
          },
        ],
      });

      // Actualiza los puntos con las nuevas referencias
      this.points = [lines[0].point1, lines[0].point2]; // Asegúrate de usar point2 aquí
    }
  }
  StepActivate() {
    this.sliderC.setAttribute({ fixed: !this.activeStep });
    const curves = this.htmlNode.querySelector('.bton-tertiary');
    if (!this.activeStep) {
      curves.classList.remove('buttonCurves');
      curves.classList.remove('curves');
      curves.classList.add('buttonCurvesclick');
      curves.classList.add('curvesClick');
      this.activeStep = !this.activeStep;
    } else {
      curves.classList.remove('curvesClick');
      curves.classList.remove('buttonCurvesclick');
      curves.classList.add('buttonCurves');
      curves.classList.add('curves');

      this.activeStep = !this.activeStep;
    }
  }

  setTopButtons(allButtons) {
    if (!allButtons) return;
    allButtons.forEach((item) => {
      const newButton =
        this.tmpButton.content.firstElementChild.cloneNode(true);
      newButton.textContent = item.value;
      this.htmlNode.querySelector('.statement-top').appendChild(newButton);
    });
  }

  eventos_points() {
    const prueba = this.interactiveInputs;

    prueba.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        const inp = input.value.trim();

        // Si el input está vacío, se borran los nombres
        if (inp === '') {
          this.visip.forEach((p, i) => {
            if (i > 0 && i < this.visip.length - 1) {
              p.setAttribute({ name: '' });
            }
          });
        } else {
          const parsedValue = parseInt(inp);
          if (!isNaN(parsedValue)) {
            this.visip.forEach((p, i) => {
              if (index === 0) {
                if (i > 0 && i < this.visip.length - 1) {
                  p.setAttribute({ name: parsedValue + i });
                }
              } else if (index === 1) {
                if (i > 0 && i < this.visip.length - 1) {
                  p.setAttribute({
                    name: parsedValue - (this.visip.length - 1 - i),
                  });
                }
              }
            });
          }
        }
      });
    });
  }

  reset() {
    if (this.statusInpModalidad) {
      this.interactiveInputs.forEach((input, i) => {
        input.value = this.defaultValues[i];
        input.disabled = false;
        input.style.pointerEvents = '';
        input.style.userSelect = '';
        input.style.border = '';
        input.style.opacity = '1';
        input.classList.remove('passInLibrary');
        input.classList.remove('failedInLibrary');
      });
    } else {
      this.interactiveInputs.forEach((input) => {
        input.value = '';
        input.classList.remove('passInLibrary');
        input.classList.remove('failedInLibrary');
      });
    }
    if (this.defBoard?.curioso ?? false) {
      this.visip.forEach((p, i) => {
        if (i > 0 && i < this.visip.length - 1) {
          p.setAttribute({ name: '' });
        }
      });
    }

    if (this.defBoard?.slider) {
      this.PointsAndCurves();
      this.pasos.forEach((c) => c.setAttribute({ visible: false }));
      this.resetClickedPoints();
      if (this.sliderC) this.sliderC.moveTo([-1.7, -1]);
    }
  }
}
