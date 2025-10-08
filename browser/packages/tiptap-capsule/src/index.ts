export { default as TiptapEditorCapsule } from './TiptapEditorCapsule.vue'

export interface TiptapEditorCapsuleProps {
  modelValue?: string
  enableVueTextBtnDemo?: boolean
  onHtmlPresentChanged?: (html: string) => void
  onJsonPresentChanged?: (json: any) => void
}

export interface TiptapEditorCapsuleRef {
  getHTML: () => string
  getJSON: () => any
  editor: any
}
