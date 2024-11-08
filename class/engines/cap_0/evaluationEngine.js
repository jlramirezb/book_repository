

//validar los campos
//___________Primera Funcion a utilizar por web y Movil______________//
const LOCAL_STORAGE_KEY = 'resultadoExamen';
const LOCAL_COLORS_KEY = 'colorsExamen';
let  LOCAL_DATOS_KEY;
try{


let pathname = new URL(document?.referrer??"")?.pathname
let idEnroll = pathname.split("/")[pathname.split("/").length -1]?? "ConfigData"
let personalInformation = JSON.parse(localStorage.getItem(idEnroll))
LOCAL_DATOS_KEY = idEnroll;
}
catch(err){
 LOCAL_DATOS_KEY = "ConfigData";

}
const exams = {
    model_1: [[1, 9, 17], [1, 9, 17, 25]],
    model_2: [[2, 10, 18], [2, 10, 18, 26]],
    model_3: [[3, 11, 19], [3, 11, 19, 27]],
    model_4: [[4, 12, 20], [4, 12, 20, 28]],
    model_5: [[5, 13, 21], [5, 13, 21, 29]],
    model_6: [[6, 14, 22], [6, 14, 22, 30]],
    model_7: [[7, 15, 23], [7, 15, 23, 31]],
    model_8: [[8, 16, 24], [8, 16, 24, 32]],
    model_9: [[5, 9, 21], [7, 12, 20, 31]],
    model_10: [[2, 12, 21], [6, 13, 24, 27]],
    model_11: [[5, 16, 19], [5, 14, 20, 32]],
    model_12: [[8, 9, 24], [6, 13, 17, 29]],
    model_13: [[1, 12, 24], [7, 12, 22, 25]],
    model_14: [[7, 14, 19], [4, 10, 24, 30]],
    model_15: [[4, 16, 18], [8, 10, 21, 28]],
    model_16: [[2, 9, 20], [5, 11, 23, 32]],
    model_17: [[4, 15, 24], [8, 16, 22, 28]],
    model_18: [[6, 14, 17], [5, 12, 19, 29]],
    model_19: [[7, 11, 20], [7, 13, 18, 26]],
    model_20: [[6, 16, 19], [1, 10, 18, 29]]
}

const artefactaux = ['artifact_1', 'artifact_2', 'artifact_3'];

let userObject = inicializarExamen(LOCAL_DATOS_KEY);
let evaluacion = inicializarExamen(LOCAL_STORAGE_KEY);
let colorBorders = inicializarExamen(LOCAL_COLORS_KEY);



function inicializarExamen(key) {
    let resultadosGuardados, colorsBorders, Datos;
    if (key === LOCAL_STORAGE_KEY) {
        resultadosGuardados = cargarResultados(key);
        if (resultadosGuardados) {
            return resultadosGuardados; // Usar los datos cargados para continuar
        }
        else {
            console.log("No se encontraron puntuaciones previas. Iniciando nuevo examen.");
            // Inicializar un nuevo objeto de resultados con puntuaciones en 0 para las preguntas
            resultadosGuardados = [];
            resultadosGuardados.push({ id: 'P1', items: [0, 0], tiempo: 0, intentos: 0 });
            resultadosGuardados.push({ id: 'P2', items: [0, 0], tiempo: 0, intentos: 0 });
            resultadosGuardados.push({ id: 'P3', items: [0, 0], tiempo: 0, intentos: 0 });
            resultadosGuardados.push({ id: 'P4', items: [0, 0, 0], tiempo: 0, intentos: 0 });
            resultadosGuardados.push({ id: 'P5', items: [0, 0, 0, 0], tiempo: 0, intentos: 0 });
            resultadosGuardados.push({ id: 'P6', items: [0, 0, 0], tiempo: 0, intentos: 0 });
            resultadosGuardados.push({ id: 'P7', items: [0, 0, 0, 0], tiempo: 0, intentos: 0 });
            resultadosGuardados.push({ id: 'NF', resultado: 0 });
            localStorage.setItem(key, JSON.stringify(resultadosGuardados));
            return resultadosGuardados; // Devolver el nuevo objeto inicializado
        }
    }
    else if (key === LOCAL_COLORS_KEY) {
        colorsBorders = cargarResultados(key);
        if (colorsBorders) {
            return colorsBorders; // Usar los datos cargados para continuar      
        }
        else {
            console.log("No se encontraron colores previos. Iniciando nuevo examen.");
            // Inicializar un nuevo objeto de resultados con puntuaciones en 0 para las preguntas  
            const colorsBorders = {};
            for (let i = 0; i <= 6; i++) {
                colorsBorders[i] = "#217E9D";
            }
            localStorage.setItem(key, JSON.stringify(colorsBorders));
            return colorsBorders;
        }
    }
    else if (key === LOCAL_DATOS_KEY) {
        Datos = cargarResultados(key);
        if (Datos) {
            //delete Datos;
            return Datos; // Usar los datos cargados para continuar
        }
        else {
            Datos = {

                //A nivel de usuario
                'idUser': '671913c57752cea29edff428',
                'firstName': 'estudiante',
                'secondName': 'estudiante',
                'surname': 'estudiante',
                'secondSurname': 'estudiante',
                'gender': 'Masculino',
                'email': 'estudiante@gmail.com',

                //A nivel de usuario
                //A nivel de curso Matriculado

                'courseName': 'Fragata',
                'chapter': 'Capítulo 0',
                'category': 'Educacion_media',
                'liceo': 'U.E.N. BEATRIZ DE RODRÍGUEZ',
                'universidad': '',
                'availabilityStartDate': '01-01-2022 00:00:00',
                'availabilityEndDate': '01-01-2025 00:00:00',
                "sections": "B",

                //A nivel de curso matriculado
                //A nivel de Evaluacion
                'evaluationModel': 'model_1',
                'result': [],
                'userStartTime': 0,
                'userEndTime': 0,
                //A nivel de evaluacion


            }
            localStorage.setItem(key, JSON.stringify(Datos));
            return Datos; // Devolver el nuevo objeto inicializado
        }
    }
}

