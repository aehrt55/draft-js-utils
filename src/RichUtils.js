import { EditorState } from 'draft-js';
import { update } from './ContentStateInlineStyle';

export default {
  updateInlineStyle: (editorState, update) => {
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    if (selection.isCollapsed()) {
      return EditorState.setInlineStyleOverride(editorState, update(currentStyle));
    }
    const content = editorState.getCurrentContent();
    return EditorState.push(editorState, update(content, selection, update), 'change-inline-style');
  },
};
