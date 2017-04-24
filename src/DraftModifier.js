import modifyBlockForContentState from 'draft-js/lib/modifyBlockForContentState';

export default {
  updateBlockData: (contentState, selectionState, updater) => modifyBlockForContentState(
    contentState,
    selectionState,
    (block) => block.update('data', updater)
  ),
};
