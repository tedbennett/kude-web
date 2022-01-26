import { Session } from "../types/Session";
import { AddSong } from "./AddSong";
import { AddSongTimer } from "./AddSongTimer";
import { SongCell } from "./SongCell";

export const Queue = (props: {
  session: Session;
  queueDisabled: boolean;
  onAddSongClicked: () => void;
  onQueueDelayFinished: () => void;
}) => {
  const { session, queueDisabled, onAddSongClicked, onQueueDelayFinished } = props;

  return (
    <ul className="w-full sm:w-2/3 lg:w-1/2 mx-3">
      <li key="AddToQueue" className="w-full my-3">
        {queueDisabled ? (
          <AddSongTimer
            session={props.session}
            completion={() => {
              onQueueDelayFinished();
            }}
          />
        ) : (
          <AddSong handler={onAddSongClicked} />
        )}
      </li>
      {session.queue.slice(session.currentlyPlaying).map((song, index) => (
        <li key={`${song.id}${index}`} className="w-full my-3">
          <SongCell song={song} />
        </li>
      ))}
    </ul>
  );
};
