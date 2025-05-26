import React, { useState } from "react";
import "./Folder.css";

const Folder = ({
  explorer,
  handleInsertNode,
  expandedPath,
  setExpandedPath,
  currentPath
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fullPath = [...currentPath, explorer.id];

  const isExpanded =
    expandedPath.length >= fullPath.length &&
    fullPath.every((id, idx) => expandedPath[idx] === id);

  const toggleExpand = (e) => {
    e.stopPropagation();
    if (isExpanded) {
      // Collapse this folder and all children
      setExpandedPath(expandedPath.slice(0, fullPath.length - 1));
    } else {
      // Expand this folder only
      setExpandedPath(fullPath);
    }
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    setShowInput(true);
    setExpandedPath(fullPath); // expand only this path
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleInsertNode(explorer.id, inputValue.trim());
      setShowInput(false);
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    setShowInput(false);
    setInputValue("");
  };

  return (
    <div className="folder">
      <div className="folder__header" onClick={toggleExpand}>
        <div className="folder__info">
          <span className="folder__icon">📁</span>
          <span className="folder__name">{explorer.name}</span>
        </div>
        <button className="folder__button" onClick={handleAddClick}>+ Add</button>
      </div>

      <div className={`folder__content ${isExpanded ? "folder__content--expanded" : ""}`}>
        {showInput && (
          <div className="folder__input-wrapper">
            <input
              type="text"
              className="folder__input"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder="Enter item name"
            />
          </div>
        )}

        {isExpanded &&
          explorer.items?.map((item) => (
            <Folder
              key={item.id}
              explorer={item}
              handleInsertNode={handleInsertNode}
              expandedPath={expandedPath}
              setExpandedPath={setExpandedPath}
              currentPath={fullPath}
            />
          ))}
      </div>
    </div>
  );
};

export default Folder;