function cargarResultados(key) {
    let resultadosGuardados = localStorage.getItem(key);

    if (resultadosGuardados) {
        return resultadosGuardados = JSON.parse(resultadosGuardados);
    }

    return null; // Si no hay datos guardados
}

function userDatevalidation() {
    //let userObject = inicializarExamen(LOCAL_DATOS_KEY);
    const requiredProperties = ['courseName','idUser', 'evaluationModel', 'firstName', 'secondName', 'surname', 'secondSurname', 'gender', 'email', 'userStartTime', 'userEndTime', 'result', 'availabilityStartDate', 'availabilityEndDate', 'chapter'];
    const allExist = requiredProperties.filter(prop => !(prop in userObject));

    if (allExist.length > 0) {
        console.log('Agregar Propiedades faltantes: ' + allExist.join(', '));
        return false;
    }
    // console.log('result ', userObject.result)
    if (userObject.result.length >0) {

        document.getElementById('rules').style.display = 'none';
        document.getElementById('after').style.display = 'none';
        document.getElementById('paginaExamen').style.display = 'none';
        showResuls(userObject, userObject.result);
        return true
    }

    console.log("Iniciando VAlidacion fecha", userObject.availabilityStartDate, userObject.availabilityEndDate)
    let { state, message } = validateDates(userObject.availabilityStartDate, userObject.availabilityEndDate)
    if (state) {
        setHeaderData(userObject)
        document.getElementById('rules').style.display = 'block';
        document.getElementById('buttonRule').addEventListener('click', () => {
            document.getElementById('rules').style.display = 'none';
            document.getElementById('resultadoPagina').style.display = 'none';
            document.getElementById('paginaExamen').style.display = 'block';
            const now = new Date();
            console.log(now)
            const nowUTC = now.getTime() - (-240 * 60 * 1000); // Convertir a UTC
            console.log(nowUTC)
            userObject.userStartTime = nowUTC;
            localStorage.setItem(LOCAL_DATOS_KEY, JSON.stringify(userObject));
            generateEvaluationArtifacts(userObject);
            let validar = document.querySelectorAll('.check');
            // Eliminar el primer elemento del NodeList 'validar'
            validar = Array.from(validar).slice(1);
            const propiedadesRdef = Object.keys(rDef).slice(1);
            evaluacion = valida(validar, evaluacion, def, artefactaux, colorBorders, propiedadesRdef);

            let resets = document.querySelectorAll('.reset');
            // Eliminar el primer elemento del NodeList 'resets'
            resets = Array.from(resets).slice(1);
            evaluacion = cleanArt(resets, evaluacion, colorBorders);
            // Ejecutar la función y actualizar el resultado
            evaluacion = calcularResultadoTotal(evaluacion);
            mostrarModal(userObject)

        })
    }

    // aqui puedes decidir no mostrar el examen 

    console.log(message)
    return false;
}

