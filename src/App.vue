<template>
  <div class="header-wrapper">
    <Header />
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MosquittoService from './utils/mosquitto'
import Header from '@/components/Header.vue';

export default defineComponent({
  components: {
    Header
  },
  mounted() {
    const ms = new MosquittoService(this.$store);
    ms.startSimulator();
  }
});
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
