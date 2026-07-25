"use client";

import React, { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import Header, { StudioMode, ThemeMode } from "@/components/Header";
import EditorPanel from "@/components/EditorPanel";
import CenterControls from "@/components/CenterControls";
import TreeView from "@/components/TreeView";
import StatsFooter from "@/components/StatsFooter";

const SAMPLE_JSON_MESSY = `{"WorkflowUN":93,"CrmControlTipsAndValues":[{"ControlTipUN":1426,"Value":"8971"},{"ControlTipUN":1428,"Value":"8972"},{"ControlTipUN":1761,"Value":"21121"}],"Status":"Success","Metadata":{"Timestamp":"2026-07-25T18:50:00Z","ProcessedBy":"JsonXmlBeatifuer Engine","Version":2.5,"IsActive":true,"Tags":["realtime","fast","studio"]}}`;

const SAMPLE_XML_MESSY = `<Response><WorkflowUN>93</WorkflowUN><CrmControlTipsAndValues><Item><ControlTipUN>1426</ControlTipUN><Value>8971</Value></Item><Item><ControlTipUN>1428</ControlTipUN><Value>8972</Value></Item></CrmControlTipsAndValues><Status>Success</Status><Metadata><Version>2.5</Version><IsActive>true</IsActive></Metadata></Response>`;

export default function Home() {
  const [mode, setMode] = useState<StudioMode>("json");
  const [theme, setTheme] = useState<ThemeMode>("mint");
  const [tabSize, setTabSize] = useState<number>(2);

  const [inputVal, setInputVal] = useState<string>(SAMPLE_JSON_MESSY);
  const [outputVal, setOutputVal] = useState<string>("");
  const [outputViewMode, setOutputViewMode] = useState<"code" | "tree">("code");

  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // Set theme attribute on html/body
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Show toast temporary notification
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Trigger confetti feedback
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#2bb283", "#00f2fe", "#4facfe", "#22c55e", "#ffffff"],
      });
    } catch {
      // ignore if canvas blocked
    }
  };

  // Handle Mode Switching
  const handleModeChange = (newMode: StudioMode) => {
    setMode(newMode);
    setError(null);
    if (newMode === "xml" && inputVal === SAMPLE_JSON_MESSY) {
      setInputVal(SAMPLE_XML_MESSY);
      setOutputVal("");
    } else if (newMode === "json" && inputVal === SAMPLE_XML_MESSY) {
      setInputVal(SAMPLE_JSON_MESSY);
      setOutputVal("");
    }
  };

  // Sample Loader
  const handleSampleLoad = () => {
    if (mode === "xml") {
      setInputVal(SAMPLE_XML_MESSY);
    } else {
      setInputVal(SAMPLE_JSON_MESSY);
    }
    setError(null);
    showToast("Sample data loaded into Left Editor!");
  };

  // Validate Syntax
  const handleValidate = () => {
    if (!inputVal.trim()) {
      setError("Input is empty");
      showToast("Please paste JSON or XML data first.", "error");
      return false;
    }

    try {
      if (mode === "xml" || (mode === "converter" && inputVal.trim().startsWith("<"))) {
        const parser = new XMLParser({ ignoreAttributes: false });
        const result = parser.parse(inputVal);
        if (!result || Object.keys(result as object).length === 0) {
          throw new Error("Invalid XML formatting or empty root node.");
        }
      } else {
        JSON.parse(inputVal);
      }
      setError(null);
      showToast("✔ Valid syntax! Ready to beautify.");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      showToast(`Syntax Error: ${msg}`, "error");
      return false;
    }
  };

  // Format / Beautify
  const handleBeautify = () => {
    if (!inputVal.trim()) {
      showToast("Input is empty!", "error");
      return;
    }

    try {
      let formatted = "";
      if (mode === "xml" || (mode === "converter" && inputVal.trim().startsWith("<"))) {
        const parser = new XMLParser({ ignoreAttributes: false, preserveOrder: true });
        const parsed = parser.parse(inputVal);
        const builder = new XMLBuilder({
          ignoreAttributes: false,
          format: true,
          indentBy: " ".repeat(tabSize),
          preserveOrder: true,
        });
        formatted = builder.build(parsed);
      } else {
        const parsed = JSON.parse(inputVal);
        formatted = JSON.stringify(parsed, null, tabSize);
      }

      setOutputVal(formatted);
      setError(null);
      showToast("✨ Beautifully formatted!");
      triggerConfetti();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to beautify";
      setError(msg);
      showToast(`Error: ${msg}`, "error");
    }
  };

  // Minify / Compact
  const handleMinify = () => {
    if (!inputVal.trim()) {
      showToast("Input is empty!", "error");
      return;
    }

    try {
      let minified = "";
      if (mode === "xml" || (mode === "converter" && inputVal.trim().startsWith("<"))) {
        const parser = new XMLParser({ ignoreAttributes: false });
        const parsed = parser.parse(inputVal);
        const builder = new XMLBuilder({ ignoreAttributes: false, format: false });
        minified = builder.build(parsed);
      } else {
        const parsed = JSON.parse(inputVal);
        minified = JSON.stringify(parsed);
      }

      setOutputVal(minified);
      setError(null);
      showToast("📦 Compaction complete!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to minify";
      setError(msg);
      showToast(`Error: ${msg}`, "error");
    }
  };

  // Convert JSON <-> XML
  const handleConvert = () => {
    if (!inputVal.trim()) {
      showToast("Input is empty!", "error");
      return;
    }

    try {
      const isXmlInput = inputVal.trim().startsWith("<");
      if (isXmlInput) {
        // XML -> JSON
        const parser = new XMLParser({ ignoreAttributes: false });
        const parsed = parser.parse(inputVal);
        const jsonStr = JSON.stringify(parsed, null, tabSize);
        setOutputVal(jsonStr);
        showToast("Converted XML to JSON!");
      } else {
        // JSON -> XML
        const parsed = JSON.parse(inputVal);
        const builder = new XMLBuilder({
          ignoreAttributes: false,
          format: true,
          indentBy: " ".repeat(tabSize),
        });
        const xmlStr = builder.build(parsed);
        setOutputVal(xmlStr);
        showToast("Converted JSON to XML!");
      }
      setError(null);
      triggerConfetti();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed conversion";
      setError(msg);
      showToast(`Conversion Error: ${msg}`, "error");
    }
  };

  // Upload File
  const handleUpload = (content: string, filename: string) => {
    setInputVal(content);
    if (filename.endsWith(".xml")) {
      setMode("xml");
    } else if (filename.endsWith(".json")) {
      setMode("json");
    }
    showToast(`Loaded file: ${filename}`);
  };

  // Download Output
  const handleDownload = () => {
    if (!outputVal) {
      showToast("No output to download. Please format or convert first!", "error");
      return;
    }
    const isXml = outputVal.trim().startsWith("<");
    const ext = isXml ? "xml" : "json";
    const filename = `beautified-output.${ext}`;
    const blob = new Blob([outputVal], { type: isXml ? "application/xml" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}!`);
  };

  // Copy Output
  const handleCopy = () => {
    if (!outputVal) {
      showToast("Nothing to copy yet!", "error");
      return;
    }
    navigator.clipboard.writeText(outputVal);
    setHasCopied(true);
    showToast("Copied formatted code to clipboard!");
    triggerConfetti();
    setTimeout(() => setHasCopied(false), 2000);
  };

  // Tree View Data Parsing
  const parsedTreeData = useMemo(() => {
    if (!outputVal) return null;
    try {
      if (outputVal.trim().startsWith("<")) {
        const parser = new XMLParser({ ignoreAttributes: false });
        return parser.parse(outputVal);
      }
      return JSON.parse(outputVal);
    } catch {
      return null;
    }
  }, [outputVal]);

  return (
    <div className="app-container">
      <Header
        activeMode={mode}
        onModeChange={handleModeChange}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="studio-main">
        {/* Left Column: Input Panel */}
        <div className="flex flex-col h-full overflow-hidden">
          <EditorPanel
            title={mode === "xml" ? "Input XML (Messy / Single Line)" : "Input JSON (Messy / Single Line)"}
            value={inputVal}
            onChange={setInputVal}
            onClear={() => {
              setInputVal("");
              setOutputVal("");
              setError(null);
            }}
            onSampleLoad={handleSampleLoad}
            tabSize={tabSize}
            placeholder={`Paste your unformatted ${mode.toUpperCase()} here...`}
          />
          <StatsFooter value={inputVal} error={error} modeLabel={mode === "xml" ? "XML" : "JSON"} />
        </div>

        {/* Center Column: Action Buttons */}
        <CenterControls
          mode={mode}
          tabSize={tabSize}
          onTabSizeChange={setTabSize}
          onUpload={handleUpload}
          onValidate={handleValidate}
          onBeautify={handleBeautify}
          onMinify={handleMinify}
          onConvert={handleConvert}
          onDownload={handleDownload}
        />

        {/* Right Column: Output Panel */}
        <div className="flex flex-col h-full overflow-hidden">
          <EditorPanel
            title={mode === "xml" ? "Formatted XML Output" : "Formatted JSON Output"}
            value={outputVal}
            readOnly={true}
            onCopy={handleCopy}
            hasCopied={hasCopied}
            viewMode={outputViewMode}
            onViewModeChange={setOutputViewMode}
            tabSize={tabSize}
            placeholder="Formatted / Beautified output will appear here..."
          >
            <TreeView data={parsedTreeData} />
          </EditorPanel>
          <StatsFooter value={outputVal} modeLabel={mode === "xml" ? "XML" : "JSON"} />
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast-alert ${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
