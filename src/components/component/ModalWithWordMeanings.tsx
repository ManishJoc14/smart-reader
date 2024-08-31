import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export function ModalWithWordMeaning() {
  // word meanings
  const [textPairs, setTextPairs] = useState<
    { original: string; translated: string }[]
  >([]);

  // Load stored text pairs from localStorage
  useEffect(() => {
    const storedTextPairs = localStorage.getItem("textPairs");
    if (storedTextPairs) {
      setTextPairs(JSON.parse(storedTextPairs));
    }
  }, []);

  const loadmore = () => {
    // Load stored text pairs from localStorage
    const storedTextPairs = localStorage.getItem("textPairs");
    if (storedTextPairs) {
      setTextPairs(JSON.parse(storedTextPairs));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={loadmore}
          variant="outline"
          className="fixed z-10 top-1 left-52 bg-transparent text-gray-600 p-1 rounded-md"
        >
          <TranslationIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] ">
        <DialogTitle className="text-center font-bold text-gray-900 text-2xl">
          Previous Translated Words
        </DialogTitle>
        <div className="grid gap-10 p-6">
          {textPairs.map(
            (item: { original: string; translated: string }, i: number) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto] items-center gap-4"
              >
                <div>
                  <p className="text-lg font-medium">{item.original}</p>
                  <p className="text-muted-foreground">{item.translated}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${item.original} \n${item.translated}`
                    );
                  }}
                >
                  <CopyIcon className="w-5 h-5" />
                </Button>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CopyIcon(props: any) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
function TranslationIcon(props: any) {
  return (
    <svg
      height="24px"
      width="24px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          style={{ fill: "#FFFFFF" }}
          d="M185.802,105.689h277.06c21.364,0,38.688,17.32,38.688,38.689v318.482 c0.001,21.366-17.318,38.69-38.687,38.69H280.479L185.802,105.689z"
        ></path>{" "}
        <polygon
          style={{ fill: "#0084FF" }}
          points="361.15,406.306 280.479,501.545 248.789,406.306 "
        ></polygon>{" "}
        <path
          style={{ fill: "#10BAFC" }}
          d="M361.15,406.306H49.137c-21.364,0-38.688-17.32-38.688-38.69V49.138 c0-21.365,17.32-38.689,38.688-38.689h182.387L361.15,406.306z"
        ></path>{" "}
        <path d="M462.863,95.24H270.286L241.455,7.197C240.049,2.904,236.042,0,231.524,0H49.137C22.043,0,0,22.043,0,49.138v318.478 c0,27.095,22.043,49.138,49.137,49.138h192.115l29.311,88.095c1.42,4.269,5.415,7.15,9.914,7.15h182.384 C489.957,512,512,489.957,512,462.862V144.38C512,117.285,489.957,95.24,462.863,95.24z M20.898,367.616V49.138 c0-15.571,12.668-28.24,28.239-28.24h174.814l122.783,374.96H49.137C33.566,395.857,20.898,383.188,20.898,367.616z M411.358,241.371c-5.469,11.908-15.308,30.468-31.079,51.099c-4.545-5.928-8.505-11.556-11.901-16.717 c-9.028-13.722-15.237-25.776-19.184-34.381L411.358,241.371L411.358,241.371z M326.41,241.371 c3.62,8.944,11.118,25.394,24.047,45.165c4.473,6.841,9.853,14.435,16.206,22.461c-5.947,6.704-12.52,13.493-19.759,20.226 l-28.768-87.852H326.41z M263.278,416.755h75.328l-54.084,63.85L263.278,416.755z M491.102,462.862 c0,15.571-12.668,28.24-28.239,28.24H303.018l65.929-77.834c1.657-1.849,2.673-4.284,2.673-6.961c0-1.378-0.266-2.695-0.751-3.9 l-16.85-51.458c9.785-8.559,18.525-17.252,26.302-25.839c17.544,19.367,40.485,39.927,69.799,57.876 c1.703,1.043,3.586,1.539,5.446,1.539c3.516,0,6.951-1.775,8.921-4.994c3.013-4.921,1.466-11.354-3.456-14.367 c-28.471-17.434-50.493-37.492-67.082-56.152c23.199-29.342,35.285-55.429,40.202-67.64h30.828c5.77,0,10.449-4.678,10.449-10.449 s-4.679-10.449-10.449-10.449h-74.907V202.71c0-5.771-4.679-10.449-10.449-10.449s-10.449,4.678-10.449,10.449v17.763h-57.882 l-34.165-104.335h185.734c15.571,0,28.239,12.669,28.239,28.24v318.483H491.102z"></path>{" "}
        <path d="M147.087,286.44c42.444,0,76.974-34.531,76.974-76.974c0-5.771-4.678-10.449-10.449-10.449h-59.202 c-5.771,0-10.449,4.678-10.449,10.449s4.678,10.449,10.449,10.449h47.777c-4.91,25.944-27.75,45.628-55.1,45.628 c-30.921,0-56.077-25.156-56.077-56.077s25.156-56.077,56.077-56.077c13.315,0,26.223,4.747,36.343,13.368 c4.391,3.742,10.988,3.215,14.73-1.178c3.742-4.394,3.214-10.988-1.179-14.73c-13.897-11.839-31.617-18.358-49.894-18.358 c-42.444,0-76.974,34.531-76.974,76.974C70.113,251.909,104.642,286.44,147.087,286.44z"></path>{" "}
        <path d="M201.622,351.434h-4.678c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h4.678 c5.77,0,10.449-4.678,10.449-10.449C212.071,356.112,207.392,351.434,201.622,351.434z"></path>{" "}
        <path d="M163.141,351.434H61.649c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h101.492 c5.77,0,10.449-4.678,10.449-10.449C173.59,356.112,168.911,351.434,163.141,351.434z"></path>{" "}
      </g>
    </svg>
  );
}
