import { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // API key is read from the .env file — see setup instructions below.
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  async function getResponse() {
    if (!prompt.trim()) {
      toast.error("Please describe your component first");
      return;
    }

    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: `You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}
Framework to use: ${framework.value}

Requirements:

* The code must be clean, well-structured, and easy to understand.
* Optimize for SEO where applicable.
* Focus on creating a modern, animated, and responsive UI design.
* Include high-quality hover effects, shadows, animations, colors, and typography.
* Return ONLY the code, formatted properly in **Markdown fenced code blocks**.
* Do NOT include explanations, text, comments, or anything else besides the code.
`,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (err) {
      console.error(err);
      if (err?.error?.code === 429) {
        toast.error("Daily quota exceeded. Try again later or switch models.");
      } else if (err?.error?.code === 503) {
        toast.error("Model is busy right now. Please try again in a moment.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  const downloadFile = () => {
    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />

      {/* items-stretch ensures both columns match height; h-[80vh] on each panel keeps them equal even when content differs */}
      <div className="flex flex-col lg:flex-row items-stretch px-4 md:px-10 lg:px-[100px] justify-between gap-[30px] py-6">
        <div className="left w-full lg:w-[50%] h-[80vh] py-[30px] rounded-xl bg-[#141319] mt-5 p-[20px] flex flex-col">
          <h3 className="text-[25px] font-semibold sp-text">
            AI component generator
          </h3>
          <p className="text-[gray] mt-2 text-[16px]">
            Describe your component and let AI code it for you.
          </p>
          <p className="text-[15px] font-[700] mt-4">Framework</p>
          <Select
            className="mt-2"
            options={options}
            value={framework}
            onChange={(selectedOption) => setFramework(selectedOption)}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "#09090B",
                borderColor: state.isFocused ? "#6b21a8" : "#1f2937",
                boxShadow: "none",
                color: "#fff",
                "&:hover": {
                  borderColor: "#6b21a8",
                },
              }),

              menu: (base) => ({
                ...base,
                backgroundColor: "#141319",
              }),

              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#6b21a8"
                  : state.isFocused
                    ? "#27212f"
                    : "#141319",
                color: "#fff",
                cursor: "pointer",
              }),

              singleValue: (base) => ({
                ...base,
                color: "#fff",
              }),

              placeholder: (base) => ({
                ...base,
                color: "#9ca3af",
              }),

              input: (base) => ({
                ...base,
                color: "#fff",
              }),

              dropdownIndicator: (base) => ({
                ...base,
                color: "#9ca3af",
                "&:hover": {
                  color: "#fff",
                },
              }),

              indicatorSeparator: (base) => ({
                ...base,
                backgroundColor: "#374151",
              }),
            }}
          />
          <p className="text-[15px] font-[700] mt-5">Describe your component</p>

          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="w-full flex-1 min-h-[150px] rounded-xl bg-[#09090B] mt-3 p-[10px] outline-none focus:ring-1 focus:ring-purple-600 transition-all resize-none"
            placeholder="Describe your component in detail and let AI code it for you"
          ></textarea>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
            <p className="text-gray text-sm">
              Click on generate button to generate your code
            </p>

            <button
              onClick={getResponse}
              disabled={loading}
              className="generate flex items-center justify-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 px-[20px] gap-[10px] transition-all hover:opacity-[.8] disabled:opacity-60 disabled:cursor-not-allowed min-w-[140px]"
            >
              {loading ? (
                <ClipLoader color="white" size={18} />
              ) : (
                <i>
                  <BsStars />
                </i>
              )}
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        <div className="right relative mt-5 w-full lg:w-[50%] h-[80vh] bg-[#141319] rounded-xl overflow-hidden flex flex-col">
          {outputScreen === false ? (
            <div className="skeleton w-full h-full flex flex-col items-center justify-center">
              <div className="circle p-[20px] w-[70px] flex items-center justify-center text-[30px] h-[70px] rounded-[50%] bg-gradient-to-r from-purple-400 to-purple-600">
                <HiOutlineCode />
              </div>
              <p className="text-[16px] text-[gray] mt-3 text-center px-4">
                Your component & code will appear here
              </p>
            </div>
          ) : (
            <>
              <div className="top bg-[#17171C] w-full h-[60px] flex items-center gap-[15px] px-[20px] shrink-0">
                <button
                  onClick={() => setTab(1)}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${tab === 1 ? "bg-[#333]" : ""}`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${tab === 2 ? "bg-[#333]" : ""}`}
                >
                  Preview
                </button>
              </div>
              <div className="top-2 bg-[#17171C] w-full h-[60px] flex items-center justify-between gap-[15px] px-[20px] shrink-0">
                <div className="left">
                  <p className="font-bold">Code Editor</p>
                </div>
                <div className="icons flex items-center gap-[10px]">
                  {tab === 1 ? (
                    <>
                      <button
                        className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]"
                        onClick={copyCode}
                        title="Copy code"
                      >
                        <IoCopy />
                      </button>
                      <button
                        className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]"
                        onClick={downloadFile}
                        title="Download file"
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]"
                        onClick={() => setIsNewTabOpen(true)}
                        title="Open in full screen"
                      >
                        <ImNewTab />
                      </button>
                      <button
                        className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]"
                        onClick={() => setCode((c) => c)}
                        title="Refresh preview"
                      >
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="editor flex-1 overflow-hidden">
                {tab === 1 ? (
                  <Editor
                    value={code}
                    height="100%"
                    theme="vs-dark"
                    language="html"
                  />
                ) : (
                  <iframe
                    srcDoc={code}
                    className="preview w-full h-full bg-white text-black"
                    title="Live preview"
                  ></iframe>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isNewTabOpen && (
        <div className="container fixed left-0 top-0 right-0 bottom-0 bg-white w-screen h-screen overflow-auto z-50">
          <div className="top text-black w-full h-[60px] flex items-center justify-between px-[20px] border-b border-gray-200">
            <p className="font-bold">Preview</p>
            <button
              className="close w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-300 flex items-center justify-center text-black transition-all hover:bg-gray-100"
              onClick={() => setIsNewTabOpen(false)}
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe
            srcDoc={code}
            className="w-full h-[calc(100%-60px)]"
            title="Full screen preview"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Home;