function mostrarModal(userObject) {
    // Obtener elementos
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const confirmBtn = document.getElementById("confirmBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    // Cuando el usuario haga clic en el botón "Enviar Evaluación", abrir el modal
    openModalBtn.onclick = function () {
        modal.style.display = "block";
    }

    // Cuando el usuario haga clic en "Sí", se puede manejar la lógica para enviar la evaluación
    confirmBtn.onclick = function () {
        document.getElementById('paginaExamen').style.display = 'none';
        document.getElementById('resultadoPagina').style.display = 'block';
        const now = new Date();
        // console.log(now)
        const nowUTC = now.getTime() - (-240 * 60 * 1000); // Convertir a UTC
        // console.log(nowUTC)
        userObject.userEndTime = nowUTC;
        userObject.result = evaluacion;
        localStorage.setItem(LOCAL_DATOS_KEY, JSON.stringify(userObject));
        // console.log(userObject.userEndTime,userObject.userStartTime)
        let timeElapsed = (((((userObject.userEndTime - userObject.userStartTime)/1000)).toFixed(1))/60).toFixed(1);
        // console.log('elapsed time ', timeElapsed);
        const spanTime = document.getElementById('tiempo');
        spanTime.textContent = `${timeElapsed} min`;
        showResuls(userObject, evaluacion);
        // console.log('Evaluacion', evaluacion);
        modal.style.display = "none";
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Cuando el usuario haga clic en "No", cerrar el modal
    cancelBtn.onclick = function () {
        modal.style.display = "none";
    }

    // Cuando el usuario haga clic fuera del modal, cerrarlo
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function showResuls(data, evaluation) {

    let totalSum = 0;
    let itemsToSum =   data.result.slice(0, -1);
    itemsToSum.forEach(item => {
        totalSum += item.items.reduce((acc, val) => acc + val, 0);
    });
    data.result[data.result.length -1].resultado = totalSum
    let toSend = {
        "idUser": data.idUser,
        "idExam": data.idExam,

        "firstName": data.firstName,
        "secondName": data.secondName,
        "surname": data.surname,
        "secondSurname": data.secondSurname,
        "gender": data.gender,
        
        "email": data.email,
        "userStartTime": data.userStartTime,
        "userEndTime": data.userEndTime,
        "qualification":totalSum,
        "result": data.result,


    }

    console.log("TOSEND",toSend, data.result[ data.result.length -1 ].resultado)
    if (typeof Android !== 'undefined' && typeof Android.sendExam === 'function') {
        Android.sendSummary((JSON.stringify(toSend)))
    }
    else {
        //  sendSummary(toSend)
    }


    setHeaderData(data);
    const paginaExamen = document.getElementById('paginaExamen');
    const resultadoPagina = document.getElementById('resultadoPagina');
    const notafinal = document.getElementById('notafinal');

    const cantidadItems = evaluation.reduce((count, current) => {
        if (current.items && Array.isArray(current.items)) {
            return count + current.items.length;
        }
        return count;
    }, 0);
    // console.log('Items:', evaluation);
    const sumaItems = evaluation.reduce((sum, current) => {
        if (current.items && Array.isArray(current.items)) {
            return sum + current.items.reduce((sum2, current2) => sum2 + current2, 0);
        }
        return sum;
    }, 0);
    // console.log('Suma:', sumaItems);

    paginaExamen.style.display = 'none';       // Oculta la página original
    resultadoPagina.style.display = 'block';   // Muestra la página de resultados
    notafinal.style.display = 'block';
    const spannota = document.getElementById("nota");
    spannota.textContent = (sumaItems / cantidadItems) * 20.0;
    let currentIndex = 0;
    let visibleArtefactos = 1;

    function createArtefactoElement(artefacto, index) {
        const element = document.createElement('div');
        element.className = 'artefacto';

        if (artefacto.id === "NF") {
            element.innerHTML = `
                    <h2>Artefacto ${index + 1}</h2>
                    <div class="info">Resultado: ${artefacto.resultado}</div>
                `;
        } else {
            let itemsHtml = artefacto.items.map((item, idx) => `
                    <tr>
                        <td>${idx + 1}</td>
                        <td>${item}</td>
                    </tr>
                `).join('');

            element.innerHTML = `
                    <h2>Artefacto ${index + 1}</h2>
                    <table>
                        <tr>
                            <th>Items</th>
                            <th>Puntos</th>
                        </tr>
                        ${itemsHtml}
                    </table>
                    <div class="info">
                        <strong>Total puntos: </strong>${artefacto.items.reduce((a, b) => a + b, 0)}<br>
                        <strong>Intentos: </strong>${artefacto.intentos}<br>
                        <strong>Tiempo/Seg: </strong>${artefacto.tiempo}
                    </div>
                `;
        }



        return element;
    }

    function updateSlider() {
        const slider = document.getElementById('slider');
        slider.innerHTML = '';
        for (let i = 0; i < evaluation.length - 1; i++) {
            slider.appendChild(createArtefactoElement(evaluation[i], i));
        }
        updateVisibleArtefactos();
    }

    function updateVisibleArtefactos() {
        const containerWidth = document.querySelector('.slider-container').offsetWidth;
        let artefactoWidth = 250; // 250px width + 20px margin
        //artefactoWidth = window.innerWidth < 768 ? 250 : 250; //si se ve desde un telefono ancho de 150px, de lo contrario 250px
        visibleArtefactos = Math.max(1, Math.floor(containerWidth / artefactoWidth));
        document.getElementById('slider').style.transform = `translateX(-${currentIndex * artefactoWidth}px)`;

        // Actualizar estado de los botones
        document.getElementById('prevBtn').disabled = currentIndex === 0;
        document.getElementById('nextBtn').disabled = currentIndex >= data.length - visibleArtefactos;
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateVisibleArtefactos();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentIndex < evaluation.length - visibleArtefactos) {
            currentIndex++;
            updateVisibleArtefactos();
        }
    });

    window.addEventListener('resize', updateVisibleArtefactos);

    // Inicializar el slider
    updateSlider();
}

function calcularResultadoTotal(data) {
    let total = 0;
    // Iterar sobre el arreglo de objetos
    data.forEach(obj => {
        if (obj.items && Array.isArray(obj.items)) {
            // Sumar los valores de items
            const sumaItems = obj.items.reduce((sum, current) => sum + current, 0);
            total += sumaItems;
        }
    });
    // Encontrar el objeto con id 'NF' y actualizar su resultado
    const nfObject = data.find(obj => obj.id === 'NF');
    if (nfObject) {
        nfObject.resultado = total;
    }
    return data; // Devolver el arreglo actualizado (opcional)
}

function cleanArt(resets, resultadoExamen, borderColor) {
    const newDiv = document.querySelectorAll('#newDiv');
    borderDefault = document.querySelectorAll('.borderDefault');
    for (let i = 0; i < resets.length; i++) {
        resets[i].addEventListener('click', function () {
            switch (this) {
                case resets[0]:
                    newDiv[i].style.borderColor = '#217E9D';
                    borderColor[i] = '#217E9D';
                    localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));
                    resultadoExamen[i].items = [0, 0];
                    break;
                case resets[1]:
                    newDiv[i].style.borderColor = '#217E9D';
                    borderColor[i] = '#217E9D';
                    console.log(borderColor);
                    localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));
                    resultadoExamen[i].items = [0, 0];
                    break;
                case resets[2]:
                    newDiv[i].style.borderColor = '#217E9D';
                    borderColor[i] = '#217E9D';
                    console.log(borderColor);
                    localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));
                    resultadoExamen[i].items = [0, 0];
                    break;
                case resets[3]:
                    borderDefault[i].style.borderColor = '#217E9D';
                    borderColor[i] = '#217E9D';
                    console.log(borderColor);
                    localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));
                    resultadoExamen[i].items = [0, 0, 0];
                    break;
                case resets[4]:
                    borderDefault[i].style.borderColor = '#217E9D';
                    borderColor[i] = '#217E9D';
                    console.log(borderColor);
                    localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));
                    resultadoExamen[i].items = [0, 0, 0, 0];
                    break;
                case resets[5]:
                    borderDefault[i].style.borderColor = '#217E9D';
                    borderColor[i] = '#217E9D';
                    console.log(borderColor);
                    localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));
                    resultadoExamen[i].items = [0, 0, 0];
                    break;
                case resets[6]:
                    borderDefault[i].style.borderColor = '#217E9D';
                    borderColor[i] = '#217E9D';
                    console.log(borderColor);
                    localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));
                    resultadoExamen[i].items = [0, 0, 0, 0];
                    break;
            }
            setTimeout(() => {
                guardarResultados(resultadoExamen);
            }, 0);
        });
    }
    return resultadoExamen;
}

