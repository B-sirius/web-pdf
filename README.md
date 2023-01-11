# 基于浏览器端的pdf预览、生成工具

使用 create-react-app 搭建。

## 原理

![原理](https://s2.loli.net/2023/01/11/hkN4xJDCMcfZELF.png)

主要用了[React-PDF](https://react-pdf.org/)来实现在浏览器通过canvas模拟渲染PDF。

图表则先是通过Echarts渲染为canvas，再生成Base64图片字符串，将字符串插入React-PDF的Image组件实现展示。