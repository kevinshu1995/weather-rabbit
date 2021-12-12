<template>
    <div class="text-gray-900">
        <div v-if="location" class="flex flex-wrap gap-x-10 gap-y-2">
            <div class="flex justify-between w-full">
                <h2 class="text-gray-900 font-bold text-xs">最低溫觀測站</h2>
                <p class="text-xs text-gray-400">{{ location.time.obsTime }}</p>
            </div>
            <div class="self-end">
                <div class="flex gap-2">
                    <p class="text-5xl font-bold">{{ location.weatherElement[0].elementValue }}</p>
                    <span class="self-end">°C</span>
                </div>
            </div>
            <div class="space-y-1 self-end">
                <p class="text-xs text-gray-700">經緯 {{ location.lat }}, {{ location.lon }}</p>
                <h2 class="font-bold text-xl">
                    <template v-for="param in locationName">
                        <span :key="`location-name-${param.parameterName}`">
                            {{ param.parameterValue }}
                        </span>
                    </template>
                    <span>{{ location.locationName }}</span>
                </h2>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { weatherCurrentRecord } from "@/apis/weather.js";
export default {
    name: "Lowest-Temp",

    data() {
        return {
            location: null,
            test: {
                lat: "24.778333",
                lon: "121.494583",
                locationName: "福山",
                stationId: "C0A560",
                time: { obsTime: "2021-12-12 16:00:00" },
                weatherElement: [{ elementName: "TEMP", elementValue: "15.8" }],
                parameter: [
                    { parameterName: "CITY", parameterValue: "新北市" },
                    { parameterName: "CITY_SN", parameterValue: "06" },
                    { parameterName: "TOWN", parameterValue: "烏來區" },
                    { parameterName: "TOWN_SN", parameterValue: "061" },
                ],
            },
        };
    },

    async mounted() {
        this.location = await this.getLowestTemp();
    },

    computed: {
        locationName() {
            if (!this.location) return [];
            return this.location.parameter.filter(
                item => item.parameterName === "CITY" || item.parameterName === "TOWN"
            );
        },
    },

    methods: {
        async getLowestTemp() {
            try {
                const { data } = await weatherCurrentRecord({
                    elementName: "TEMP",
                });
                const lowestLocation = data.records.location.reduce((result, currentLocation) => {
                    if (Object.keys(result).length === 0) return currentLocation;
                    const findTempObj = location =>
                        location.weatherElement.find(element => element.elementName === "TEMP");
                    const currentTemp = findTempObj(currentLocation);
                    const resultTemp = findTempObj(result);
                    if (currentTemp !== undefined) {
                        return result;
                    } else {
                        return currentTemp.elementValue > resultTemp.elementValue ? result : currentLocation;
                    }
                }, {});
                return lowestLocation;
            } catch (error) {
                console.error("get lowestTemp failed", error);
            }
        },
    },
};
</script>
