import { ForwardedRef } from 'react'
import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  ImageUploadHandler,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  markdownShortcutPlugin,
  MDXEditorMethods,
  MDXEditorProps,
  MDXEditor as OGMDXEditor,
  ShowSandpackInfo,
  UndoRedo,
} from '@mdxeditor/editor'
import {
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import { cn } from '~/lib/utils'
import { useUploadMdxImage } from '~/hooks/uploads/useUploadMdxImage'

type Props = {
  editorRef?: ForwardedRef<MDXEditorMethods> | null
} & MDXEditorProps

export const MDXEditor = ({
  markdown = '',
  contentEditableClassName,
  onChange,
  readOnly = true,
  editorRef,
}: Props) => {
  const { uploadMdxImage, isUploadingImage, mutate } = useUploadMdxImage()

  const toolBarPlugin = toolbarPlugin({
    toolbarContents: () => (
      <>
        <UndoRedo />
        <BoldItalicUnderlineToggles />
        <InsertFrontmatter />
        <InsertImage />
        <ConditionalContents
          options={[
            {
              when: (editor) => editor?.editorType === 'codeblock',
              contents: () => <ChangeCodeMirrorLanguage />,
            },
            {
              when: (editor) => editor?.editorType === 'sandpack',
              contents: () => <ShowSandpackInfo />,
            },
            {
              fallback: () => (
                <>
                  <InsertCodeBlock />
                  <InsertSandpack />
                </>
              ),
            },
          ]}
        />
      </>
    ),
  })

  const imageUploadHandler: ImageUploadHandler = async (image) => {
    try {
      const response = await uploadMdxImage(image)
      return response.data.url
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  const plugins = [
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({ imageUploadHandler }),
    tablePlugin(),
    markdownShortcutPlugin(),
  ]

  if (!readOnly) {
    plugins.push(toolBarPlugin)
  }

  try {
    return (
      <OGMDXEditor
        ref={editorRef}
        readOnly={readOnly}
        markdown={markdown}
        plugins={plugins}
        className="dark:bg-black bg-white w-full"
        contentEditableClassName={cn(
          'prose',
          'w-full min-h-screen', // Full width and minimum height
          'dark:text-gray-200 prose-strong:text-inherit prose-headings:text-inherit  text-gray-900', // Text colors for both modes
          'px-4 py-6', // Padding
          !readOnly && 'border dark:border-gray-700 border-gray-200',
          !readOnly && 'shadow-sm rounded-lg',
          contentEditableClassName
        )}
        onChange={onChange}
      />
    )
  } catch (error) {
    console.error('Error rendering MDXEditor:', error)
    return (
      <div className="w-full p-4 text-red-500 dark:text-red-400">
        Error loading the editor. Please try again.
      </div>
    )
  }
}
