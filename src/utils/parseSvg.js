import { fabric } from "fabric";

//解析XML
export default function (fileUrl, dom) {
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
  let width = svg[0].getAttribute("width");
  let height = svg[0].getAttribute("height");

  if (pathArr.length > 0) {
    for (let i = 0; i < pathArr.length; i++) {
      let canvas = document.createElement("canvas");
      let id = "canvas" + i;
      canvas.setAttribute("id", id);
      canvas.setAttribute("style", id);

      // let d = path[i].getAttribute("d");
      // path[i].setAttribute('d',d.replace(/^m(\d+\.{0,1}\d*),(\d+\.{0,1}\d*)/, function (a,b,c) {
      //   return 'm0,0'
      // }))
      canvas.width = 200;
      canvas.height = 200;
      dom.appendChild(canvas);
      let fabricCanvas = new fabric.Canvas(id);
      let path = pathArr[i].getAttribute("d");
      let fill = pathArr[i].getAttribute("fill");
      let stroke = pathArr[i].getAttribute("stroke");

      let newpath = new fabric.Path(path, {
        left: 20,
        top: 20,
        stroke,
        strokeWidth: 1,
        fill,
      });
      fabricCanvas.add(newpath);
      console.log(fabricCanvas.path);

    }
  } else {
    str = svg[0].outerHTML;
    dom.innerHTML = str;
  }
  let canvas = new fabric.Canvas('canvas1');
  console.log(canvas)
}
