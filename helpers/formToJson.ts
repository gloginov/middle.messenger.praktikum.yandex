export function formToJson(form: Element){
  const inputElements = form ? form?.getElementsByTagName("input") : null,
    jsonObject = {};
  if (inputElements) {
    for(let i = 0; i < inputElements.length; i++){
      const inputElement = inputElements[i];
      jsonObject[inputElement.name] = inputElement.value;

    }
  }
  return jsonObject;
}
