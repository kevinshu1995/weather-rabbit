import { weatherCurrentRecord } from "./weather.js";

const getElementValueByKey = (obj, key) => obj.find(element => element.elementName === key).elementValue;
const getParameterValueByKey = (obj, key) => obj.find(element => element.parameterName === key).parameterValue;

export async function Temperature() {
    const { data, status } = await weatherCurrentRecord({
        elementName: "TEMP,ELEV",
    });

    const _lowestLocation = data.records.location.reduce((result, currentLocation) => {
        const currentTemp = getElementValueByKey(currentLocation.weatherElement, "TEMP");

        currentLocation = {
            ...currentLocation,
            temperature: currentTemp,
        };

        if (Object.keys(result).length === 0) return currentLocation;

        if (currentTemp === undefined || Number(currentTemp) === -99) {
            return result;
        } else {
            return Number(currentTemp) > Number(result.temperature) ? result : currentLocation;
        }
    }, {});

    const lowestLocation = {
        latLon: {
            lat: _lowestLocation.lat,
            lon: _lowestLocation.lon,
        },
        location: {
            name: _lowestLocation.locationName,
            city: getParameterValueByKey(_lowestLocation.parameter, "CITY"),
            town: getParameterValueByKey(_lowestLocation.parameter, "TOWN"),
        },
        time: _lowestLocation.time && _lowestLocation.time.obsTime,
        temperature: _lowestLocation.temperature,
    };

    // TODO 依照海拔排列
    // const lowestLocationByElev = null

    return {
        data,
        status,
        lowestLocation,
    };
}
