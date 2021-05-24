<template>
  <div class="home">
    <!-- <div class="select-line-template">
      <SelectLineTemplate class="select-line-template"></SelectLineTemplate>
    </div> -->
    <div class="grid col-2">
      <div>
        <Chart :chartId="'abc1'" :title="'BMS Voltage'"
          :activeLinesInput="['INVERTER_RIGHT_SPEED']"
        ></Chart>
      </div>
      <div>
        <Chart :chartId="'abc2'" :title="'BMS Current'"
          :activeLinesInput="['INVERTER_RIGHT_TEMPERATURE_IGBT']"
        ></Chart>
      </div>
      <div>
        <Chart :chartId="'abc3'" :title="'Inverter speed'"
          :activeLinesInput="['INVERTER_RIGHT_TEMPERATURE_MOTORS']"
        ></Chart>
      </div>
      <div>
        <Chart :chartId="'abc4'" :title="'Inverter torque'"
          :activeLinesInput="['INVERTER_RIGHT_TORQUE']"
        ></Chart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import SelectLineTemplate from '@/components/SelectLineTemplate.vue';
import Chart from '@/components/Chart.vue';


export default defineComponent({
  name: "Grid",
  components: { Chart},
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
});
</script>

<style lang="scss" scoped>

.col-1 {
  grid-template-columns: repeat(1, 1fr);
}
.col-2 {
  grid-template-columns: repeat(2, 1fr);
}
.col-3 {
  grid-template-columns: repeat(3, 1fr);
}
.col-4 {
  grid-template-columns: repeat(4, 1fr);
}

.home {
  display: flex;
  background-color: #333;
  height: 100%;
  > .grid {
    color: white;
    display: grid;
    flex-grow: 1;
    > div {
    }
  }
  > .select-line-template {
    height: 100%;
  }

}

ul {
  list-style: none;
  padding: 0;
}

.select-line-template {
  width: 250px;
}
</style>
