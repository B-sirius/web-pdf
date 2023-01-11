// mobile不支持 PDFViewer
// 目前采用的解决方法 https://github.com/diegomura/react-pdf/issues/1113#issuecomment-781053667

import { useState } from 'react';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import PDFDocument from './components/PdfDocument';
import './App.css';

function App() {
  const [totalPageNumber, settotalPageNumber] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const handleLoadSuccess = (pdf) => {
    settotalPageNumber(pdf.numPages);
  }

  // 上一页
  const goPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  // 下一页
  const goNextPage = () => {
    if (pageNumber < totalPageNumber) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <div className="App">
      {/* 工具栏 */}
      <div className='toolbar'>
        <button onClick={goPrevPage}>上一页</button>
        <button onClick={goNextPage}>下一页</button>
      </div>
      {/* PDF预览 */}
      <div className="pdf-view-container" id="pdf-view-container">
        <BlobProvider document={<PDFDocument />}>
          {({ blob, url, loading }) => {
            return loading ? 'loading' : (
              <Document
                file={url}
                onLoadSuccess={(pdf) => handleLoadSuccess(pdf)}
                renderMode="canvas">
                <Page
                  pageNumber={pageNumber}
                  width={window.innerWidth - 20} />
              </Document>
            )
          }}
        </BlobProvider>
      </div>
      <div className='download-container'>
        <PDFDownloadLink
          style={{ color: "#fff" }}
          document={<PDFDocument />}>
          {({ loading }) =>
            loading ? 'Loading...' : '下载该pdf'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;
