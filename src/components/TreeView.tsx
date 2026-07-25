"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Search, Folder, FolderOpen, Tag } from "lucide-react";

interface TreeViewProps {
  data: unknown;
}

export default function TreeView({ data }: TreeViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  if (data === undefined || data === null || data === "") {
    return (
      <div className="p-4 text-gray-400 italic text-sm">
        No valid data to render in Tree View. Please beautify valid JSON or XML first.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Search Bar */}
      <div className="flex items-center gap-2 p-2 mb-2 border-b border-gray-700 bg-black/10">
        <Search size={14} className="text-gray-400" />
        <input
          type="text"
          placeholder="Filter tree keys or values..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-500"
        />
      </div>

      <div className="flex-1 overflow-auto">
        <TreeNode name="root" value={data} defaultOpen={true} searchTerm={searchTerm.toLowerCase()} />
      </div>
    </div>
  );
}

interface TreeNodeProps {
  name: string | number;
  value: unknown;
  defaultOpen?: boolean;
  searchTerm?: string;
}

function TreeNode({ name, value, defaultOpen = false, searchTerm = "" }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const valueType = Array.isArray(value)
    ? "array"
    : value === null
    ? "null"
    : typeof value;

  const isComplex = valueType === "object" || valueType === "array";
  const childKeys = isComplex && value !== null && typeof value === "object" ? Object.keys(value as Record<string, unknown>) : [];

  // Check search filter match
  const nameStr = String(name).toLowerCase();
  const valStr = !isComplex ? String(value).toLowerCase() : "";
  const matchesSearch = !searchTerm || nameStr.includes(searchTerm) || valStr.includes(searchTerm);

  // If search is active and doesn't match this node (and not complex root), hide if no children match
  if (searchTerm && !matchesSearch && !isComplex) {
    return null;
  }

  const toggleOpen = () => {
    if (isComplex) setIsOpen(!isOpen);
  };

  const renderValue = () => {
    if (value === null) return <span className="text-red-400 font-mono">null</span>;
    if (value === undefined) return <span className="text-gray-500 font-mono">undefined</span>;
    if (typeof value === "boolean") return <span className="tree-boolean font-mono">{String(value)}</span>;
    if (typeof value === "number") return <span className="tree-number font-mono">{value}</span>;
    if (typeof value === "string") return <span className="tree-string font-mono">&quot;{value}&quot;</span>;
    if (Array.isArray(value)) return <span className="tree-badge">Array [{value.length}]</span>;
    if (typeof value === "object" && value !== null) {
      return <span className="tree-badge">Object &#123;{Object.keys(value as Record<string, unknown>).length}&#125;</span>;
    }
    return <span>{String(value)}</span>;
  };

  return (
    <div className="tree-node">
      <div className="tree-node-header" onClick={toggleOpen}>
        {isComplex ? (
          isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />
        ) : (
          <Tag size={12} className="text-gray-500 ml-1 mr-1" />
        )}

        {isComplex ? (
          isOpen ? <FolderOpen size={14} className="text-emerald-400" /> : <Folder size={14} className="text-emerald-400" />
        ) : null}

        <span className="tree-key">{name}:</span>
        <span className="ml-1">{renderValue()}</span>
      </div>

      {isComplex && isOpen && typeof value === "object" && value !== null && (
        <div className="border-l border-gray-700/50 ml-2 pl-2">
          {childKeys.map((key) => (
            <TreeNode
              key={key}
              name={key}
              value={(value as Record<string, unknown>)[key]}
              defaultOpen={defaultOpen && childKeys.length < 10}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
}
