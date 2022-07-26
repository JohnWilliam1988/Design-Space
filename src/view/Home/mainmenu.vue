<template>
  <div
    id="mainmenu"
    class="mainmenu"
    @click.stop
    :style="{
      display: mainmenudisplay,
    }"
  >
    
  </div>
</template>
<script>
import parseSvg from "../../utils/parseSvg";
export default {
  props: ["mainmenudisplay"],
  mounted() {},
  methods: {
    
  },
};
</script>
<style scoped lang="less">
.mainmenu {
  width: 250px;
  height: 100vh;
  background-color: rgb(245, 245, 245);
  position: fixed;
  top: 0;
  left: 0;
}

</style>
