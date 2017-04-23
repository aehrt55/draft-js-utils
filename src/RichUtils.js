import { EditorState } from 'draft-js';
import { update } from './ContentStateInlineStyle';

export default {
  updateInlineStyle: (editorState, updater) => {
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    if (selection.isCollapsed()) {
      return EditorState.setInlineStyleOverride(editorState, updater(currentStyle));
    }
    const content = editorState.getCurrentContent();
    return EditorState.push(editorState, update(content, selection, updater), 'change-inline-style');
  },
};
