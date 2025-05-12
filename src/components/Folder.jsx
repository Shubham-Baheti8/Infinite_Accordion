import React, { useState } from "react";
import "./Folder.css";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevent accordion toggle
    setShowInput(true);
    setExpand(true); // auto-expand when adding
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

      <div className={`folder__content ${expand ? "folder__content--expanded" : ""}`}>
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

        {explorer.items?.map((item) => (
          <Folder key={item.id} explorer={item} handleInsertNode={handleInsertNode} />
        ))}
      </div>
    </div>
  );
};

export default Folder;
