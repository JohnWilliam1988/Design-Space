<template>
  <router-view> </router-view>
</template>
<script>
import Home from "./view/Home";
export default {
  data() {
    return {};
  },
  mounted() {
    // const port = new SerialPort({
    //   path: "/dev/tty-usbserial1",
    //   baudRate: 57600,
    // });
  },
  methods: {},
  components: {
    Home: Home,
  },
};
</script>

<style></style>
