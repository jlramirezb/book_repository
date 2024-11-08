class UX {
  constructor() {}
  //agrega avisos sobre el board
  gAlerts({ data }) {
    let temp = document.querySelector('.containerBasePage');
    let inserttemp = `
      <div class="alert alert-success">
        <p class="alert-message"></p>
        <span class="alert-close"></span>
      </div>`;
    if (!temp.parentElement.querySelector('.alert')) {
      temp.insertAdjacentHTML('afterend', inserttemp);
    }

    let alert = document.querySelector('.alert');
    const message = alert.firstElementChild;
    const close = alert.lastElementChild;

    let timeoutId;

    function closeAlert() {
      alert.style.animation = 'close .5s ease-in-out 0s 1 normal forwards';
      clearTimeout(timeoutId); // Limpia el timeout cuando se cierra la alerta
    }

    function openAlert() {
      alert.style.animation = 'open .5s ease-in-out 0s 1 normal forwards';
      timeoutId = setTimeout(closeAlert, 3000); // Inicia un nuevo timeout cada vez que se abre la alerta
    }

    openAlert(); // Llama a la función para abrir la alerta

    if (data.status == 2) {
      alert.classList.remove(
        'alert-success',
        'alert-danger',
        'alert-error',
        'alert-send',
      );
      alert.classList.add('alert-error');
      message.innerText =
        data.message ?? '¡Tienes que interactuar con el artefacto!';
    } else if (data.status == 3) {
      alert.classList.remove(
        'alert-success',
        'alert-error',
        'alert-danger',
        'alert-send',
      );
      alert.classList.add('alert-danger');
      message.innerText =
        data.message ?? '¡Tienes que interactuar con el artefacto!';
    } else if (data.status == 1) {
      alert.classList.remove('alert-danger', 'alert-error', 'alert-success'),
        'alert-send';
      alert.classList.add('alert-success');
      message.innerText =
        data.message ?? '¡Tienes que interactuar con el artefacto!';
    } else if (data.status == 4) {
      alert.classList.remove('alert-success', 'alert-error', 'alert-danger');
      alert.classList.add('alert-send');
      message.innerText = data.message ?? '¡Enviado correctamente!';
    }

    close.addEventListener('click', closeAlert);
  }

  createHelpButton() {
    const helpButtonHtml = `<button class="helpButton styleBtn buttonKey"></button>

    
       <div class="emergenteWindow">
     
        <span class="buttonClosedEmergentWindow alert-close"></span>

        <div class="emergentWindowContentText">
        
        <svg class="IconMente" ></svg>  

        <p class=" alinear-derecha" >${this.def.helpArtifact.message} </p>
        </div>
       
        <div class="lineFondo">
         <div class="lineProcess"></div>
       </div>
         </div>
     
        `;
    const btnBase = this.htmlNode.querySelector('.btn-base');
    btnBase.insertAdjacentHTML('afterbegin', helpButtonHtml);
    this.helpButton = this.htmlNode.querySelector('.helpButton');

    this.emergenteWindow = this.htmlNode.querySelector('.emergenteWindow');
    const buttonClosed = this.htmlNode.querySelector(
      '.buttonClosedEmergentWindow',
    );
    this.line = this.htmlNode.querySelector('.lineFondo');

    document.addEventListener('DOMContentLoaded', () => {
      const auxiliarP = document.querySelector('.auxiliar');

      // Función para actualizar la opacidad del auxiliarP

      this.line.displayEmergentWindow = false;
      this.helpButton.displayEmergentWindow = false;
      // Llamada inicial por si el estado de displayEmergentWindow es verdadero en el arranque

      if (!this.helpButton.displayEmergentWindow) {
        this.helpButton.addEventListener('click', (event) => {
          this.htmlNode.parentElement.insertAdjacentElement(
            'afterEnd',
            this.emergenteWindow,
          );
          auxiliarP.style.opacity = '0.2';
          this.htmlNode.parentElement.style.opacity = '0.2';
          this.emergenteWindow.style.animation =
            'deployWindoworExercise .5s ease-out forwards';
          this.helpButton.displayEmergentWindow = true;
          this.line.displayEmergentWindow = true;
          this.emergenteWindow.displayEmergentWindow = true; // Actualiza la opacidad cuando se muestra la ventana emergente
          this.time = setTimeout(() => {
            this.emergenteWindow.querySelector('.lineProcess').style.animation =
              'growLine 5s ease-out forwards';
          }, 1000);

          if (this.line.displayEmergentWindow) {
            this.time = setTimeout(() => {
              if (this.emergenteWindow) {
                this.htmlNode.parentElement.style.opacity = '1';

                this.emergenteWindow.style.animation =
                  'closedWindoworExercise .5s ease-out forwards';
                this.emergenteWindow.style.position = 'fixed';
                //    this.emergenteWindow.querySelector('.lineProcess').style.animation = "shrinkline 1s ease-out forwards";
                this.line.displayEmergentWindow = false;
                auxiliarP.style = 'none';
              }
            }, 5800);
          }
        });
      }

      buttonClosed.addEventListener('click', (e) => {
        this.emergenteWindow.style.animation =
          'closedWindoworExercise .5s ease-out forwards';
        this.htmlNode.parentElement.style.opacity = '1';
        this.emergenteWindow.querySelector('.lineProcess').style.animation =
          'shrinkline .1s ease-out forwards';
        this.helpButton.displayEmergentWindow = false;
        this.emergenteWindow.style.position = 'fixed';

        console.log(clearTimeout(this.time));
        this.line.displayEmergentWindow = false;
        auxiliarP.style = 'none'; // Restaura la opacidad cuando se cierra la ventana emergente
      });
    });
  }
}
