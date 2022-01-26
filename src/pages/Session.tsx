import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Queue } from "../components/Queue";
import { Song } from "../types/Song";
import { Session } from "../types/Session";
import { SearchModal } from "../components/Modals/SearchModal";
import {
  addSongToQueue,
  checkCurrentlyPlaying,
  listenToSession,
} from "../managers/Firebase";
import { User } from "../types/User";
import toast from "react-hot-toast";

export const SessionView = (props: { session: Session; user: User }) => {
  const navigate = useNavigate();
  const sessionId = props.session.id;
  const [session, setSession] = useState<Session>(props.session);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [queueDisabled, setQueueDisabled] = useState(false);

  useEffect(() => {
    listenToSession(sessionId, (s) => {
      if (!s) {
        navigate("/");
        return;
      }
      setSession(s);
    });
  }, [sessionId, navigate]);

  const queueSong = async (song: Song) => {
    const promise = await addSongToQueue(song, sessionId!);
    await checkCurrentlyPlaying(sessionId);
    localStorage.setItem("lastQueue", `${Date.now()}`);
    setQueueDisabled(true);
    return promise;
  };

  const onSongAdded = async (song: Song) => {
    setShowQueueModal(false);
    toast.promise(
      queueSong(song),
      {
        loading: "Adding to queue...",
        success: <b>Added to queue!</b>,
        error: <b>Failed to find active Spotify session.</b>,
      },
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  const AddToQueueModal = () => {
    return showQueueModal ? (
      <SearchModal
        dismiss={() => setShowQueueModal(false)}
        addSong={onSongAdded}
      />
    ) : null;
  };
  return (
    <>
      <div className="flex justify-center ">
        <h1 className="text-3xl m-5 font-semibold dark:text-white basis-99">
          {session.name}
        </h1>
      </div>
      <div className="flex justify-center">
        <Queue
          session={session}
          queueDisabled={queueDisabled}
          onAddSongClicked={() => setShowQueueModal(true)}
          onQueueDelayFinished={() => setQueueDisabled(false)}
        />
      </div>
      <AddToQueueModal />
    </>
  );
};
