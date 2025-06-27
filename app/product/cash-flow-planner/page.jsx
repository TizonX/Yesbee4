"use client";

import { useState, useRef, useEffect } from "react";
import Section from "../../components/Section";
import Container from "../../components/Container";
import Input from "../../components/ui/Input";
import { apiRequest } from "../../lib/api";

const PRODUCT_TITLE = "Cash-Flow Planner";
const PRODUCT_DESC =
  "AI planner with smart alerts for collections, shortfalls, and cash position.";
const SAMPLE_CSV_URL = "/sample-cashflow.csv";

// Add this helper function for reading CSV file preview
function readCSVPreview(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    cb(e.target.result);
  };
  reader.readAsText(file);
}

function parseCSV(text) {
  // Simple CSV parser for preview
  const lines = text.trim().split(/\r?\n/);
  return lines.map((line) => line.split(","));
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

// Add a helper to check if uploaded file is CSV and render as table
function isCSVFile(name) {
  return name && name.toLowerCase().endsWith(".csv");
}

export default function CashFlowPlannerPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [status, setStatus] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showSamplePreview, setShowSamplePreview] = useState(false);
  const [sampleTable, setSampleTable] = useState([]);
  const fileInputRef = useRef();
  const dropRef = useRef();

  // Fetch and parse the sample CSV for preview
  useEffect(() => {
    if (showSamplePreview && sampleTable.length === 0) {
      fetch(SAMPLE_CSV_URL)
        .then((res) => res.text())
        .then((text) => setSampleTable(parseCSV(text)));
    }
  }, [showSamplePreview, sampleTable.length]);

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
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      readCSVPreview(droppedFile, setFilePreview);
    }
  };

  // File input handler
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "text/csv") {
      setFile(selected);
      setFileName(selected.name);
      readCSVPreview(selected, setFilePreview);
    }
  };

  // Simulate upload
  const handleUpload = async () => {
    if (!file || file.type !== "text/csv") return;
    setStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      await apiRequest({
        method: "POST",
        url: "/subscriptions/cashflow/process-file",
        data: formData,
        headers: { "Content-Type": undefined }, // Let axios set the correct boundary
      });
      setStatus("Processing...");
      setTimeout(() => {
        setStatus("");
        setShowPreview(true);
      }, 1200);
    } catch (err) {
      setStatus("Upload failed. Please try again.");
      setTimeout(() => setStatus(""), 2000);
    }
  };

  // Reset all
  const handleReset = () => {
    setFile(null);
    setFileName("");
    setFilePreview("");
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

  // Download sample CSV
  const handleSampleDownload = () => {
    const a = document.createElement("a");
    a.href = SAMPLE_CSV_URL;
    a.download = "sample-cashflow.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Add a helper to reset drag-drop UI state and focus
  const resetUploadUI = () => {
    setFile(null);
    setFileName("");
    setFilePreview("");
    setStatus("");
    setShowPreview(false);
    setFullscreen(false);
    // Remove any ring/focus classes from dropRef
    if (dropRef.current) {
      dropRef.current.classList.remove("ring-2", "ring-primary");
      dropRef.current.blur();
    }
  };

  // Responsive layout
  return (
    <Section className="min-h-[80vh] flex items-center justify-center">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Title & Description */}
          <div className="flex-1 flex flex-col justify-center mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {PRODUCT_TITLE}
            </h1>
            <p className="text-accent-dark text-lg mb-6">{PRODUCT_DESC}</p>
            {/* Button group for sample preview toggle and download */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full sm:w-fit">
              <button
                className="btn-secondary w-full sm:w-fit"
                onClick={() => {
                  setShowSamplePreview((v) => !v);
                  if (!showSamplePreview) {
                    resetUploadUI();
                  } else {
                    resetUploadUI();
                  }
                }}
              >
                {showSamplePreview ? "Hide Sample File" : "Show Sample File"}
              </button>
              {showSamplePreview && (
                <button
                  className="btn-primary w-full sm:w-fit"
                  onClick={handleSampleDownload}
                >
                  Download Sample File
                </button>
              )}
            </div>
            {/* Sample Preview Modal */}
            {showSamplePreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="relative bg-white rounded-xl shadow-lg max-w-2xl w-[90%] max-h-[80vh] overflow-auto flex flex-col">
                  <div className="flex items-center justify-between px-6 py-4 bg-primary rounded-t-xl">
                    <span className="font-semibold text-white text-base tracking-wide">
                      Sample CSV Preview
                    </span>
                    <button
                      className="text-white hover:text-secondary text-xl font-bold focus:outline-none"
                      onClick={() => setShowSamplePreview(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto max-h-[50vh]">
                    <TablePreview data={sampleTable} />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
                    <button
                      className="btn-primary w-full sm:w-fit"
                      onClick={handleSampleDownload}
                    >
                      Download Sample File
                    </button>
                    <button
                      className="btn-secondary w-full sm:w-fit"
                      onClick={() => setShowSamplePreview(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Upload/Preview */}
          <div className="flex-1 flex flex-col items-center justify-center w-full min-w-[320px] min-h-[340px] transition-all duration-300">
            {/* Upload Section */}
            {!showPreview && !showSamplePreview && (
              <div
                key={showSamplePreview ? "hidden" : "visible"}
                className="w-full max-w-md min-w-[320px] min-h-[320px] flex flex-col justify-center items-center"
              >
                <div
                  ref={dropRef}
                  tabIndex={0}
                  aria-label="File upload area"
                  className="w-full min-w-[280px] min-h-[200px] flex flex-col justify-center items-center border-2 border-dashed border-primary/30 rounded-xl cursor-pointer transition-all duration-300 bg-white/80 backdrop-blur-md shadow-2xl border border-primary/10 p-8 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary relative group"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      fileInputRef.current?.click();
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none rounded-xl group-hover:shadow-lg group-focus:shadow-lg transition-shadow duration-300" />
                  <svg
                    className="w-14 h-14 text-primary/80 mb-3 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <rect
                      x="8"
                      y="8"
                      width="32"
                      height="32"
                      rx="8"
                      fill="#f3f6fa"
                      stroke="#e0e7ef"
                      strokeWidth="2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M24 16v12m0 0l-5-5m5 5l5-5"
                      className="stroke-primary"
                    />
                  </svg>
                  <span className="text-accent-dark text-base font-medium text-center select-none px-2">
                    Drag & drop your CSV here
                    <br className="hidden sm:block" />
                    <span className="text-xs text-accent">
                      or click to select
                    </span>
                  </span>
                  {fileName && (
                    <span
                      className="mt-3 text-primary text-xs max-w-full truncate"
                      title={fileName}
                    >
                      {fileName}
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!file || !!status}
                  onClick={handleUpload}
                >
                  Upload CSV
                </button>
                {status && (
                  <div className="mt-4 text-primary text-sm font-medium animate-pulse">
                    {status}
                  </div>
                )}
              </div>
            )}

            {/* Uploaded File Preview Modal */}
            {showPreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div
                  className={`relative bg-white rounded-xl shadow-lg border border-primary/20 flex flex-col w-[90%] ${
                    fullscreen
                      ? "max-w-full max-h-none w-full h-full"
                      : "max-w-2xl max-h-[80vh] overflow-auto"
                  }`}
                >
                  <div className="flex items-center justify-between px-6 py-4 bg-primary rounded-t-xl">
                    <span className="font-semibold text-white text-base tracking-wide">
                      Uploaded File Preview
                    </span>
                    <button
                      className="text-white hover:text-secondary text-xl font-bold focus:outline-none"
                      onClick={() => setShowPreview(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto max-h-[50vh]">
                    {isCSVFile(fileName) ? (
                      <TablePreview data={parseCSV(filePreview)} />
                    ) : (
                      <pre className="text-xs text-accent-dark whitespace-pre-wrap bg-background-light rounded-lg p-4 border border-primary/5 max-h-[40vh] overflow-auto">
                        {filePreview}
                      </pre>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
                    <button
                      className="btn-primary w-full sm:w-fit"
                      onClick={handleDownload}
                    >
                      Download
                    </button>
                    <button
                      className="btn-secondary w-full sm:w-fit"
                      onClick={handleReset}
                    >
                      Upload New File
                    </button>
                    <button
                      className="btn w-full sm:w-fit border border-primary text-primary bg-white hover:bg-primary hover:text-white"
                      onClick={() => setFullscreen((v) => !v)}
                    >
                      {fullscreen ? "Small Screen" : "Full Screen"}
                    </button>
                    <button
                      className="btn-secondary w-full sm:w-fit"
                      onClick={() => setShowPreview(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
