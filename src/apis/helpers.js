export const getElementValueByKey = (obj, key) => obj.find(element => element.elementName === key).elementValue;

export const getTimeByKey = (obj, key) => obj.find(element => element.elementName === key).time;

export const getParameterValueByKey = (obj, key) => obj.find(element => element.parameterName === key).parameterValue;

export const dealAvailableValue = value => (Number(value) === -99 ? null : value);
