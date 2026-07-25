"use client";

import React, { useRef, useMemo } from "react";
import { Copy, Trash2, FileText, Check, Sparkles } from "lucide-react";

interface EditorPanelProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  onClear?: () => void;
  onCopy?: () => void;
  onSampleLoad?: () => void;
  viewMode?: "code" | "tree";
  onViewModeChange?: (mode: "code" | "tree") => void;
  hasCopied?: boolean;
  tabSize?: number;
  children?: React.ReactNode; // For TreeView when in tree mode
}

export default function EditorPanel({
  title,
  value,
  onChange,
  readOnly = false,
  placeholder = "Paste your messy JSON or XML data here...",
  onClear,
  onCopy,
  onSampleLoad,
  viewMode = "code",
  onViewModeChange,
  hasCopied = false,
  tabSize = 2,
  children,
}: EditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lineNumbersRef = useRef<HTMLDivElement | null>(null);

  // Sync scrolling between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Calculate line numbers
  const lineCount = useMemo(() => {
    if (!value) return 1;
    return value.split("\n").length;
  }, [value]);

  const lineNumbersArray = useMemo(() => {
    const arr = [];
    const max = Math.max(lineCount, 1);
    for (let i = 1; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }, [lineCount]);

  // Handle Tab key pressing inside textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const spaces = " ".repeat(tabSize);

      const newValue = value.substring(0, start) + spaces + value.substring(end);
      onChange(newValue);

      // Restore cursor position after state update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tabSize;
        }
      }, 0);
    }
  };

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <div className="editor-title">
          <FileText size={16} className="text-emerald-400" />
          <span>{title}</span>
          {onViewModeChange && (
            <div className="relative inline-block ml-2">
              <select
                className="bg-transparent border border-gray-600 rounded px-2 py-0.5 text-xs text-white cursor-pointer outline-none"
                value={viewMode}
                onChange={(e) => onViewModeChange(e.target.value as "code" | "tree")}
              >
                <option value="code" className="bg-gray-800 text-white">Code v</option>
                <option value="tree" className="bg-gray-800 text-white">Tree v</option>
              </select>
            </div>
          )}
        </div>

        <div className="editor-tools">
          {onSampleLoad && (
            <button className="tool-btn" onClick={onSampleLoad} title="Load sample test data">
              <Sparkles size={14} />
              <span>Sample</span>
            </button>
          )}
          {onCopy && (
            <button className="tool-btn" onClick={onCopy} title="Copy to clipboard">
              {hasCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{hasCopied ? "Copied!" : "Copy"}</span>
            </button>
          )}
          {onClear && (
            <button className="tool-btn danger" onClick={onClear} title="Clear editor content">
              <Trash2 size={14} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="editor-body">
        {viewMode === "code" ? (
          <>
            <div className="line-numbers" ref={lineNumbersRef}>
              {lineNumbersArray.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              className="code-textarea"
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              readOnly={readOnly}
              spellCheck={false}
              style={{ tabSize: tabSize }}
            />
          </>
        ) : (
          <div className="tree-container" style={{ width: "100%" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
