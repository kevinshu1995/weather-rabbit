<template>
    <div>
        <div v-if="status === 200">
            <div class="flex gap-4 items-center">
                <h3 class="font-bold">選一下啦~</h3>
                <select
                    name="location"
                    id="location"
                    class="px-4 py-2 rounded-lg"
                    v-if="locationOptions"
                    v-model="form.selectedLocation"
                    @change="onChangeLocation"
                >
                    <option value="" disabled>--- 點我! ---</option>
                    <option v-for="(option, i) in locationOptions" :value="option.value" :key="`location-option-${i}`">
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <template v-if="result">
                <div>
                    <h4>最高溫</h4>
                    <p>{{ result.highestTemp }}</p>
                </div>
                <div>
                    <h4>最低溫</h4>
                    <p>{{ result.lowestTemp }}</p>
                </div>
                <div>
                    <h4>最大溫差</h4>
                    <p>{{ result.maxDiff.temp.diff }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { weeklyForecast } from "@/apis/weeklyForecast.js";
export default {
    name: "WeeklyWeather",

    data() {
        return {
            locationOptions: null,
            status: null,
            getLocationTempExtreme: null,
            getLocationTempMaxDiff: null,
            form: {
                selectedLocation: "",
            },
            result: null,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        async getData() {
            const { getLocationTempExtreme, getLocationTempMaxDiff, allLocations, status } = await weeklyForecast();
            this.getLocationTempExtreme = getLocationTempExtreme;
            this.getLocationTempMaxDiff = getLocationTempMaxDiff;
            this.locationOptions = allLocations;
            this.status = status;
        },

        onChangeLocation() {
            const location = this.form.selectedLocation;
            const highestTemp = this.getLocationTempExtreme(location, "highest");
            const lowestTemp = this.getLocationTempExtreme(location, "lowest");
            const maxDiff = this.getLocationTempMaxDiff(location);
            this.result = {
                highestTemp,
                lowestTemp,
                maxDiff,
            };
            console.log(
                `第四題: 最高溫 ${highestTemp} 度 | 最低溫 ${lowestTemp} 度 | 最大溫差 ${maxDiff.temp.diff} 度`
            );
            console.log(maxDiff);
        },
    },
};
</script>
