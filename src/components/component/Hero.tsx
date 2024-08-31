"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

export function Hero() {
  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // generating a Blob URL from the selected file
      const fileURL = URL.createObjectURL(selectedFile);

      // getting slug from the file Blob URL
      const fileSlug = fileURL.split("/").pop();

      // Redirecting to the view page with the file slug
      router.push("/view/" + fileSlug);
    }
  };
  return (
    <div>
      <section className="w-full py-14 md:py-16 lg:py-24">
        <div className="container grid items-center justify-center  gap-20 md:gap-24 px-4 md:px-6">
          {/* main text */}
          <div className="grid gap-4 text-center">
            <h1 className="text-5xl font-extrabold tracking-wide sm:text-6xl md:text-7xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500">
                Smart
              </span>{" "}
              PDF Viewer
            </h1>
            <p className="text-center text-muted-foreground md:text-lg">
              Effortlessly read and translate words with our powerful app.
            </p>
            <p className="text-center text-muted-foreground md:text-lg">
              Select words and Press{" "}
              <span className="font-extrabold md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 ">
                CTRL + ENTER
              </span>{" "}
              to get translation.
            </p>
          </div>
          {/* main text end */}
          {/* upload section */}
          <div className="w-full bg-blue-50 shadow-xl shadow-slate-200 md:px-64 py-12 md:py-16 rounded-xl border-2 border-dashed border-muted  text-center transition-colors hover:border-blue-500">
            <div className="px-10">
              <div className="flex flex-col items-center justify-center gap-4">
                <UploadIcon className="h-12 w-12 text-muted-foreground" />
                <h2 className="text-2xl font-bold text-slate-700">
                  Upload Or Drop PDF Here
                </h2>
                <div className="grid w-full max-w-sm items-center py-2 gap-1.5">
                  <Input
                    onChange={handleFileChange}
                    id="picture"
                    type="file"
                    className="bg-blue-500 shadow-sm hover:bg-blue-600 text-white file:text-white cursor-pointer h-auto px-4 py-5 text-sm placeholder:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* upload section end */}
        </div>
      </section>
    </div>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
