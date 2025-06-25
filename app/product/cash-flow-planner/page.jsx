"use client";
import { useState, useRef } from "react";
import Container from "../../components/Container";
import Input from "../../components/ui/Input";
import {
  CloudArrowUpIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const PRODUCT_TITLE = "Cashflow Planner";
const PRODUCT_DESC =
  "AI planner with smart alerts for collections, shortfalls, and cash position. Stay alert. Stay ahead.";

const UPLOAD_STEPS = [
  "Connecting to Power BI service...",
  "Uploading CSV data...",
  "Creating dataset...",
  "Generating visualizations...",
  "Publishing report...",
  "Generating embed URL...",
];

function mockApiCall(file) {
  return new Promise((resolve) => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === UPLOAD_STEPS.length) {
        clearInterval(interval);
        // Simulate backend response
        const mockReportId = Math.random().toString(36).substr(2, 9);
        const mockEmbedUrl = `https://app.powerbi.com/reportEmbed?reportId=${mockReportId}&groupId=mock-workspace&config=mock-config`;
        resolve({
          embedUrl: mockEmbedUrl,
          reportId: mockReportId,
        });
      }
    }, 900);
  });
}

export default function CashFlowPlannerPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [embedData, setEmbedData] = useState(null);
  const [file, setFile] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const intervalRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setStepIndex(0);
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < UPLOAD_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(intervalRef.current);
          return prev;
        }
      });
    }, 900);
    const data = await mockApiCall(file);
    setEmbedData(data);
    setUploading(false);
  };

  const handleReset = () => {
    setEmbedData(null);
    setFile(null);
    setStepIndex(0);
    setUploading(false);
    setFullscreen(false);
  };

  const handleDownload = () => {
    alert("Download Report (mocked)");
  };
  const handleOpenInPowerBI = () => {
    if (embedData?.embedUrl) {
      window.open(embedData.embedUrl, "_blank");
    }
  };
  const handleFullscreen = () => {
    setFullscreen(true);
  };
  const handleCloseFullscreen = () => {
    setFullscreen(false);
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-background-light to-secondary/5 min-h-[80vh] py-24">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 items-center md:items-start">
          {/* Left: Product Info */}
          <div className="flex-1 space-y-8 md:pt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-primary drop-shadow-sm">
              {PRODUCT_TITLE}
            </h1>
            <p className="text-lg md:text-xl text-accent-dark max-w-xl">
              {PRODUCT_DESC}
            </p>
          </div>
          {/* Right: File Upload or Report */}
          <div className="flex-1 w-full max-w-lg">
            {!embedData ? (
              <form onSubmit={handleUpload} className="space-y-8">
                <label
                  htmlFor="file-upload"
                  className={`flex flex-col items-center justify-center border-2 border-dashed border-primary/40 rounded-2xl bg-white/80 hover:bg-primary/10 transition-colors duration-200 py-16 px-6 text-center shadow-none focus-within:ring-2 focus-within:ring-primary outline-none relative group
                    ${uploading ? "opacity-60 pointer-events-none" : ""}
                    cursor-pointer
                  `}
                >
                  <CloudArrowUpIcon
                    className={`w-16 h-16 mb-4 group-hover:scale-110 transition-transform text-primary`}
                  />
                  <span className={`text-lg font-semibold ${file && !uploading ? "text-primary" : "text-primary/40"}`}>
                    Drag & drop your CSV file here
                  </span>
                  <span className="text-accent-dark text-sm mt-2">
                    or click to browse
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                    required
                  />
                  {file && (
                    <span className="mt-4 text-primary font-medium text-sm truncate max-w-xs">
                      {file.name}
                    </span>
                  )}
                </label>
                <button
                  type="submit"
                  className={`btn btn-primary w-full text-lg transition-all
                    ${!file ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-100"}
                  `}
                  disabled={!file}
                >
                  {uploading ? "Uploading..." : "Upload & Analyze"}
                </button>
                {uploading && (
                  <div className="mt-8 space-y-3">
                    {UPLOAD_STEPS.slice(0, stepIndex + 1).map((msg, idx) => (
                      <div
                        key={idx}
                        className="text-base text-primary flex items-center gap-3 animate-fade-in"
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {msg}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <div className="flex flex-col items-center space-y-8">
                {/* Fullscreen overlay */}
                {fullscreen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <iframe
                        src={embedData.embedUrl}
                        title="Power BI Report Fullscreen"
                        className="w-[90vw] h-[90vh] rounded-xl border-2 border-primary/20 shadow-2xl bg-white"
                        allowFullScreen
                      />
                      <button
                        className="absolute top-6 right-8 z-10 p-2 bg-white/80 rounded-full hover:bg-primary/10 text-primary shadow-lg"
                        onClick={handleCloseFullscreen}
                        aria-label="Close Fullscreen"
                      >
                        <XMarkIcon className="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                )}
                <div className="relative w-full">
                  <iframe
                    src={embedData.embedUrl}
                    title="Power BI Report"
                    className="w-full h-80 rounded-xl border-2 border-primary/20 shadow-md bg-white"
                    allowFullScreen
                  />
                  <button
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-primary/10 text-primary shadow-md"
                    onClick={handleFullscreen}
                    aria-label="View Fullscreen"
                  >
                    <ArrowsPointingOutIcon className="w-7 h-7" />
                  </button>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <button
                    className="btn btn-primary w-full text-lg"
                    onClick={handleDownload}
                  >
                    Download Report
                  </button>
                  <button
                    className="btn btn-secondary w-full text-lg"
                    onClick={handleOpenInPowerBI}
                  >
                    Open in Power BI
                  </button>
                  <button className="btn w-full text-lg" onClick={handleReset}>
                    Upload New File
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