function valida(validar, resultadoExamen, def, artefact, borderColor, propiedadesRdef) {

    const handleValidation = (index, mathfieldDiv1, mathfieldDiv2, mathfieldDiv3, resultadoExamen, artefact, def, idx) => {
        const mm1 = mathfieldDiv1[index].querySelectorAll('math-field');
        const mm3 = mathfieldDiv3[index].querySelectorAll('math-field');
        //console.log(mm1, mm3);
        const newDiv = document.querySelectorAll('#newDiv');
        newDiv[idx].style.borderColor = 'yellow';
        borderColor[idx] = 'yellow';
        localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));

        /*console.log(def[artefact[0]].timeInteraction);
        console.log(def[artefact[1]].timeInteraction);
        console.log(def[artefact[2]].timeInteraction);*/
        // console.log(resultadoExamen);
        resultadoExamen[idx].tiempo = def[artefact[idx]].timeInteraction
        resultadoExamen[idx].intentos += 1;
        //console.log(resultadoExamen[idx].tiempo)

        // Validating Notacion Intervalo
        if (mm1[0]._internals.willValidate) {
            setTimeout(() => {
                clases = Array.from(mm1[0].classList);
                //console.log(clases);          
                if (clases.includes('failed')) {
                    console.log('Intervalo ', idx + 1, ' fallo');
                    resultadoExamen[idx].items[0] = 0;
                    mm1[0].classList.remove('failed');
                }
                else if (clases.includes('pass')) {
                    console.log('Intervalo ', idx + 1, ' paso');
                    resultadoExamen[idx].items[0] = 1;
                    mm1[0].classList.remove('pass');
                }
                else {
                    console.log('Intervalo ', idx + 1, ' no respondio');
                    resultadoExamen[idx].items[0] = 0;
                }
                guardarResultados(resultadoExamen);
            }, 0);
        }
        else {
            console.log('Intervalo ', idx + 1, ' deshabilitado');
        }

        // Validating Recta Real
        setTimeout(() => {
            clases = Array.from(mathfieldDiv2[index].classList);
            //console.log(clases);       
            if (clases.includes('pass')) {
                console.log('Recta Real ', idx + 1, ' paso');
                resultadoExamen[idx].items[1] = 1;
                mathfieldDiv2[index].classList.remove('pass');
            }
            else if (clases.includes('failed')) {
                console.log('Recta Real ', idx + 1, ' fallo');
                resultadoExamen[idx].items[1] = 0;
                mathfieldDiv2[index].classList.remove('failed');
            }
            else {
                console.log('Recta Real ', idx + 1, ' no respondio');
                resultadoExamen[idx].items[1] = 0;
            }
            guardarResultados(resultadoExamen);
        }, 0);

        // Validating Notacion Algebraica
        if (mm3[0]._internals.willValidate) {
            // Validation logic            
            setTimeout(() => {
                clases = Array.from(mm3[0].classList);
                //console.log(clases);
                if (clases.includes('failed')) {
                    console.log('Algebraico ', idx + 1, ' fallo');
                    resultadoExamen[idx].items[0] = 0;
                    mm3[0].classList.remove('failed');
                }
                else if (clases.includes('pass')) {
                    console.log('Algebraico ', idx + 1, ' paso');
                    resultadoExamen[idx].items[0] = 1;
                    mm3[0].classList.remove('pass');
                }
                else {
                    console.log('Algebraico ', idx + 1, ' no respondio');
                    resultadoExamen[idx].items[0] = 0;
                }
                guardarResultados(resultadoExamen);
            }, 0);
        }
        else {
            console.log('Algebraico ', idx + 1, ' deshabilitado');
        }
    };

    const handleColorInputs = (startIndex, endIndex, propiedadesRdef, resultadoExamen, idx) => {
        const colorInputs = document.querySelectorAll('math-field.colorInput');
        const Previousmathfield = document.querySelectorAll('.BoardEngInt math-field.colorInput').length;

        borderDefault = document.querySelectorAll('.borderDefault');
        borderDefault[idx].style.borderColor = 'yellow';
        borderColor[idx] = 'yellow';
        localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(borderColor));

        resultadoExamen[idx].tiempo += rDef[propiedadesRdef].timeInteraction;
        resultadoExamen[idx].intentos += 1;

        console.log(idx, '===', resultadoExamen[idx].tiempo);

        indx = 0;
        let kk = startIndex + Previousmathfield;
        let aux = Array(rDef[propiedadesRdef].textBottom)[0];
        aux = aux.split('),(');
        aux = aux.map((elem, index) => {
            if (index === 0) {
                return elem + ")";
            } else if (index === aux.length - 1) {
                return "(" + elem;
            } else {
                return "(" + elem + ")";
            }
        });
        let numpunts = aux.length;
        setTimeout(() => {
            if (endIndex > numpunts) {
                console.log('Hay mas respuestas que puntos');
                endIndex = numpunts;
                console.log('Puntos:', endIndex);
            }
            for (i = 0; i < endIndex; i++) {
                const classList = colorInputs[i + kk].classList;
                if (classList.contains('passInLibrary')) {
                    console.log('Punto ' + (i + 1) + ' acertado');
                    resultadoExamen[idx].items[indx] = 1;
                    indx++;
                }
                else if (classList.contains('failedInLibrary')) {
                    console.log('Punto ' + (i + 1) + ' fallado');
                    resultadoExamen[idx].items[indx] = 0;
                    indx++;
                }
            }
            guardarResultados(resultadoExamen);
        }, 10);
    };

    for (let i = 0; i < validar.length; i++) {
        validar[i].addEventListener('click', function () {
            switch (this) {
                case validar[0]:
                    handleValidation(1, document.querySelectorAll('.divEngInt1'), document.querySelectorAll('.BoardEngInt'), document.querySelectorAll('.divEngInt2'), resultadoExamen, artefact, def, 0);
                    break;
                case validar[1]:
                    handleValidation(2, document.querySelectorAll('.divEngInt1'), document.querySelectorAll('.BoardEngInt'), document.querySelectorAll('.divEngInt2'), resultadoExamen, artefact, def, 1);
                    break;
                case validar[2]:
                    handleValidation(3, document.querySelectorAll('.divEngInt1'), document.querySelectorAll('.BoardEngInt'), document.querySelectorAll('.divEngInt2'), resultadoExamen, artefact, def, 2);
                    break;
                case validar[3]:
                    handleColorInputs(1, rDef[propiedadesRdef[0]].points.length, propiedadesRdef[0], resultadoExamen, 3);
                    break;
                case validar[4]:
                    handleColorInputs(rDef[propiedadesRdef[0]].points.length + 3, rDef[propiedadesRdef[1]].points.length, propiedadesRdef[1], resultadoExamen, 4);
                    break;
                case validar[5]:
                    handleColorInputs(rDef[propiedadesRdef[0]].points.length + rDef[propiedadesRdef[1]].points.length + 4, rDef[propiedadesRdef[2]].points.length, propiedadesRdef[2], resultadoExamen, 5);
                    break;
                case validar[6]:
                    handleColorInputs(rDef[propiedadesRdef[0]].points.length + rDef[propiedadesRdef[1]].points.length + rDef[propiedadesRdef[2]].points.length + 5, rDef[propiedadesRdef[3]].points.length, propiedadesRdef[3], resultadoExamen, 6);
                    break;
            }
        });
    }
    return resultadoExamen;
}


