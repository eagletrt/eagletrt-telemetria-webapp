<template>
    <header>
        <nav>
            <router-link class="home" to="/">
                <img src="img/LOGO.png">
                <h1>Eagle trt - Telemetry</h1>
            </router-link>
            <!-- <router-link to="/Grid">Grid</router-link> -->
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Header',
});
</script>

<style scoped lang="scss">
@media screen and (max-width: 900px) {
    h1 {
        display: none !important;
    }
    a {
        margin: 0 0.3em !important;
        padding: 0.3em 0.3em !important;
    }
}
header {
    background-color: #222;
    text-align: left;
    display: flex;
    height: 100%;
    nav {
        display: flex;
        .home {
            display: flex;
            align-items: center;
            cursor: pointer;
            &:hover {
                background: #333;
            }
        }
        img {
            width: 40px;
            height: 40px;
            margin-left: 3em;
        }
        h1 {
            margin: 0.2em 2em;
            display: inline-block;
            color: white;
        }
        a {
            text-decoration: none;
        //     &.router-link-exact-active {

        //     }
        }
    }
}
</style>