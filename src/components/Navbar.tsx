import toast from "react-hot-toast";
import { Session } from "../types/Session";
import { User } from "../types/User";

export const Navbar = (props: {
  session: Session | undefined;
  user: User | undefined;
  toggleSettings: () => void;
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied link to clipboard!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const onSettingsClicked = () => {
    if (props.session && props.user) {
      props.toggleSettings();
    }
  };

  return (
    <>
      <nav className="flex items-center flex-wrap bg-purple-400 ">
        <div className=" justify-between z-20 relative w-full flex p-3">
          <button
            className="hover:bg-purple-500 rounded text-white hover:text-white outline-none py-2 px-3"
            onClick={copyToClipboard}
          >
            Share
          </button>

          <button
            className="hover:bg-purple-500 rounded text-white hover:text-white outline-none py-2 px-3"
            onClick={onSettingsClicked}
          >
            Settings
          </button>
        </div>
        <div className="justify-center z-10 absolute w-full flex">
          <span className="text-xl text-white font-bold uppercase">Kude</span>
        </div>
      </nav>
    </>
  );
};