function formatText(input) {
    let lowerCased = input.toLowerCase();
    const lowercaseWords = ['de', 'y', 'o', 'a', 'en', 'el', 'la', 'los', 'las'];
    let words = lowerCased.split(' ').map(word => {
        if (word.includes('.')) {
            return word.split('.').map(letter => letter.toUpperCase()).join('.');
        }
        if (lowercaseWords.includes(word)) {
            return word; 
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join(' ');
}



async function guardarResultados(resultados) {
    await new Promise((resolve, reject) => {
        try {
            let Datos = JSON.parse(localStorage.getItem(LOCAL_DATOS_KEY));
            Datos.result = resultados;
            localStorage.setItem(LOCAL_DATOS_KEY, JSON.stringify(Datos));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}


//validar Fechas
function validateDates(availabilityStartDate, availabilityEndDate, offset = -240) {
    const now = new Date();
    const nowUTC = now.getTime() - (offset * 60 * 1000);
    const availabilityStartDateUTC = new Date(availabilityStartDate).getTime() - (offset * 60 * 1000);
    const availabilityEndDateUTC = new Date(availabilityEndDate).getTime() - (offset * 60 * 1000);

    if (nowUTC < availabilityStartDateUTC) {
        return {
            state: false,
            message: 'La fecha actual es anterior a la fecha de inicio.'
        };
    }

    if (nowUTC >= availabilityStartDateUTC && nowUTC <= availabilityEndDateUTC) {
        return {
            state: true,
            message: 'La fecha actual está dentro del rango permitido.'
        };
    }
    if (nowUTC > availabilityEndDateUTC) {
        return {
            state: false,
            message: 'La fecha actual está después de la fecha de cierre.'
        };
    }
    return {
        state: false,
        message: 'La fecha actual no está en un estado válido.'
    };
}
//Setear el header de los datos del usuario
function setHeaderData(userObject) {
    // Pinta los datos en el DOM
    document.getElementById('institucion').innerHTML = formatText(userObject.liceo);
    document.getElementById('Categoria').innerHTML = userObject.category;
    document.getElementById('materia').innerHTML = userObject.courseName;
    document.getElementById('seccion').innerHTML = userObject.sections;
    document.getElementById('nombreEstudiante').innerHTML = `${userObject.firstName} ${userObject.secondName} ${userObject.surname} ${userObject.secondSurname}` ;
    document.getElementById('correoEstudiante').innerHTML = userObject.email;
    document.getElementById('capExam').innerHTML = userObject.chapter;
    document.getElementById('evaluationModel').innerHTML = userObject.evaluationModel;
}
//Gernerar los artefactos

function PintaSeleccionP1(position, def, Pregunta) {
    let artefact = [];

    artefact[0] = 'artifact_' + position[0];
    artefact[1] = 'artifact_' + position[1];
    artefact[2] = 'artifact_' + position[2];

    const nuevoDef = filtrarObjeto(def, artefact);
    def = nuevoDef;

    return ([def, artefact]);
}
function generateEvaluationArtifacts(userObject) {

    let [position, position2] = localStoragePreguntasExamen(userObject);
    console.log(position, position2);
    let artefact = [];
    [def, artefact] = PintaSeleccionP1(position, def, 'P1');

    def = renombrarArtefactos(def);
    let artefactaux = ['artifact_1', 'artifact_2', 'artifact_3'];

    position2 = ajustarPosition(position2);
    let nuevoRdef = procesarRdef(rDef, position2);
    rDef = nuevoRdef;

    // Iniciar el contenido principal al cargar la página
    window.onload = initMain();

    pintarArtefactos(artefactaux);
    agregarEncabezadosPregunta();

}

function agregarEncabezadosPregunta() {
    const divs = document.querySelectorAll('.borderDefault');

    for (let i = 3; i < divs.length; i++) {
        let divPregunta = document.createElement('div');
        divPregunta.style.display = 'flex';

        let spanPregunta = document.createElement('span');
        spanPregunta.style.float = 'left';
        spanPregunta.textContent = `Artef. ${i + 1}`;
        spanPregunta.classList.add('question-header');

        let spanPuntaje = document.createElement('span');
        spanPuntaje.style.float = 'right';
        spanPuntaje.textContent = (i === 4 || i === 6) ? '4 Pts' : '3 Pts';
        spanPuntaje.classList.add("oval-container");

        divPregunta.appendChild(spanPregunta);
        divPregunta.appendChild(spanPuntaje);
        divs[i].insertBefore(divPregunta, divs[i].firstChild);
    }
}

function pintarArtefactos(artefactaux) {
    let containerAll = document.getElementById("container-all-artifact");

    artefactaux.forEach((element, index) => {
        let artifactDiv = document.getElementById(element);
        let newDiv = crearDivArtefacto(index + 1, artifactDiv);
        containerAll.appendChild(newDiv);
    });
}

function crearDivArtefacto(i, artifactDiv) {
    let newDiv = document.createElement("div");
    newDiv.id = "newDiv";

    let headersDiv = document.createElement("div");
    headersDiv.style.display = "flex";
    headersDiv.style.justifyContent = "space-between";

    let questionHeader = document.createElement("div");
    questionHeader.className = "question-header";
    questionHeader.textContent = `Artef. ${i}`;

    let scoreHeader = document.createElement("div");
    scoreHeader.className = "oval-container";
    scoreHeader.textContent = "2 Pts";

    headersDiv.appendChild(questionHeader);
    headersDiv.appendChild(scoreHeader);
    newDiv.appendChild(headersDiv);
    newDiv.appendChild(artifactDiv);

    return newDiv;
}

function initMain() {
    generation(def);
    generator(rDef);
    mainCartesian(defBoards, rDef);
    //evaluacion = inicializarExamen(LOCAL_STORAGE_KEY);
    //console.log(evaluacion);
    //colorBorders = inicializarExamen(LOCAL_COLORS_KEY);
    //console.log(colorBorders);
};

function renombrarArtefactos(def) {
    let keys = Object.keys(def).sort((a, b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]));
    let newObj = {};

    keys.forEach((key, index) => {
        newObj[`artifact_${index + 1}`] = def[key];
    });

    return newObj;
}

function ajustarPosition(position2) {
    return position2.map(x => x - 1);
}
function procesarRdef(rDef, position2) {
    let nuevoRdef = filtrarContents(rDef, position2);
    return filtrarRdef(nuevoRdef, position2);
}
function filtrarRdef(rdef, indices) {
    for (let i = 0; i < indices.length; i++) {
        indices[i] = indices[i] + 1;
    }

    const nuevoRdef = {};

    // Copiar la propiedad artifactHtml
    nuevoRdef.artifactHtml = rdef.artifactHtml;
    // Iterar sobre las propiedades de rdef
    for (const propiedad in rdef) {
        // Verificar si la propiedad comienza con "artifact_"
        if (propiedad.startsWith("artifact_")) {
            // Extraer el índice de la propiedad
            const indice = parseInt(propiedad.split("_")[1]);

            // Si el índice no está en el arreglo de índices a eliminar, copiar la propiedad
            if (indices.includes(indice)) {
                nuevoRdef[propiedad] = rdef[propiedad];
            }
        }
    }
    return nuevoRdef;
}
function filtrarContents(rdef, indices) {
    // Verificar si las propiedades existen antes de acceder a ellas
    if (rdef.artifactHtml && rdef.artifactHtml.datadefault && rdef.artifactHtml.datadefault[0] && rdef.artifactHtml.datadefault[0].contents) {
        const nuevoContents = rdef.artifactHtml.datadefault[0].contents.filter((_, index) => indices.includes(index));
        rdef.artifactHtml.datadefault[0].contents = nuevoContents;
    }
    return rdef;
}
function getPosition(configData, exams) {
    const modelKey = configData.evaluationModel.replace('modelo_', 'model_');
    const model = exams[modelKey];

    if (model) {
        return [model[0], model[1]];
    } else {
        alert('Modelo no encontrado');
        return [null, null]; // O cualquier valor por defecto que necesites
    }
}
function localStoragePreguntasExamen(userObject) {
    let position = []; //= Datos.SeleccionadosP1;
    let position2 = []; //= Datos.SeleccionadosP2;
    [position, position2] = getPosition(userObject, exams);
    return [position, position2];
}
function filtrarObjeto(objetoDef, arregloPropiedades) {
    const nuevoObjeto = {};

    for (const propiedad of arregloPropiedades) {
        // console.log(propiedad);
        if (objetoDef.hasOwnProperty(propiedad)) {
            nuevoObjeto[propiedad] = objetoDef[propiedad];
        }
    }
    return nuevoObjeto;
}

//acciones
//finalizarExamen
// async function sendExam(toSend) {
//     sendSummary(toSend)
    
//     // const paramRequest = {
//     //     method: 'POST',
//     //     mode: 'cors',
//     //     headers: { 'Content-Type': 'application/json;charset=UTF-8' },
//     //     body: JSON.stringify(toSend),
//     // };
//     // try {
//     //     let status = true;
//     //     let response = await fetch(
//     //         `${process.env.MS_COURSES}/mscourses/evaluations/sendSummary`,
//     //     //   `http://localhost:3050/mscourses/evaluations/sendSummary`,
//     //     //   paramRequest
//     //     );

//     //     let resonse = await response.json();

//     //     let data = resonse;
//     //     console.log("DATA DE EVALUACION",data)
//     //   } catch (error) {
//     //     console.log(error);
//     //     return false;
//     //   }

// }

//soltar el pdf de la evaluacion
function printEvaluation() {

}

function markBorders() {

}

//cualquier funcion adicional que complemente o haga un tarea especifica

let isLeaving = false;
let userStartTime = null;
window.addEventListener('beforeunload', function (event) {
    // Este evento captura cuando la página está a punto de recargarse o cerrarse
    const confirmationMessage = '¿Estás seguro de que deseas salir?';
    event.returnValue = confirmationMessage;
    event.preventDefault();
    //Datos.result = null;
    //localStorage.removeItem(LOCAL_COLORS_KEY);    
    //localStorage.setItem('Datos', JSON.stringify(Datos));
    console.log("La página está siendo recargada.");
    userStartTime = DatosX.userStartTime;
    console.log(DatosX);
    // Aquí puedes ejecutar acciones específicas cuando se detecta la recarga de la página
});
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && isLeaving) {
        // El usuario ha decidido no salir (ha vuelto a la página)
        console.log('El usuario ha decidido no recargar la página. Ejecutando acciones...');
        // Aquí puedes ejecutar las acciones que desees
        // Por ejemplo, restaurar datos o mostrar un mensaje
    } else {
        //DatosX.result = null;        
        DatosX = cargarResultados(LOCAL_DATOS_KEY);
        DatosX.result = [];
        DatosX.userStartTime = userStartTime;
        localStorage.removeItem(LOCAL_COLORS_KEY);
        //colorBorders = inicializarExamen(LOCAL_COLORS_KEY);
        //localStorage.setItem(LOCAL_COLORS_KEY, JSON.stringify(colorBorders));
        localStorage.setItem(LOCAL_DATOS_KEY, JSON.stringify(DatosX));
    }
});

// Restablecer la variable cuando la página se carga
window.addEventListener('load', () => {
    isLeaving = false; // Restablecer el estado
});
//FIN