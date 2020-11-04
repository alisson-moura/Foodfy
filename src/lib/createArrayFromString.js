exports.createArrayFromStringPG = (dataFromPG)  => {
    let text = dataFromPG;
    text = text.replace("{", "[");
    text = text.replace("}", "]");
    return JSON.parse(text);
}