const insertNode = (tree, folderId, itemName) => {
    if (tree.id === folderId) {
      const newItem = {
        id: new Date().getTime().toString(),
        name: itemName,
        items: []
      };
      return { ...tree, items: [...tree.items, newItem] };
    }
  
    return {
      ...tree,
      items: tree.items.map(child => insertNode(child, folderId, itemName))
    };
  };
  
  const useTraverseTree = () => {
    return { insertNode };
  };
  
  export default useTraverseTree;
  