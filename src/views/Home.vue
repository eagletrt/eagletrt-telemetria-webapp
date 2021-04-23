<template>
  <div class="home">
    <div id="graph" class="graph" ref="graph"></div>
    <ul>
      <li v-for="lineName in linesNames" :key="lineName">
        <input type="checkbox" :value="lineName" :id="'chartcheckbox-' + lineName" @change="toggleLine(lineName, $event.target.checked)">
        <label :for="'chartcheckbox-' + lineName">{{lineName}}</label>
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Graph from '@/utils/chart/chart';
import { defineComponent } from "vue";
import MosquittoService from '../utils/mosquitto'
import { ChartData } from '../types/chart-data'

export default defineComponent({
  name: "Home",
  props: {
  },
  data() {
    return {
      chart: null as Graph | null,
    };
  },
  computed: {
    graphEl(): HTMLDivElement {
      return this.$refs.graph as HTMLDivElement;
    },
    chartData(): ChartData {
      return this.$store.state.chartData;
    },
    linesNames(): string[] {
      return this.$store.state.keys;
    },
    count(): number {
      // return this.$store.state.chartData[''];
      return 0;
    }
  },
  mounted() {
    const ms = new MosquittoService(this.$store);
    ms.startSimulator();

    this.chart = new Graph(this.graphEl)
    this.chart.addLine('INVERTER_RIGHT_SPEED', {
      name: 'INVERTER_RIGHT_SPEED',
      x: this.$store.state.chartData['INVERTER_RIGHT_SPEED'].dates,
      y: this.$store.state.chartData['INVERTER_RIGHT_SPEED'].values
    })

    // let i = 0;
    setInterval(() => {
      // console.log(this.$store.state.chartData);
      this.chart?.redraw();
      // this.graph?.update('pippo', [i, i+1, i+2], [4,5,6])
      // i += 3
    }, 1000)
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    toggleLine(lineName: string, toggle: boolean) {
      this.chart?.addLine(lineName, {
        name: 'INVERTER_RIGHT_SPEED',
        x: this.$store.state.chartData[lineName].dates,
        y: this.$store.state.chartData[lineName].values
      })
    }
}
});
</script>

<style lang="scss" scoped>
.home {
  > .graph {
    width: 100vw;
    height: 500px;
  }
}

ul {
  list-style: none;
}
</style>
