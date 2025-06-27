"use client";
import { useState, useRef, useEffect } from "react";
import Container from "../../components/Container";
import Input from "../../components/ui/Input";
import {
  CloudArrowUpIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";

const PRODUCT_TITLE = "Financial Metrics";
const PRODUCT_DESC =
  "Business scoring engine based on industry benchmarks. Upload your financial data to get instant metrics and insights.";
const SAMPLE_XLSX = [
  ["Date", "Metric", "Value"],
  ["2024-01-01", "Revenue", 10000],
  ["2024-01-01", "Expenses", 7000],
  ["2024-01-01", "Profit", 3000],
  ["2024-02-01", "Revenue", 12000],
  ["2024-02-01", "Expenses", 8000],
  ["2024-02-01", "Profit", 4000],
];

function downloadSampleFile() {
  const ws = XLSX.utils.aoa_to_sheet(SAMPLE_XLSX);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "sample-financial-metrics.xlsx");
}

function parseXLSX(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    cb(json);
  };
  reader.readAsArrayBuffer(file);
}

function TablePreview({ data }) {
  if (!data || !data.length) return null;
  return (
    <div className="overflow-x-auto rounded-lg border border-primary/10 bg-background-light shadow-sm">
      <table className="min-w-full text-xs md:text-sm">
        <thead>
          <tr>
            {data[0].map((cell, idx) => (
              <th
                key={idx}
                className="px-4 py-3 bg-primary text-white font-semibold text-left border-b border-primary/20"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, i) => (
            <tr
              key={i}
              className={
                "transition-colors even:bg-white odd:bg-background-light hover:bg-primary/5"
              }
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2 text-accent-dark border-t border-primary/10 whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FinancialMetricsPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState([]);
  const [status, setStatus] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showSamplePreview, setShowSamplePreview] = useState(false);
  const fileInputRef = useRef();
  const dropRef = useRef();

  // Prevent background scroll when fullscreen
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("ring-2", "ring-primary");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("ring-2", "ring-primary");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("ring-2", "ring-primary");
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        droppedFile.name.endsWith(".xlsx"))
    ) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      parseXLSX(droppedFile, setFilePreview);
    }
  };

  // File input handler
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      (selected.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selected.name.endsWith(".xlsx"))
    ) {
      setFile(selected);
      setFileName(selected.name);
      parseXLSX(selected, setFilePreview);
    }
  };

  // Upload to backend API endpoint
  const handleUpload = async () => {
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      // API endpoint as provided by user
      const res = await fetch("/subscriptions/cashflow/process-file", {
        method: "POST",
        body: formData,
      });
      setStatus("Processing...");
      if (!res.ok) throw new Error("Upload failed");
      const blob = await res.blob();
      // Assume backend returns xlsx file
      parseXLSX(
        new File([blob], fileName, { type: blob.type }),
        (data) => {
          setFilePreview(data);
          setStatus("");
          setShowPreview(true);
        }
      );
    } catch (err) {
      setStatus("Error uploading file");
    }
  };

  // Reset all
  const handleReset = () => {
    setFile(null);
    setFileName("");
    setFilePreview([]);
    setStatus("");
    setShowPreview(false);
    setFullscreen(false);
  };

  // Download uploaded file
  const handleDownload = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-background-light to-secondary/5 min-h-[80vh] py-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Title & Description */}
          <div className="flex-1 flex flex-col justify-center mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {PRODUCT_TITLE}
            </h1>
            <p className="text-accent-dark text-lg mb-6">
              {PRODUCT_DESC}
            </p>
            <button
              className="btn-secondary w-fit mb-4"
              onClick={() => {
                setShowSamplePreview((v) => !v);
              }}
            >
              {showSamplePreview ? "Hide Sample File Preview" : "Download Sample File"}
            </button>
            {/* Sample Preview Card with animation and improved style */}
            <div
              className={`transition-all duration-300 ${
                showSamplePreview
                  ? "opacity-100 scale-100 max-h-[600px] mt-2"
                  : "opacity-0 scale-95 max-h-0 overflow-hidden"
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg border border-primary/20 overflow-x-auto max-w-full">
                <div className="flex items-center justify-between px-6 py-3 bg-primary rounded-t-xl">
                  <span className="font-semibold text-white text-base tracking-wide">
                    Sample Excel Preview
                  </span>
                  <button
                    className="text-xs text-white underline hover:text-secondary"
                    onClick={downloadSampleFile}
                  >
                    Download
                  </button>
                </div>
                <div className="p-4">
                  <TablePreview data={SAMPLE_XLSX} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Upload/Preview */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Upload Section */}
            {!showPreview && (
              <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-primary/10">
                <div
                  ref={dropRef}
                  className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-lg cursor-pointer transition-all mb-4 bg-background-light hover:bg-primary/5"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg className="w-10 h-10 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-4h6v4a1 1 0 01-1 1z" />
                  </svg>
                  <span className="text-accent-dark text-sm">Drag & drop your Excel file here, or click to select</span>
                  {fileName && <span className="mt-2 text-primary text-xs">{fileName}</span>}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!file || !!status}
                  onClick={handleUpload}
                >
                  Upload Excel
                </button>
                {status && (
                  <div className="mt-4 text-primary text-sm font-medium animate-pulse">{status}</div>
                )}
              </div>
            )}

            {/* Preview Section */}
            {showPreview && (
              <>
                {/* Fullscreen Overlay */}
                {fullscreen && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300"
                    style={{ animation: "fadeIn .3s" }}
                  >
                    <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-4 animate-fade-in">
                      <button
                        className="absolute top-4 right-4 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
                        onClick={() => setFullscreen(false)}
                        aria-label="Close Fullscreen"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="mb-4 flex justify-between items-center">
                        <span className="font-semibold text-primary text-lg">Uploaded File Preview</span>
                        <div className="flex gap-2">
                          <button
                            className="btn-secondary px-3 py-1 text-xs"
                            onClick={() => setFullscreen((v) => !v)}
                          >
                            Small Screen
                          </button>
                          <button
                            className="btn-primary px-3 py-1 text-xs"
                            onClick={handleDownload}
                          >
                            Download
                          </button>
                          <button
                            className="btn px-3 py-1 text-xs border border-primary text-primary bg-white hover:bg-primary hover:text-white"
                            onClick={handleReset}
                          >
                            Upload New File
                          </button>
                        </div>
                      </div>
                      <div className="max-h-[70vh] overflow-auto rounded-lg border border-primary/10 bg-background-light p-2">
                        <TablePreview data={filePreview} />
                      </div>
                    </div>
                  </div>
                )}
                {/* Normal Preview Card */}
                <div
                  className={`w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 border border-primary/10 transition-all duration-300 ${
                    fullscreen ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-primary">Uploaded File Preview</span>
                    <div className="flex gap-2">
                      <button
                        className="btn-secondary px-3 py-1 text-xs"
                        onClick={() => setFullscreen((v) => !v)}
                      >
                        Full Screen
                      </button>
                      <button
                        className="btn-primary px-3 py-1 text-xs"
                        onClick={handleDownload}
                      >
                        Download
                      </button>
                      <button
                        className="btn px-3 py-1 text-xs border border-primary text-primary bg-white hover:bg-primary hover:text-white"
                        onClick={handleReset}
                      >
                        Upload New File
                      </button>
                    </div>
                  </div>
                  <div className="max-h-[60vh] overflow-auto bg-background-light rounded-lg p-2 border border-primary/5">
                    <TablePreview data={filePreview} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
