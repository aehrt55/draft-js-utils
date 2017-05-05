import { EditorState, Modifier } from 'draft-js';
import ContentStateInlineStyle from './ContentStateInlineStyle';

const { update } = ContentStateInlineStyle;

export default {
  updateInlineStyle: (editorState, updater) => {
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    if (selection.isCollapsed()) {
      return EditorState.setInlineStyleOverride(editorState, updater(currentStyle));
    }
    const content = editorState.getCurrentContent();
    return EditorState.push(
      editorState,
      Modifier.applyInlineStyle(update(content, selection, updater), selection, ''),
      'change-inline-style'
    );
  },
};
