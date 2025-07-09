"use client";

import { useState, useRef, useEffect } from "react";
import Section from "../../components/Section";
import Container from "../../components/Container";
import Input from "../../components/ui/Input";
import { apiRequest } from "../../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faChartSimple,
  faEnvelope,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const PRODUCT_TITLE = "Cash Flow Planner with Smart Alerts";
const PRODUCT_DESC = (
  <>
    Is your business profitable but still struggling with cash flow?
    <br />
    You’re not alone—80% of MSMEs face cash crunches due to delayed collections
    and lack of visibility.
  </>
);
const SAMPLE_CSV_URL = "/sample-cashflow.xlsx";

// Add this helper function for reading CSV file preview
function readCSVPreview(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    cb(e.target.result);
  };
  reader.readAsText(file);
}

// Add helper function for reading Excel file preview
function readExcelPreview(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      cb(json);
    } catch (error) {
      cb("Excel file detected. Preview not available.");
    }
  };
  reader.readAsArrayBuffer(file);
}

// Helper function to parse Excel data for preview
function parseExcelData(data) {
  if (Array.isArray(data)) {
    return data;
  }
  return [];
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

// Add a helper to check if uploaded file is Excel
function isExcelFile(name) {
  return (
    name &&
    (name.toLowerCase().endsWith(".xlsx") ||
      name.toLowerCase().endsWith(".xls"))
  );
}

export default function CashFlowPlannerPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [status, setStatus] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showSamplePreview, setShowSamplePreview] = useState(false);
  const [sampleTable, setSampleTable] = useState([]);
  const [processedFile, setProcessedFile] = useState(null);
  const [processedFileName, setProcessedFileName] = useState("");
  const [processedFileData, setProcessedFileData] = useState([]);
  const fileInputRef = useRef();
  const dropRef = useRef();

  // Fetch and parse the sample CSV for preview
  useEffect(() => {
    if (showSamplePreview && sampleTable.length === 0) {
      fetch(SAMPLE_CSV_URL)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          try {
            const data = new Uint8Array(buffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setSampleTable(json);
          } catch (error) {
            // Fallback to CSV parsing if Excel parsing fails
            const text = new TextDecoder().decode(buffer);
            setSampleTable(parseCSV(text));
          }
        })
        .catch((error) => {
          console.error("Error loading sample file:", error);
          // Set a default sample data if file loading fails
          setSampleTable([
            ["Date", "Description", "Amount", "Type"],
            ["2024-01-01", "Starting Balance", "10000", "Income"],
            ["2024-01-15", "Client Payment", "5000", "Income"],
            ["2024-01-20", "Office Rent", "-2000", "Expense"],
            ["2024-01-25", "Utilities", "-500", "Expense"],
            ["2024-01-30", "Equipment Purchase", "-1500", "Expense"],
          ]);
        });
    }
  }, [showSamplePreview, sampleTable.length]);

  // Prevent body scrolling when modals are open
  useEffect(() => {
    if (showPreview || showSamplePreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPreview, showSamplePreview]);

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
    if (droppedFile) {
      const isExcel =
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        droppedFile.type === "application/vnd.ms-excel" ||
        droppedFile.name.toLowerCase().endsWith(".xlsx") ||
        droppedFile.name.toLowerCase().endsWith(".xls");

      if (isExcel) {
        setFile(droppedFile);
        setFileName(droppedFile.name);
        readExcelPreview(droppedFile, setFilePreview);
      }
    }
  };
  // File input handler
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const isExcel =
        selected.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selected.type === "application/vnd.ms-excel" ||
        selected.name.toLowerCase().endsWith(".xlsx") ||
        selected.name.toLowerCase().endsWith(".xls");

      if (isExcel) {
        setFile(selected);
        setFileName(selected.name);
        readExcelPreview(selected, setFilePreview);
      }
    }
  };

  // Upload and process file
  const handleUpload = async () => {
    setStatus("Validating file...");

    // Simulate file validation
    await new Promise((resolve) => setTimeout(resolve, 500));

    setStatus("Preparing upload...");
    await new Promise((resolve) => setTimeout(resolve, 300));

    setStatus("Uploading file to server...");
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Use fetch directly to handle blob response
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
        }/subscriptions/cashflow/process-file`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setStatus("File uploaded successfully! Processing data...");
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatus("Analyzing cash flow patterns...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("Generating financial insights...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatus("Creating final report...");
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Get the blob from response
      const blob = await response.blob();

      // Create a file from the blob
      const processedFile = new File([blob], `processed_${fileName}`, {
        type: blob.type,
      });
      setProcessedFile(processedFile);
      setProcessedFileName(processedFile.name);

      // Parse the file data for preview based on content type
      if (
        blob.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        blob.type === "application/vnd.ms-excel" ||
        processedFile.name.toLowerCase().endsWith(".xlsx") ||
        processedFile.name.toLowerCase().endsWith(".xls")
      ) {
        // Excel file
        readExcelPreview(processedFile, (data) => {
          setProcessedFileData(parseExcelData(data));
        });
      } else {
        // Unknown file type, try to detect from content
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          if (content.includes(",") && content.includes("\n")) {
            // Likely CSV - but we don't support CSV uploads, so show empty
            setProcessedFileData([]);
          } else {
            // Set empty data for unknown types
            setProcessedFileData([]);
          }
        };
        reader.readAsText(processedFile);
      }

      setStatus("Processing complete! ✓");
      setTimeout(() => {
        setStatus("");
        setShowPreview(true);
      }, 1000);
    } catch (err) {
      setStatus("Upload failed. Please try again.");
      setTimeout(() => setStatus(""), 3000);
    }
  };
  // Reset all
  const handleReset = () => {
    setFile(null);
    setFileName("");
    setFilePreview("");
    setStatus("");
    setShowPreview(false);
    setProcessedFile(null);
    setProcessedFileName("");
    setProcessedFileData([]);
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
  // Download processed file
  const handleDownloadProcessed = () => {
    if (!processedFile) return;
    const url = URL.createObjectURL(processedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = processedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // Download sample CSV
  const handleSampleDownload = () => {
    const a = document.createElement("a");
    a.href = SAMPLE_CSV_URL;
    a.download = "sample-cashflow.xlsx";
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
    setProcessedFile(null);
    setProcessedFileName("");
    setProcessedFileData([]);
    // Remove any ring/focus classes from dropRef
    if (dropRef.current) {
      dropRef.current.classList.remove("ring-2", "ring-primary");
      dropRef.current.blur();
    }
  };
  // Responsive layout
  return (
    <Section className="min-h-[80vh] flex items-center justify-center mt-14">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Title & Description */}
          <div className="flex-1 flex flex-col justify-center mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-3xl font-bold text-primary mb-4">
              {PRODUCT_TITLE}
            </h1>
            <p className="text-accent-dark text-base">{PRODUCT_DESC}</p>
            {/* icons */}
            <div className="py-5">
              <h6 className="text-accent-dark text-base py-5">
                Stay Ahead with Real-Time Alerts via:
              </h6>
              <div className="flex flex-wrap gap-3xl justify-start">
                {/* WhatsApp */}
                <div className="flex flex-row md:flex-col  items-center gap-sm group">
                  <div className="p-xs bg-success/10 rounded-full group-hover:bg-success/20 transition duration-DEFAULT shadow-sm">
                    {/* <FontAwesomeIcon
                      icon={faWhatsapp}
                      className="w-5 h-5 text-success group-hover:scale-110 group-hover:text-success transition-transform duration-DEFAULT flex items-center justify-center"
                    /> */}
                    <div className="w-5 h-5 relative flex items-center justify-center transition-transform duration-DEFAULT">
                      <Image
                        src="/icons/whatsapp.png" // replace with your image path
                        alt="whatsapp"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-primary group-hover:text-primary-light font-medium transition duration-DEFAULT">
                    WhatsApp
                  </span>
                </div>
                {/* Email */}
                <div className="flex flex-row md:flex-col items-center gap-sm group">
                  <div className="p-xs bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition duration-DEFAULT shadow-sm">
                    {/* <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-DEFAULT flex items-center justify-center"
                    />
                     */}
                    <div className="w-5 h-5 relative flex items-center justify-center transition-transform duration-DEFAULT">
                      <Image
                        src="/icons/email.png" // replace with your image path
                        alt="Email"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-primary group-hover:text-primary-light font-medium transition duration-DEFAULT">
                    Email
                  </span>
                </div>
                {/* Excel Dashboard */}
                <div className="flex flex-row md:flex-col items-center gap-sm group">
                  <div className="p-xs bg-accent-dark/10 rounded-full group-hover:bg-accent-dark/20 transition duration-DEFAULT shadow-sm">
                    {/* <FontAwesomeIcon
                      icon={faChartSimple}
                      className="w-5 h-5 text-accent-dark group-hover:scale-110 transition-transform duration-DEFAULT flex items-center justify-center"
                    /> */}
                    <div className="w-5 h-5 relative flex items-center justify-center transition-transform duration-DEFAULT">
                      <Image
                        src="/icons/logo.png" // replace with your image path
                        alt="Excel Dashboard"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-primary group-hover:text-primary-light font-medium transition duration-DEFAULT">
                    Excel Dashboard
                  </span>
                </div>
              </div>
            </div>
            {/* Button group for sample preview toggle and download */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full sm:w-fit">
              <button
                className="btn-secondary w-full sm:w-fit"
                // onClick={() => {
                //   setShowSamplePreview((v) => !v);
                //   if (!showSamplePreview) {
                //     resetUploadUI();
                //   } else {
                //     resetUploadUI();
                //   }
                // }}
                onClick={handleSampleDownload}
              >
                {showSamplePreview
                  ? "Hide Sample File"
                  : "Download Sample File"}
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
            {/* sample video */}
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <video
                src="/rain.mp4" // public folder me video dalna hai
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            {/* Sample Preview Modal */}
            {showSamplePreview && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
                <div className="relative bg-white w-full h-full flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-primary to-primary-dark">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-semibold">
                          Sample File Preview
                        </h3>
                        <p className="text-white/80 text-sm">
                          Example cash flow data format
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-white hover:text-gray-200 text-2xl font-bold focus:outline-none transition-colors duration-200"
                      onClick={() => setShowSamplePreview(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-hidden">
                    <div className="p-6 h-full overflow-auto">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          Sample Data Structure
                        </h4>
                        <p className="text-gray-600 text-sm">
                          This is the expected format for your cash flow data:
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 border border-gray-200">
                        <TablePreview data={sampleTable} />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          className="btn-primary px-6 py-3 flex items-center space-x-2"
                          onClick={handleSampleDownload}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>Download Sample File</span>
                        </button>
                      </div>
                      <button
                        className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setShowSamplePreview(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Upload/Preview */}
          <div className="flex-1 flex flex-col items-center justify-start w-full min-w-[320px] min-h-[340px] transition-all duration-300">
            {/* Upload Section */}
            {!showPreview && !showSamplePreview && (
              <div
                key={showSamplePreview ? "hidden" : "visible"}
                className="w-full max-w-md min-w-[320px] min-h-[320px] flex flex-col justify-center items-center"
              >
                {/* Show processed file button if data exists */}
                {processedFile &&
                  processedFileData &&
                  processedFileData.length > 0 && (
                    <div className="w-full mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              File Processed Successfully
                            </p>
                            <p className="text-xs text-green-600">
                              {processedFileName}
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn-primary px-4 py-2 text-sm flex items-center space-x-2"
                          onClick={() => setShowPreview(true)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span>View Results</span>
                        </button>
                      </div>
                    </div>
                  )}

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
                    Drag & drop Excel here
                    <br className="hidden sm:block" />
                    <span className="text-md text-accent-dark">
                      or <br /> Browse File
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
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!file || !!status}
                  onClick={handleUpload}
                >
                  Upload Excel File
                </button>
                {status && (
                  <div className="mt-4 flex items-center justify-center">
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                        status.includes("complete") || status.includes("✓")
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : status.includes("failed") ||
                            status.includes("error")
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200 animate-pulse"
                      }`}
                    >
                      {status.includes("complete") || status.includes("✓") ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : status.includes("failed") ||
                        status.includes("error") ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      )}
                      <span>{status}</span>
                    </div>
                  </div>
                )}
                {/* Information message */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">File Requirements:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Only Excel files (.xlsx, .xls) are supported</li>
                        <li>
                          • Watch the quick tutorial video to see exactly how to
                          upload your data.
                        </li>
                        <li>
                          • Ensure your file matches the sample format provided
                          for a smooth import
                        </li>
                        <li>• Maximum file size: 10MB</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Processed File Preview Modal */}
            {showPreview && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
                <div className="relative bg-white w-full h-full flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-primary to-primary-dark">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-semibold">
                          Processed File Preview
                        </h3>
                        <p className="text-white/80 text-sm">
                          Your cash flow analysis is ready
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-white hover:text-gray-200 text-2xl font-bold focus:outline-none transition-colors duration-200"
                      onClick={() => setShowPreview(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-hidden">
                    {processedFileData && processedFileData.length > 0 ? (
                      <div className="p-6 h-full overflow-auto">
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Analysis Results
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Below is a preview of your processed cash flow data:
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 border border-gray-200">
                          <TablePreview data={processedFileData} />
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          File Processed Successfully
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Your file has been processed and is ready for
                          download.
                        </p>
                        <p className="text-gray-500 text-sm">
                          Click the download button below to get your processed
                          file
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                      <div className="flex flex-col sm:flex-row gap-3">
                        {processedFile && (
                          <button
                            className="btn-primary px-6 py-3 flex items-center space-x-2"
                            onClick={handleDownloadProcessed}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span>Download Processed File</span>
                          </button>
                        )}
                        <button
                          className="btn-secondary px-6 py-3 flex items-center space-x-2"
                          onClick={handleReset}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                          <span>Upload New File</span>
                        </button>
                      </div>
                      <button
                        className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setShowPreview(false)}
                      >
                        Close
                      </button>
                    </div>
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
