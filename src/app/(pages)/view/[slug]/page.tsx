"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "next/error";

// react-pdf-viewer styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Bounce, toast } from "react-toastify";
import warnToast, { errorToast, infoToast, successToast } from "@/lib/toast";
import { ModalWithWordMeaning } from "@/components/component/ModalWithWordMeanings";

// Utility function for translating text
const translateText = async (
  text: string,
  setTextPairs: React.Dispatch<
    React.SetStateAction<{ original: string; translated: string }[]>
  >
) => {
  try {
    const response = await axios.post("/api/translate", { text });
    const translatedText = response.data.translatedText;

    // Update state
    setTextPairs((prev) => {
      const newPairs = [...prev, { original: text, translated: translatedText }];

      // Save to localStorage
      localStorage.setItem("textPairs", JSON.stringify(newPairs));
      return newPairs;
    });

    // show translated text in toast
    successToast(`${text} : ${translatedText}`);
  } catch (error: any) {
    console.error("Error translating text:", error.response?.data || error.message);
    // show error toast
    errorToast("Failed to translate text.");
  }
};

// Utility function for handling key presses
const handleKeyPress = (
  event: KeyboardEvent,
  setTextPairs: React.Dispatch<
    React.SetStateAction<{ original: string; translated: string }[]>
  >
) => {
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    const selection = window.getSelection()?.toString();
    if (selection) {
      translateText(selection, setTextPairs);
    } else {
      warnToast("No text selected.");
    }
  }
};

// PDFViewer component
export default function PDFViewer() {
  const [textPairs, setTextPairs] = useState<
    { original: string; translated: string }[]
  >([]);
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const blobUrl = slug ? `blob:${window.location.origin}/${slug}` : "";

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    // Load stored text pairs from localStorage
    const storedPairs = localStorage.getItem("textPairs");
    try {
      const parsedPairs = storedPairs ? JSON.parse(storedPairs) : [];
      setTextPairs(parsedPairs);
    } catch (error) {
      console.error("Failed to parse textPairs from localStorage:", error);
      setTextPairs([]); // Fallback to an empty array if parsing fails
    }

    // Add event listener for key press
    const listener = (event: KeyboardEvent) =>
      handleKeyPress(event, setTextPairs);
    document.addEventListener("keydown", listener);

    // Clean up event listener
    return () => document.removeEventListener("keydown", listener);
  }, []);

  useEffect(()=>{
    infoToast("Select words and press CTRL + Enter to translate"); 
  })

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className="w-full overflow-x-clip min-h-screen relative">
        {blobUrl ? (
          <>
            <ModalWithWordMeaning />
            <Viewer fileUrl={blobUrl} plugins={[defaultLayoutPluginInstance]} />
          </>
        ) : (
          <Error statusCode={404} />
        )}
      </div>
    </Worker>
  );
}
