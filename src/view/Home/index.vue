<template>
  <div class="container">
    <Top />
    <div class="workspace">
      <Left />
      <Content />
    </div>
    <div class="fixed" @click="make">
      <div class="btn">制作</div>
    </div>
  </div>
</template>
<script>
import Top from "./top.vue";
import Left from "./left.vue";
import Content from "./content.vue";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    make() {
      this.$bus.$emit("make");
    },
  },
  components: {
    Top,
    Left,
    Content,
  },
};
</script>

<style scoped lang="less">
.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .workspace {
    display: flex;
    flex: 1;
    flex-direction: row;
  }
  .fixed {
    height: 50px;
    border-top: 1px solid #eee;
    background-color: rgba(255, 255, 255, 0.5);
    width: 100vw;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn {
      cursor: pointer;
      background-color: green;
      color: white;
      padding: 2px 40px;
      border-radius: 20px;
      margin-right: 50px;
    }
  }
}
</style>
