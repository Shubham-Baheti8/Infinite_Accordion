import { useState } from 'react';
import Folder from './components/Folder';
import explorer from './data/folderData';
import useTraverseTree from './hooks/use-traverse-tree';
import './App.css';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, itemName) => {
    const updatedTree = insertNode(explorerData, folderId, itemName);
    setExplorerData(updatedTree);
  };

  return (
    <div className="app">
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}

export default App;
