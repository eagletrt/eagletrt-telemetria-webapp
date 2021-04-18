<template>
  <div class="home">
    {{count}}
    <button @click="increment()">CIAO</button>
    <div id="graph" class="graph" ref="graph"></div>
  </div>
</template>

<script lang="ts">
import Graph from '@/utils/graphs/graph';
import { defineComponent } from "vue";
import MosquittoService from '../utils/mosquitto'

export default defineComponent({
  name: "Home",
  props: {
  },
  data() {
    return {
      graph: null as Graph | null,
    };
  },
  computed: {
    graphEl(): HTMLDivElement {
      return this.$refs.graph as HTMLDivElement;
    },
    count(): number {
      // return this.$store.state.chartData[''];
      return 0;
    }
  },
  mounted() {
    this.graph = new Graph(this.graphEl)
    this.graph.addLine('pippo', {
      name: 'pippo',
      x: [1,2,3],
      y: [1,2,3]
    })

    let i = 0;
    setInterval(() => {
      this.graph?.update('pippo', [i, i+1, i+2], [4,5,6])
      i += 3
    }, 1000)

    const ms = new MosquittoService(this.$store);
    ms.startSimulator();
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    }
}
});
</script>

<style lang="scss" scoped>
.home {
  > .graph {
    width: 700px;
    height: 500px;
  }
}
</style>
