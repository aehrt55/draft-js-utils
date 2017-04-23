export default {
  update: (contentState, selectionState, update) => {
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();
    const startOffset = selectionState.getStartOffset();
    const endOffset = selectionState.getEndOffset();
    let inSelection = false;
    return contentState.update('blockMap', (blockMap) => blockMap.map((block, blockKey) => {
      if (blockKey === startKey) {
        inSelection = true;
      }
      if (!inSelection) {
        return block;
      }
      if (blockKey === endKey) {
        inSelection = false;
      }
      let sliceStart;
      let sliceEnd;
      if (startKey === endKey) {
        sliceStart = startOffset;
        sliceEnd = endOffset;
      } else {
        sliceStart = (blockKey === startKey) ? startOffset : 0;
        sliceEnd = (blockKey === endKey) ? endOffset : block.getLength();
      }
      return block.update('characterList', (characterList) => characterList.map((characterMetaData, index) => {
        if (sliceStart <= index && index <= sliceEnd) {
          return characterMetaData.update('style', update);
        }
        return characterMetaData;
      }));
    }))
    .merge({ selectionBefore: selectionState, selectionAfter: selectionState });
  },
};
