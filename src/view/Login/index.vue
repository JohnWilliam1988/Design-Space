<template>
  <div class="Login-container">
    <div class="logon-container">
      <div class="logo">Crzou</div>
      <div class="title">登录</div>
      <div class="input">
        <i class="el-icon-user"></i
        ><el-input placeholder="输入邮箱" v-model="eMail" type="text" />
      </div>
      <div class="input">
        <i class="el-icon-unlock"></i
        ><el-input placeholder="输入密码" v-model="password" type="password" />
      </div>
      <div class="forget">忘记密码了</div>
      <div class="submit" @click="submit">登录 ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      eMail: "",
      password: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    submit() {
      if (this.eMail !== "crzou" || this.password !== "123456") {
        this.$message.warning("密码错误");
        return;
      } else {
        this.$message.success("登录成功");
      }
      this.$router.push("/Home");
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
@logo: rgb(0, 192, 139);
.Login-container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(242, 252, 249);
  .logon-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    box-shadow: 2px 2px 10px #999;
    .logo {
      color: @logo;
      background-color: rgb(235, 242, 240);
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      padding: 25px 0;
      margin-bottom: 5px;
    }
    .title {
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
    }
    .input {
      display: flex;
      padding: 10px 20px;
      align-items: center;
      i {
        text-align: center;
        background-color: rgb(241, 241, 241);
        width: 55px;
        height: 45px;
        line-height: 45px;
        font-size: 20px;
      }
      .el-input {
        height: 45px;
        border-radius: 0;
        /deep/.el-input__inner {
          border-radius: 0;
          height: 100%;
        }
      }
    }
    .submit {
      cursor: pointer;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: white;
      font-size: 16px;
      font-weight: bold;
      background-color: rgb(0, 169, 119);
    }
    .submit:hover {
      background-color: rgb(48, 182, 142);
    }
    .forget {
      height: 60px;
      color: rgb(13, 176, 121);
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>
