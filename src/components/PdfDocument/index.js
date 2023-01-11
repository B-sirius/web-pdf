// 实际的pdf内容在这里渲染
import { Document, Page, Text, Font, Image } from '@react-pdf/renderer';
import styles from './pdfStyles';
import getChartsBlobImage from '../../utils/getChartsBlobImage';
import FZHei from '../../fonts/FZHei.ttf';

// 默认只支持拉丁英文，中文字体一定要注入
// 方正黑体相对来说非常小（3M），而且是可免费商用无书面授权的字体，因此采用
Font.register({
  family: "FZHeiti",
  src: FZHei
});

// 生成图片的例子
// image是base64字符串
const image = getChartsBlobImage({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});

// 需要使用指定Component组织内容，更多可见 https://react-pdf.org/components
const PDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header} fixed>
        Wiredcreaft
      </Text>
      <Text style={styles.title}>检测报告</Text>
      <Image src={image} />
      <Text style={styles.subtitle}>
        副标题
      </Text>
      <Text style={styles.text}>
        一些文字内容
      </Text>
      <Text style={styles.text} break>
        第二页的内容
      </Text>
      <Text style={styles.text} break>
        第三页的内容
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);

export default PDFDocument;