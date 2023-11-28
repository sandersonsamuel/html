 function parseJSON(jsonString) {
    try {
        var obj = JSON.parse(jsonString);
        console.log("JSON parseado com sucesso!");
        return obj;
    } catch (erro) {
        console.log("Ocorreu um erro ao analisar o JSON: " + erro.message);
    }
}

strJson = '{"nome": "Samuel", "idade": 18}'

parseJSON(strJson)