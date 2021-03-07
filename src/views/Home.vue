<template>
  <div class="home">
    <div class="graph" ref="graph"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dygraph from "dygraphs";

export default defineComponent({
  name: "Home",
  props: {
    fuck: {
      type: Number,
      defult: 1,
    },
  },
  data() {
    return {
      graph: null as Dygraph | null,
      pippo: [
        [1, [1, 2]],
        [2, [2, 3]],
      ] as any,
    };
  },
  watch: {
    fuck() {
      // this.pippo.push(this.pippo.length, this.fuck)
    },
  },
  computed: {
    graphEl(): HTMLDivElement {
      return this.$refs.graph as HTMLDivElement;
    },
  },
  mounted() {
    const pippo = [
      [1, 1],
      [2, 2],
    ] as any;
    setInterval(() => {
      //pippo.push([pippo.length, [Math.random() * 1000 % 10, Math.random() * 1000 % 10]])
    }, 1000);

    const sangennaro = [
      [1, 1, 2],
      [2, 2, 1],
    ];

    this.graph = new Dygraph(this.graphEl, sangennaro);
  },
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
