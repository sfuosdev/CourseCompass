"use client";
import { useState, useEffect } from 'react';
import pdfjs from 'pdfjs-dist/build/pdf';

const UploadPDF = () => {
  const [pdfText, setPdfText] = useState('');

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      try {
        const reader = new FileReader();

        reader.onload = async (event) => {
          const buffer = event.target.result;
          const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
          const pdf = await loadingTask.promise;

          const pagesText = [];

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const pageText = await page.getTextContent();
            const textItems = pageText.items.map((item) => item.str);
            pagesText.push({ page: pageNum, text: textItems.join('\n') });
          }

          setPdfText(JSON.stringify(pagesText, null, 2));
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error('Error reading PDF:', error);
      }
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  return (
    <div>
      <h1>Upload and Read PDF</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <h2>PDF Content (JSON):</h2>
        <pre>{pdfText}</pre>
      </div>
    </div>
  );
};

export default UploadPDF;
