
var seconds = 0;
(async function (params) {
    sendData(params);
    setInterval(() => {
        seconds++;
    }, 1000);
})();

function isValid(interaction) {
    const result = interaction?.results
    if (!result) return false

    const interactionValid = result.correct > 0 && (result.incorrect == 0 && result.forAnswer == 0)
    return interactionValid
}


function numberOfChapterOrPage(params) {
    let urlArray = window.location.pathname.split('/')
    const $definitionUrl = urlArray[urlArray.length - 2] + '/:' + urlArray[urlArray.length - 1];
    //Funcion que retorna un dato segun el parametro que le pase (params=0; Retorna el numero del capitulo -- params=1; Retorna el numero de la pagina --  sino tiene parametros retorna un array con ambos datos)
    const regex = /(\d+)/g; //Expresion regular que obtiene los numeros que se encuentra en un string
    let data = $definitionUrl.match(regex); //Array que almacena el numero de capitulo y pagina
    data = data.length > 2 ? [data[0], `${data[1]}.${data[2]}`] : data;
    switch (
    params //Evalua el params recibido para retornar el dato deseado.
    ) {
        case 0:
            return data[0];

        case 1:
            return data[1];

        default:
            return data;
    }
}

function sendData(params) {
    let pathname = new URL(document.referrer)?.pathname
    let idEnroll = pathname.split("/")[2]
    let personalInformation = JSON.parse(localStorage.getItem(idEnroll))
    const date = new Date(); // Objeto de fecha
    const endPoint = '/gateway/rabbitmq/:interactions';
    if (!personalInformation?.category || !personalInformation?._idCourse) {
        return
    }
    const data = {
        ...personalInformation,
        interactions: [{
            typeArtifact: 'Load',
            chapter: numberOfChapterOrPage(0),
            page: numberOfChapterOrPage(1),
            date:
                date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
            hour: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
            ...params,
            originMovil: false
        }],
    };

    const artifactIsValid = isValid({ ...data.interactions[0] })
    if (artifactIsValid && data.interactions[0].typeArtifact != 'Load') {
        const url = '/'
        const newArtifactTrue = {
            nameArtifact: `artifact_${data.interactions[0].artifact}`,
            status: true,
            originService: 'MG',
        }

        window.parent.postMessage(JSON.stringify(newArtifactTrue), url);
        generateProgress({ dataElements: JSON.stringify({ artifactsTrue: [newArtifactTrue.nameArtifact] }), idEnroll, isOfSend: true })
    }

    const dataToFront = {
        ...data.interactions[0],
        origin: 'desdeMG'
    }


    if (params) data.interactions[0].seconds = seconds;
    const paramRequest = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data),
    };
    const myRequest = new Request(endPoint, paramRequest);
    fetch(myRequest)
        .then((res) => res.json())
        .then((res) => {
            if (res.code == '200') {
                console.log('Success ' + res.message);
                return
            }
            console.log('ERROR', res.message, 'con el codigo:', res.code);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            seconds = 0;
        });
}


function sendSummary(body) {
    console.log("Se está llamando sendSummary")
    const endPoint = `/mscourses/evaluations/sendSummary`;
    const paramRequest = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(body),
    };

    const myRequest = new Request(endPoint, paramRequest);

    fetch(myRequest)
        .then((res) => res.json())
        .then((res) => {
            console.log('Success ' + res);
        })
        .catch((error) => {
            console.log("send ", error)

            console.log(error);
        })
        .finally(() => {

            console.log("Final de la evalaución")
        });

}