<template>
  <div class="content-container">
    <div class="bg">
      <h1>Crzou</h1>
      <div class="canvas-container" @mouseup="handleMouseout">
        <div class="top-scale scale">
          <span v-for="index of 12" :key="index">{{ index }}</span>
        </div>
        <div class="left-scale scale">
          <span v-for="index of 12" :key="index">{{ index }}</span>
        </div>
        <div class="bottom-scale scale">
          <span v-for="index of 30" :key="index">{{ index }}</span>
        </div>
        <div class="right-scale scale">
          <span v-for="index of 30" :key="index">{{ index }}</span>
        </div>
        <canvas
          id="myCanvas"
          width="600"
          height="600"
          style="border: 1px solid #000000"
        >
        </canvas>
      </div>
    </div>
  </div>
</template>
<script>
import { fabric } from "fabric";
import {
  SVGPathData,
  SVGPathDataTransformer,
  SVGPathDataEncoder,
  SVGPathDataParser,
} from "svg-pathdata";

export default {
  data() {
    return { fabricCanvas: null, activeIndex: 0, path: null };
  },
  mounted() {
    this.fabricCanvas = new fabric.Canvas("myCanvas");
    this.setBg(this.fabricCanvas);
    this.$bus.$on("render", this.renderSvg);

    this.fabricCanvas.on("object:moving", function (e) {
      checkBoudningBox(e);
    });
    this.fabricCanvas.on("object:rotating", function (e) {
      checkBoudningBox(e);
    });
    this.fabricCanvas.on("object:scaling", function (e) {
      checkBoudningBox(e);
    });
    // 边界值碰撞检测
    let canvas = this.fabricCanvas;
    function checkBoudningBox(e) {
      const object = e.target;
      const canvas = object.canvas;

      // if the object is too big ignore
      if (
        object.currentHeight > canvas.height ||
        object.currentWidth > canvas.width
      ) {
        return;
      }
      object.setCoords();
      // top-left  corner
      if (
        object.getBoundingRect().top < 0 ||
        object.getBoundingRect().left < 0
      ) {
        object.top = Math.max(
          object.top,
          object.top - object.getBoundingRect().top
        );
        object.left = Math.max(
          object.left,
          object.left - object.getBoundingRect().left
        );
      }
      // bot-right corner
      if (
        object.getBoundingRect().top + object.getBoundingRect().height >
          canvas.height ||
        object.getBoundingRect().left + object.getBoundingRect().width >
          canvas.width
      ) {
        object.top = Math.min(
          object.top,
          canvas.height -
            object.getBoundingRect().height +
            object.top -
            object.getBoundingRect().top
        );
        object.left = Math.min(
          object.left,
          canvas.width -
            object.getBoundingRect().width +
            object.left -
            object.getBoundingRect().left
        );
      }
    }
  },
  methods: {
    setBg(fabricCanvas) {
      const grid = 50;
      const lineStroke = "#666";
      for (let i = 0; i < fabricCanvas.width / grid; i++) {
        const lineX = new fabric.Line(
          [0, i * grid, fabricCanvas.width, i * grid],
          {
            stroke: lineStroke,
            selectable: false,
            type: "line",
            strokeWidth: 1,
          }
        );
        const lineY = new fabric.Line(
          [i * grid, 0, i * grid, fabricCanvas.width],
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
    handleMouseout() {
      let currentPath = "";
      let obj = this.fabricCanvas.getActiveObject();
      var rect = obj.getBoundingRect();
      console.log(
        "getBoundingRect : ",
        rect.left,
        rect.top,
        rect.width,
        rect.height
      );

      console.log("Origin" + obj.path);

      console.log(obj);
      console.log(obj.toJSON());
      console.log(obj.toSVG());

      var pathSVG = obj.toSVG();
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(pathSVG, "text/xml");
      let g = xmlDoc.getElementsByTagName("g");
      if (g.length === 1) {
        console.log(g[0].getAttribute("transform"));
      } else {
        console.log("svg 格式错误");
        return;
      }
      let path = xmlDoc.getElementsByTagName("path");
      if (path.length === 1) {
        let transform = g[0].getAttribute("transform");
        let path2 = path[0].getAttribute("transform");
        let transformValue = transform.match(/[^\(\)]+(?=\))/g)[0].split(" ");
        let pathValue = path2.match(/[^\(\)]+(?=\))/g)[0].split(",");
        console.log(transformValue, pathValue);
        const pathData = new SVGPathData(path[0].getAttribute("d"));
        var pathDataResult = pathData
          .translate(+pathValue[0], +pathValue[1])
          .matrix(
            +transformValue[0],
            +transformValue[1],
            +transformValue[2],
            +transformValue[3],
            +transformValue[4],
            +transformValue[5]
          )
          .scale(12 / 6.25, 12 / 6.25) //这里还要纠正回正常的切割大小 屏幕画布大小跟实际大小比例关系为 12 ：6.25 //6.25 =（600 * 1 / 96）
          .encode();

        currentPath = pathDataResult;
        console.log("pathDataResult" + pathDataResult);
        // obj.path=pathDataResult;
      } else {
        console.log("svg 格式错误");
        return;
      }

      this.$bus.$emit("updateCanvas", obj, this.activeIndex, currentPath);
    },
    renderSvg(obj, index) {
      this.activeIndex = index;
      this.fabricCanvas.clear();
      this.fabricCanvas.setBackgroundColor(obj.fill);
      this.setBg(this.fabricCanvas);
      this.path = obj.path;
      let newpath = new fabric.Path(obj.path, {
        left: obj.left,
        top: obj.top,
        stroke: "white",
        strokeWidth: 1,
        fill: false,
      });
      newpath.lockScalingX = true;
      newpath.lockScalingY = true;

      // newpath.lockRotation = true;
      // newpath.hasBorders = false;
      // newpath.hasControls = false;
      //空间实际大小对应关系：
      //按照1像素对应 1/96 inc
      //600X600画布定义为12incX12inc
      //（600 X 1 / 96）

      newpath.scale(6.25 / 12, 6.25 / 12);
      this.fabricCanvas.add(newpath);
    },
  },
};
</script>
<style lang="less">
.content-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .bg {
    background-color: rgb(175, 175, 175);
    padding: 10px 30px 50px;
    border-radius: 15px;
    h1 {
      color: white;
      margin-bottom: 20px;
    }
  }
  .canvas-container {
    position: relative;
  }
  .scale {
    position: absolute;
    display: flex;
    span {
      color: white;
    }
  }
  .top-scale {
    width: 558px;
    top: -20px;
    right: -5px;
    justify-content: space-between;
  }
  .left-scale {
    bottom: -5px;
    left: -20px;
    height: 560px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .right-scale {
    right: -20px;
    height: 600px;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: center;
    span {
      transform: rotate(-180deg);
    }
  }
  .bottom-scale {
    bottom: -20px;
    width: 600px;
    justify-content: space-around;
    flex-direction: row-reverse;
    span {
      transform: rotate(-180deg);
    }
  }
}
</style>
