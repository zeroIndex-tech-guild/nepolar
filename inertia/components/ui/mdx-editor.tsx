import React, { useCallback } from 'react'
import {
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertSandpack,
  markdownShortcutPlugin,
  MDXEditor as OGMDXEditor,
  SandpackConfig,
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

type Props = {
  /** The current markdown content of the editor */
  markdown: string

  /**
   * Callback for handling image upload.
   * It takes an image file as input and returns the URL of the uploaded image.
   */
  imageDropHandler?: (image: File) => Promise<string>

  /**
   * CSS class for the content editable area.
   * Defaults to 'prose' (a Tailwind typography utility class).
   */
  contentEditableClassName?: string

  /**
   * Callback fired when the markdown content changes.
   */
  onChange?: (markdown: string) => void

  /**
   * Whether the editor is read-only.
   * Defaults to false.
   */
  readOnly?: boolean
}

// Default Sandpack snippet content
const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

// Simple Sandpack configuration for React
const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
}

const createPlugins = (imageDropHandler: (image: File) => Promise<string>, readOnly: boolean) => [
  headingsPlugin({}),
  quotePlugin({}),
  listsPlugin({}),
  thematicBreakPlugin({}),
  linkPlugin({}),
  linkDialogPlugin({}),
  imagePlugin({ imageUploadHandler: imageDropHandler }),
  tablePlugin({}),
  markdownShortcutPlugin({}),

  !readOnly &&
    toolbarPlugin({
      toolbarContents: () => (
        <>
          <UndoRedo />
          <BoldItalicUnderlineToggles />
          <InsertFrontmatter />
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
    }),
]

export const MDXEditor: React.FC<Props> = ({
  markdown = '',
  imageDropHandler,
  contentEditableClassName,
  onChange,
  readOnly = true,
}) => {
  const plugins = createPlugins(imageDropHandler, readOnly)

  const handleChange = useCallback(
    (newMarkdown: string) => {
      onChange(newMarkdown)
    },
    [onChange]
  )

  try {
    return (
      <OGMDXEditor
        readOnly={readOnly}
        markdown={markdown}
        plugins={plugins}
        contentEditableClassName={cn(
          'prose dark:text-gray-300 border border-primary rounded-md min-h-[256px]',
          contentEditableClassName
        )}
        onChange={handleChange}
      />
    )
  } catch (error) {
    console.error('Error rendering MDXEditor:', error)
    return <div>Error loading the editor. Please try again.</div>
  }
}
