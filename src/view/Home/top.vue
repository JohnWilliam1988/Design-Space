<template>
  <div class="top">
    <i class="iconfont icon-icmenumore" @click.stop="mainmenuclick"> </i>
    <div>无标题</div>
    <div class="right_btn">无标题</div>
    <Mainmenu :mainmenudisplay="mainmenudisplay" />
  </div>
</template>

<script>
import Mainmenu from "./mainmenu.vue";
export default {
  data() {
    return { a: "nihao", mainmenudisplay: "none" };
  },
  mounted() {
    // 关闭左侧弹出菜单
    document.addEventListener("click", (e) => {
      let mainmenu = document.getElementById("mainmenu"); //弹窗的id
      if (this.mainmenudisplay === "block") {
        this.mainmenudisplay = "none";
      }
    });
    this.a = 100;
  },
  methods: {
    plus: function () {
      this.a++;
    },
    mainmenuclick: function () {
      this.mainmenudisplay = "block";
    },
  },
  components: {
    Mainmenu,
  },
};
</script>

<style scoped lang="less">
.top {
  width: 100%;
  height: 45px;
  display: flex;
  color: white;
  background-color: rgb(64, 69, 75);
  font-size: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  i {
    font-size: 30px;
    margin-left: 14px;
  }
  .right_btn {
    margin-right: 14px;
  }
}
</style>
