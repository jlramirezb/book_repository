//Class abstracta para validar los inputs
class BaseValidate {
  constructor() {
    this.computeEngine = new ComputeEngine.ComputeEngine();
    this.data = {
      status: 3,
      timer: 0,
      userInteraction: {},
      message: '',
      interaction: {
        correct: 0,
        incorrect: 0,
        forAnswer: 0,
      },
    };
  }
  resetData() {
    this.data = {
      status: 3,
      timer: 0,
      userInteraction: {},
      message: '',
      interaction: {
        correct: 0,
        incorrect: 0,
        forAnswer: 0,
      },
    };
  }

  validateEngine(def) {
    this.resetData();

    let { entrisModifid, conditions } = def;

    if (!entrisModifid) {
      console.error('Las entradas no estan definidas');
    }
    if (!conditions) {
      console.error('Las condiciones no estan definidas');
    }

    if (conditions.expected) {
      let ecuaMath = '';

      if (conditions.operator) {
        entrisModifid.forEach((entri, i) => {
          ecuaMath = `${
            ecuaMath + entri.value + (conditions.operator[i] ?? '')
          }`;
        });
      } else {
        entrisModifid.forEach((entri) => {
          ecuaMath = ecuaMath + entri.value;
        });
      }
      let expect = this.computeEngine.parse(ecuaMath);
      const result = { value: expect.evaluate().latex };
      entrisModifid.forEach((entri) => {
        this.aggClassValidate(
          entri?.fatherBg ?? entri,
          entrisModifid.some((e) =>
            this.validateEntri(conditions.expected, result),
          ),
        );
      });
    } else {
      if (entrisModifid.length !== conditions.length) {
        console.error(
          'Las entradas y las condiciones no tienen las mismas cantidades de elementos',
        );
        return;
      }

      conditions.forEach((condition, i) => {
        let entri = entrisModifid[i];
        if (condition.checks) {
          condition.checks;
          entri.checks.forEach((e, i) => {
            this.aggClassValidate(
              e.fatherBg ?? e,
              this.validateArraysInclues(condition.checks, e.value),
            );
          });
        } else {
          if (condition.expected) {
            let expect = this.computeEngine.parse(entri.value);
            console.log(expect.latex);
            expect.zero = true;
            let entriFalse = entri;
            if (condition.expected.some((a) => a === expect.latex)) {
              entriFalse = 'error';
              this.aggClassValidate(
                entri?.fatherBg ?? entri,
                this.validateEntri(condition.expected, entriFalse),
              );
            } else if (expect.evaluate().latex == '') {
              this.aggClassValidate(
                entri?.fatherBg ?? entri,
                this.validateEntri(condition.expected, entri),
              );
            } else {
              if (condition.operator) {
                let operator =
                  expect?.latex?.match(/([+*/-])/) ??
                  entri.value.match(/([+*/-])/);
                if (operator) {
                  if (operator[0] == condition?.operator) {
                    entriFalse.value = expect.evaluate(entriFalse.value).latex;
                    this.aggClassValidate(
                      entriFalse?.fatherBg ?? entriFalse,
                      this.validateEntri(condition.expected, entriFalse),
                    );
                    entriFalse.value = expect.latex;
                  } else {
                    entriFalse = 'error';
                    this.aggClassValidate(
                      entri?.fatherBg ?? entri,
                      this.validateEntri(condition.expected, entriFalse),
                    );
                  }
                } else {
                  entriFalse.value = 'error';
                  this.aggClassValidate(
                    entri?.fatherBg ?? entri,
                    this.validateEntri(condition.expected, entriFalse),
                  );
                }
              } else {
                entri.value = expect.evaluate().latex;
                this.aggClassValidate(
                  entri?.fatherBg ?? entri,
                  this.validateEntri(condition.expected, entri),
                );
              }
            }
          } else {
            this.aggClassValidate(
              entri?.fatherBg ?? entri,
              this.validateEntri(condition, entri),
            );
          }
        }
      });
    }

    if (
      this.data.interaction.incorrect < 1 &&
      this.data.interaction.forAnswer < 1
    ) {
      this.data.message = '¡Muy bien! Excelente';
      this.data.status = 1;
    } else {
      this.data.message = 'Revisa Valores Ingresados';
      this.data.status = 2;
    }
  }

  validateEntri(condition, entrada) {
    let entradaInput = [];
    entradaInput.push(Number(entrada.value));
    if (
      entrada.value === '' ||
      entrada.value === 'selecciona' ||
      entrada.value === '--'
    ) {
      return 'forAnswer';
    } else if (
      condition.some(
        (e) => e?.value ?? e == entrada?.value?.trim().toLowerCase(),
      )
    ) {
      //si condition no es un array se rompe
      return true;
    } else {
      return false;
    }
  }

  aggClassValidate(tag, classChange = 'forAnswer') {
    if (classChange === 'forAnswer') {
      tag.classList.remove('failedInLibrary');
      tag.classList.remove('passInLibrary');
      this.data.interaction.forAnswer++;
    } else if (classChange) {
      tag.classList.remove('failedInLibrary');
      tag.classList.add('passInLibrary');
      this.data.interaction.correct++;
      this.data.message = 'Muy bien, Excelente';
      this.data.status = 1;
    } else {
      tag.classList.remove('passInLibrary');
      tag.classList.add('failedInLibrary');
      this.data.interaction.incorrect++;
      this.data.status = 2;
      this.data.message = 'Hubo un error';
    }
  }
  validateArraysInclues(array, entrada) {
    if (entrada === '' || entrada === 'selecciona') {
      return 'forAnswer';
    } else if (array.includes(entrada)) {
      //si condition no es un array se rompe
      return true;
    } else {
      return false;
    }
  }
}
