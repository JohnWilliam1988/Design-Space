<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div @click="btnClick()">Path2Plt</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  methods: {
    btnClick: function () {
      this.axios
        .post(
          "/api/api/v1.0/convertPath",
          {
            path: '<path d="m274,90.43l21.84,76.01l84.18,-4.09l-70.68,42.88l30.18,73.48l-65.52,-49.51l-65.52,49.51l30.18,-73.48l-70.68,-42.88l84.18,4.09l21.84,-76.01l21.84,76.01l-21.84,-76.01z" fill="#FF0000" fill-opacity="null" id="svg_1" stroke="null" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-opacity="null" stroke-width="NaN"/>\n<path d="m288,246c0,-83.43 62.2,-151 139,-151c76.8,0 139,67.57 139,151c0,83.43 -62.2,151 -139,151c-76.8,0 -139,-67.57 -139,-151z" fill="#FF0000" fill-opacity="null" id="svg_2" stroke="#000000" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-opacity="null" stroke-width="null"/>\n<path d="m151.61,327q39.3,26.99 78.5,0m-69.98,-53.3c0,-4.17 3.38,-7.55 7.55,-7.55c4.17,0 7.55,3.38 7.55,7.55c0,4.17 -3.38,7.55 -7.55,7.55c-4.17,0 -7.55,-3.38 -7.55,-7.55m46.45,0c0,-4.17 3.38,-7.55 7.55,-7.55c4.17,0 7.55,3.38 7.55,7.55c0,4.17 -3.38,7.55 -7.55,7.55c-4.17,0 -7.55,-3.38 -7.55,-7.55m-88.17,21.68l0,0c0,-40.04 32.46,-72.5 72.5,-72.5c40.04,0 72.5,32.46 72.5,72.5c0,40.04 -32.46,72.5 -72.5,72.5c-40.04,0 -72.5,-32.46 -72.5,-72.5zm0,0l0,0c0,-40.04 32.46,-72.5 72.5,-72.5c40.04,0 72.5,32.46 72.5,72.5c0,40.04 -32.46,72.5 -72.5,72.5c-40.04,0 -72.5,-32.46 -72.5,-72.5z" fill="#FF0000" fill-opacity="null" id="svg_3" stroke="#000000" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-opacity="null" stroke-width="null"/>',
            method: 0,
            arg1: 1.3,
            arg2: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
