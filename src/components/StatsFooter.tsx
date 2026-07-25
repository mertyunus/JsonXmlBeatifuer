"use client";

import React, { useMemo } from "react";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface StatsFooterProps {
  value: string;
  error?: string | null;
  modeLabel: string;
}

export default function StatsFooter({ value, error, modeLabel }: StatsFooterProps) {
  const stats = useMemo(() => {
    if (!value) {
      return { lines: 0, chars: 0, sizeKB: "0.00" };
    }
    const lines = value.split("\n").length;
    const chars = value.length;
    const sizeBytes = new Blob([value]).size;
    const sizeKB = (sizeBytes / 1024).toFixed(2);
    return { lines, chars, sizeKB };
  }, [value]);

  return (
    <div className="editor-footer">
      <div className="flex items-center gap-4">
        <span>Ln: {stats.lines}</span>
        <span>Chars: {stats.chars}</span>
        <span>Size: {stats.sizeKB} KB</span>
      </div>

      <div className="flex items-center gap-2 font-medium">
        {error ? (
          <span className="text-red-400 flex items-center gap-1">
            <AlertTriangle size={12} />
            {error}
          </span>
        ) : value ? (
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={12} />
            Valid {modeLabel}
          </span>
        ) : (
          <span className="text-gray-400 flex items-center gap-1">
            <Info size={12} />
            Ready
          </span>
        )}
      </div>
    </div>
  );
}
