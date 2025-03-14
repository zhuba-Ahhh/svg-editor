import MonacoEditor, {OnMount} from '@monaco-editor/react'
import { FormatPainterOutlined } from '@ant-design/icons'
import './style.less'
import { useState } from 'react'

interface EditorProps {
  value: string
  onChange: (value: string | undefined) => void
  defaultValue: string
}

type EditorType = Parameters<OnMount>[0]

const Editor = ({ value, onChange, defaultValue }: EditorProps) => {
  const [editor, setEditor] = useState<EditorType | null>(null)
  const handleEditorDidMount: OnMount = (editorInstance, monaco) => {
    if (!editorInstance) return
    setEditor(editorInstance)
    editor?.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
      editor?.trigger('undo', 'undo', null)
    })
    editor?.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY, () => {
      editor?.trigger('redo', 'redo', null)
    })
  }

  const formatDocument = (editor: EditorType) => {
    if(editor && editor?.getAction) {
      editor?.getAction('editor.action.formatDocument')?.run()
    }
  }

  return (
    <div className="editor-container">
      <div className="format-button" onClick={() => editor && formatDocument(editor)}>
        <FormatPainterOutlined />
      </div>
      <MonacoEditor
        height="100%"
        defaultLanguage="xml"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        theme="vs-light"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  )
}

export default Editor