import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/HomeNavbar";
import { fetchSessionByKey } from "../managers/Firebase";
import { Session } from "../types/Session";

export const Home = () => {
  const [text, setText] = useState("");
  const [noSession, setNoSession] = useState(false);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const navigate = useNavigate();

  const onInputChange = (e: any) => {
    const key = e.target.value.slice(0, 6).toUpperCase();
    setText(key);
    if (noSession) {
      setNoSession(false);
    }
    if (session) {
      setSession(undefined);
    }

    if (key.length === 6) {
      checkSession(key);
    }
  };

  const checkSession = async (key: string) => {
    const session = await fetchSessionByKey(key);

    if (!session) {
      setNoSession(true);
      return;
    }

    setSession(session);
  };

  const onJoinClicked = async () => {
    if (!session) return;
    navigate(`/session/${session.id}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center my-20">
        <div className="text-3xl font-semibold dark:text-white m-3">
          Welcome to Kude!
        </div>
        <div className="dark:text-gray-400 mt-2">
          Join a session to get started
        </div>
        <div className="dark:text-gray-400">
          Follow a session link or enter a session key below
        </div>

        <input
          type="text"
          placeholder="Enter Key"
          className="mt-5 px-3 py-3 placeholder-gray-400 text-gray-600 text-center relative bg-white dark:bg-black rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full sm:w-48 dark:text-white"
          value={text}
          onChange={onInputChange}
        />
        {session ? (
          <button
            type="button"
            className="w-full mt-5 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-400 text-base font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onJoinClicked}
          >Join</button>
        ) : null}
        {noSession ? <h3 className="text-red-500 mt-3">No Session Found</h3> : null}
      </div>
    </>
  );
};
