"use client";

import { EditorContent, useEditor, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

const disableDeletion = () => {
  return Extension.create({
    name: 'disableDeletion',
    addKeyboardShortcuts() {
      return {
        Backspace: () => {
          return true;
        },
        Delete: () => {
          return true;
        }
      };
    }
  });
};

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  flowMode: boolean;
  setFlowMode: (value: boolean) => void;
}
export default function Editor({
  content,
  onChange,
  flowMode,
  setFlowMode
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      ...(flowMode ? [disableDeletion()] : []),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  },
    [flowMode]
  );

  return (
    <div className={flowMode ? 'font-comic-sans' : 'font-sans'}>
      <MenuBar editor={editor} flowMode={flowMode} setFlowMode={setFlowMode} />
      <EditorContent editor={editor} />
    </div>
  );
}
