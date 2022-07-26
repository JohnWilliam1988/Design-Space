<template>
  <div class="left" id="container">
    <el-upload
      class="upload-demo"
      :on-change="handleChange"
      :auto-upload="false"
      :show-file-list="false"
      action="#"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <div id="path-list"></div>
  </div>
</template>

<script>
import { fabric } from "fabric";

import axios from "axios";
import { SerialPort } from "serialport";


export default {
  data() {
    return {
      canvasArr: [],

      pathArr: [],

      // 初始路径

      path: [],

      active: 0,
      port: null,
      currentPath:'',
    };
  },

  mounted() {
    this.$bus.$on("updateCanvas", this.updateCanvas);

    this.$bus.$on("make", this.make);
    this.port = new SerialPort({
      path: "/dev/tty.usbserial-2130",
      baudRate: 115200,
    });
  },

  methods: {
    updateCanvas(obj, index,currentPath) {
      this.currentPath=currentPath;
      this.pathArr[index].set({
        left: obj.left,

        top: obj.top,
      }),
        this.canvasArr[index].renderAll();
    },

    make(obj) {
      console.log(this.currentPath,'当前路径')
      console.log("PATH is " + this.path[this.active]);
      var oldPath = "m0,0l120,0l0,100l-120,0l0,-100z";
      var newPath = "m0,0.5l205,0.5l205.5,100.5l0,100.5l0,0.5z";

  
      axios
        .post(
          "/api/api/v1.0/convertPath",
          {
            path: `<path d="${this.currentPath}"></path>`,
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
        .then((data) => {
          console.log(data.data.task.result,'得到的路径');
          this.port.write(data.data.task.result);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    handleChange(e) {
      let url = window.URL.createObjectURL(e.raw);

      let test = document.getElementById("path-list");

      test.innerHTML = "";

      this.canvasArr = [];

      this.pathArr = [];

      this.path = [];

      this.parseSvg(url, test);
    },

    parseSvg(fileUrl, dom) {
      this.canvasArr = [];

      let xmlDoc, xmlhttp;

      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari

        xmlhttp = new XMLHttpRequest();
      } else {
        // code for IE6, IE5

        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlhttp.open("GET", fileUrl, false);

      xmlhttp.send();

      xmlDoc = xmlhttp.responseXML;

      let svg = xmlDoc.getElementsByTagName("svg");

      // 获取svg数组

      let g = xmlDoc.getElementsByTagName("g");

      // 获取g标签数组

      let pathArr = xmlDoc.getElementsByTagName("path");

      let str = "";

      // let width = svg[0].getAttribute("width");

      // let height = svg[0].getAttribute("height");

      if (pathArr.length > 0) {
        for (let i = 0; i < pathArr.length; i++) {
          let div = document.createElement("div");

          // div.setAttribute("style", "border:1px solid #999;");

          let canvas = document.createElement("canvas");

          canvas.setAttribute("style", "border:1px solid #999;");

          div.appendChild(canvas);

          let id = "canvas" + i;

          canvas.setAttribute("id", id);

          // let d = path[i].getAttribute("d");

          // path[i].setAttribute('d',d.replace(/^m(\d+\.{0,1}\d*),(\d+\.{0,1}\d*)/, function (a,b,c) {

          //   return 'm0,0'

          // }))

          canvas.width = 120;

          canvas.height = 120;

          let childDiv = document.createElement("div");

          let isShow; //是否显示选项

          if (i === 0) {
            isShow = "block";
          } else {
            isShow = "none";
          }

          childDiv.innerHTML = `

          <div style="display:${isShow}" class="info-container" >

            <p>材料加载类型</p>

              <select>

                <option>Mat</option>

                <option>On Card Mat</option>

              </select>

            <p>材料尺寸</p>

            <select>

                <option>8.3in X 11.7in(A4)</option>

                <option>8.3in X 11in(Letter)</option>

            </select>

          </div>

          <span class="index">${i + 1}</span>



          `;

          div.appendChild(childDiv);

          dom.appendChild(div);

          let fabricCanvas = new fabric.Canvas(id);

          fabricCanvas.setZoom(0.2);

          let path = pathArr[i].getAttribute("d");

          this.path.push(path);

          let fill = pathArr[i].getAttribute("fill");

          let stroke = pathArr[i].getAttribute("stroke");

          // fabricCanvas.setBackgroundColor("rgb(175,175,175)");

          if (fill) {
            fabricCanvas.setBackgroundColor(fill);
          }

          div.onclick = () => {
            this.active = i;

            this.$bus.$emit("render", this.pathArr[i], i);

            let currentDiv = document.querySelectorAll(".info-container");

            for (let j = 0; j < currentDiv.length; j++) {
              if (j == i) {
                currentDiv[j].style.display = "block";
              } else {
                currentDiv[j].style.display = "none";
              }
            }
          };

          let newpath = new fabric.Path(path, {
            left: 20,

            top: 20,

            stroke,

            strokeWidth: 1,

            fill,
          });

          this.canvasArr.push(fabricCanvas);

          this.pathArr.push(newpath);

          newpath.selectable = false;

          this.setBg(fabricCanvas);

          fabricCanvas.add(newpath);
        }
      } else {
        str = svg[0].outerHTML;

        dom.innerHTML = str;
      }

      this.$bus.$emit("render", this.pathArr[0], 0);
    },

    setBg(fabricCanvas) {
      const grid = 50;

      const lineStroke = "#666";

      for (let i = 0; i < (fabricCanvas.width * 5) / grid; i++) {
        const lineX = new fabric.Line(
          [0, i * grid, fabricCanvas.width * 5, i * grid],

          {
            stroke: lineStroke,

            selectable: false,

            type: "line",

            strokeWidth: 1,
          }
        );

        const lineY = new fabric.Line(
          [i * grid, 0, i * grid, fabricCanvas.width * 5],

          {
            stroke: lineStroke,

            selectable: false,

            type: "line",

            strokeWidth: 1,
          }
        );

        fabricCanvas.add(lineX);

        fabricCanvas.add(lineY);
      }
    },
  },
};
</script>

<style scoped lang="less">
.left {
  width: 250px;

  height: calc(100vh - 45px);

  overflow: auto;

  background-color: rgb(245, 245, 245);

  flex-direction: column;
}
</style>
