"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

// import { SerialPort } from "serialport";
// global.SerialPort = require("serialport");

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
app.allowRendererProcessReuse = false;

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  // const port = new SerialPort({
  //   path: "/dev/tty.usbserial-2130",
  //   baudRate: 115200,
  // });

  // port.write(
  //   "IN IN U0,0 U3580,-2954 D3582,-2941 D2889,-2417 D2886,-2426 D2889,-2434 D2196,-2958 D2193,-2954 D2196,-2941 D2203,-2936 D2212,-2937 D2531,-2159 D2522,-2159 D2514,-2165 D1766,-1711 D1772,-1706 D1780,-1705 D1790,-1711 D1792,-1719 D2682,-1762 D2680,-1754 D2673,-1748 D2904,-944 D2911,-949 D2914,-957 D2911,-965 D2904,-970 D3135,-1775 D3126,-1775 D3118,-1765 D3118,-1757 D3127,-1748 D2900,-957 D3135,-1775 D3142,-1770 D3145,-1761 D4036,-1718 D4034,-1725 D4028,-1731 D4016,-1731 D4010,-1725 D3262,-2179 D3270,-2185 D3279,-2185 D3599,-2962 D3586,-2961 D3580,-2954 U2341,-2925 D2324,-2952 D2298,-2970 D2266,-2977 D2238,-2971 D2211,-2955 D2193,-2929 D2186,-2897 D2191,-2868 D2208,-2842 D2234,-2823 D2266,-2817 D2295,-2822 D2321,-2839 D2339,-2865 D2346,-2897 D2341,-2925 U1832,-2952 D1807,-2970 D1775,-2977 D1746,-2971 D1720,-2955 D1701,-2929 D1695,-2897 D1701,-2865 D1720,-2839 D1746,-2822 D1775,-2817 D1803,-2822 D1830,-2839 D1848,-2865 D1855,-2897 D1849,-2925 D1832,-2952 U1534,-2532 D1594,-2488 D1658,-2449 D1726,-2417 D1798,-2392 D1868,-2374 D1945,-2362 D2020,-2359 D2096,-2362 D2173,-2374 D2243,-2392 D2315,-2417 D2383,-2449 D2447,-2488 D2506,-2532 D2564,-2585 D2614,-2640 D2659,-2700 D2697,-2764 D2729,-2832 D2755,-2903 D2773,-2974 D2784,-3051 D2788,-3126 D2784,-3201 D2773,-3278 D2755,-3349 D2729,-3420 D2697,-3488 D2659,-3552 D2614,-3612 D2564,-3667 D2506,-3720 D2447,-3764 D2383,-3803 D2315,-3835 D2243,-3861 D2173,-3878 D2096,-3890 D2020,-3893 D1945,-3890 D1868,-3878 D1798,-3861 D1726,-3835 D1658,-3803 D1594,-3764 D1534,-3720 D1479,-3670 D1427,-3612 D1382,-3552 D1344,-3488 D1312,-3420 D1286,-3349 D1268,-3278 D1257,-3201 D1253,-3126 D1257,-3051 D1268,-2974 D1286,-2903 D1312,-2832 D1344,-2764 D1382,-2700 D1427,-2640 D1479,-2582 D1534,-2532 U1605,-3461 D1709,-3523 D1761,-3548 D1813,-3568 D1866,-3584 D1918,-3595 D1970,-3601 D2022,-3604 D2074,-3601 D2126,-3594 D2178,-3583 D2231,-3567 D2331,-3523 D2435,-3461 U2096,-3890 D2020,-3893 D1945,-3890 D1868,-3878 D1798,-3861 D1726,-3835 D1658,-3803 D1594,-3764 D1534,-3720 D1479,-3670 D1427,-3612 D1382,-3552 D1344,-3488 D1312,-3420 D1286,-3349 D1268,-3278 D1257,-3201 D1253,-3126 D1257,-3051 D1268,-2974 D1286,-2903 D1312,-2832 D1344,-2764 D1382,-2700 D1427,-2640 D1479,-2582 D1534,-2532 D1594,-2488 D1658,-2449 D1726,-2417 D1798,-2392 D1868,-2374 D1945,-2362 D2020,-2359 D2096,-2362 D2173,-2374 D2243,-2392 D2315,-2417 D2383,-2449 D2447,-2488 D2506,-2532 D2564,-2585 D2614,-2640 D2659,-2700 D2697,-2764 D2729,-2832 D2755,-2903 D2773,-2974 D2784,-3051 D2788,-3126 D2784,-3201 D2773,-3278 D2755,-3349 D2729,-3420 D2697,-3488 D2659,-3552 D2614,-3612 D2564,-3667 D2506,-3720 D2447,-3764 D2383,-3803 D2315,-3835 D2243,-3861 D2173,-3878 D2096,-3890 U5817,-1850 D5879,-1992 D5928,-2140 D5962,-2291 D5983,-2447 D5990,-2603 D5983,-2760 D5962,-2916 D5928,-3067 D5879,-3215 D5817,-3357 D5741,-3493 D5656,-3618 D5558,-3735 D5450,-3841 D5335,-3934 D5212,-4014 D5082,-4080 D4945,-4134 D4807,-4171 D4663,-4194 D4519,-4202 D4375,-4194 D4232,-4171 D4093,-4134 D3956,-4080 D3826,-4014 D3703,-3934 D3588,-3841 D3480,-3735 D3382,-3618 D3297,-3493 D3221,-3357 D3160,-3215 D3111,-3067 D3076,-2916 D3055,-2760 D3048,-2603 D3055,-2447 D3076,-2291 D3111,-2140 D3160,-1992 D3221,-1850 D3297,-1714 D3382,-1589 D3480,-1472 D3588,-1366 D3703,-1273 D3826,-1193 D3956,-1127 D4093,-1073 D4232,-1036 D4375,-1013 D4519,-1005 D4663,-1013 D4807,-1036 D4945,-1073 D5082,-1127 D5212,-1193 D5335,-1273 D5450,-1366 D5558,-1472 D5656,-1589 D5741,-1714 D5817,-1850 U0,0 U0,0 @"
  // );

  //port.write("BD:31,0;");

  // port.write("BD:31,0;");

  // // Read data that is available but keep the stream in "paused mode"
  // port.on("readable", function () {
  //   console.log("Data:", port.read());
  // });

  // // Switches the port into "flowing mode"
  // port.on("data", function (data) {
  //   let sn = "";
  //   data.forEach((item) => {
  //     sn += item.toString(16);
  //   });
  //   console.log(hex2a(sn));
  // });
}

function hex2a(hexx) {
  var hex = hexx.toString(); //force conversion
  var str = "";
  for (var i = 0; i < hex.length && hex.substr(i, 2) !== "00"; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
