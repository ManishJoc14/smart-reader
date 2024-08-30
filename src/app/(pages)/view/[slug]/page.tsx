"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import Error from "next/error";

// react-pdf-viewer styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

/**
 * Renders a PDF viewer component.
 * 
 * @returns The PDFViewer component.
 */
export default function PDFViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pathname = usePathname();

  // using slug from path to get the blobUrl
  const slug = pathname.split("/").pop();
  const blobUrl = slug ? `blob:${window.location.origin}/${slug}` : "";

  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {

      // handle translation shortcut key (Ctrl + Enter)
      if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();

        // get selected text and translate it
        const selection = window.getSelection()?.toString();
        if (selection) {
          try {
            const response = await axios.post("/api/translate", {
              text: selection,
            });
            const translatedText = response.data.translatedText;
            alert(`Translated text: ${translatedText}`);
          } catch (error: any) {
            console.error(
              "Error translating text:",
              error.response?.data || error.message
            );
            alert("Failed to translate text.");
          }
        } else {
          alert("No text selected.");
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className="w-full overflow-x-clip h-screen">
        {blobUrl ? (
          <Viewer fileUrl={blobUrl} plugins={[defaultLayoutPluginInstance]} />
        ) : (
          <Error statusCode={404} />
        )}
      </div>
    </Worker>
  );
}
