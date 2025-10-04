"use client";
import Editor from "@/components/editor";
import { useState } from "react";

export default function Home() {
  const [post, setPost] = useState("");
  const [flowMode, setFlowMode] = useState(true);

  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className='scroll-m-20 text-4xl font-semibold tracking-tight py-4'>
        No Backspace
      </h1>
      <Editor content={post} onChange={onChange} flowMode={flowMode} setFlowMode={setFlowMode} />
    </div>
  );
}
