"use client";

import React, { useRef } from "react";
import { Upload, CheckCircle2, Sparkles, Minimize2, ArrowRightLeft, Download } from "lucide-react";
import { StudioMode } from "./Header";

interface CenterControlsProps {
  mode: StudioMode;
  tabSize: number;
  onTabSizeChange: (size: number) => void;
  onUpload: (content: string, filename: string) => void;
  onValidate: () => void;
  onBeautify: () => void;
  onMinify: () => void;
  onConvert: () => void;
  onDownload: () => void;
}

export default function CenterControls({
  mode,
  tabSize,
  onTabSizeChange,
  onUpload,
  onValidate,
  onBeautify,
  onMinify,
  onConvert,
  onDownload,
}: CenterControlsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onUpload(content, file.name);
      }
    };
    reader.readAsText(file);
    // reset input
    e.target.value = "";
  };

  const getConvertLabel = () => {
    if (mode === "xml") return "Convert XML to JSON";
    if (mode === "converter") return "Swap JSON ↔ XML";
    return "Convert JSON to XML";
  };

  const getBottomLabel = () => {
    if (mode === "xml") return "XML Full Form";
    if (mode === "converter") return "Bidirectional Studio";
    return "JSON Full Form";
  };

  return (
    <div className="center-controls">
      {/* Hidden file input for Upload Data */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,.xml,.txt"
        style={{ display: "none" }}
      />

      <button
        className="action-btn secondary"
        onClick={() => fileInputRef.current?.click()}
        title="Upload file from local disk"
      >
        <Upload size={16} />
        <span>Upload Data</span>
      </button>

      <button
        className="action-btn secondary"
        onClick={onValidate}
        title="Validate syntax of input data"
      >
        <CheckCircle2 size={16} className="text-emerald-400" />
        <span>Validate</span>
      </button>

      <select
        className="control-select"
        value={tabSize}
        onChange={(e) => onTabSizeChange(Number(e.target.value))}
        title="Select indentation spacing"
      >
        <option value={1}>1 Space Indent</option>
        <option value={2}>2 Tab Space</option>
        <option value={3}>3 Space Indent</option>
        <option value={4}>4 Tab Space</option>
      </select>

      <button
        className="action-btn highlight"
        onClick={onBeautify}
        title="Beautify and format messy data"
      >
        <Sparkles size={18} />
        <span>Format / Beautify</span>
      </button>

      <button
        className="action-btn secondary"
        onClick={onMinify}
        title="Compact data to a single line"
      >
        <Minimize2 size={16} />
        <span>Minify / Compact</span>
      </button>

      <button
        className="action-btn secondary"
        onClick={onConvert}
        title="Convert format between JSON and XML"
      >
        <ArrowRightLeft size={16} />
        <span>{getConvertLabel()}</span>
      </button>

      <button
        className="action-btn secondary"
        onClick={onDownload}
        title="Download formatted output as file"
      >
        <Download size={16} />
        <span>Download</span>
      </button>

      <div className="center-label">{getBottomLabel()}</div>
    </div>
  );
}
