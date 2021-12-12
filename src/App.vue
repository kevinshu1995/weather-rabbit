<template>
    <div class="py-4">
        <div class="container">
            <Card>
                <Lowest-temp />
            </Card>
            <Card>
                <LowTempByElev />
            </Card>
        </div>
    </div>
</template>

<script>
import LowestTemp from "@/components/LowestTemp.vue";
import LowTempByElev from "@/components/LowTempByElev.vue";
import Card from "@/components/Card.vue";
export default {
    name: "App",
    components: {
        Card,
        LowTempByElev,
        LowestTemp,
    },
};
</script>
