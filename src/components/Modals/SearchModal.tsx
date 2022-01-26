import { useState, useRef } from "react";
import { SongCell } from "../SongCell";
import { debounce } from "lodash";
import { searchSpotify } from "../../managers/Firebase";
import { Song } from "../../types/Song";

export const SearchModal = (props: {
  dismiss: () => void;
  addSong: (song: Song) => void;
}) => {
  const { dismiss, addSong } = props;
  const [songs, setSongs] = useState<Song[]>([]);
  const [text, setText] = useState("");

  const search = async (searchText: string) => {
    let query = searchText.replace(" ", "+");
    if (query.length === 0 || query.trim().length === 0) return;
    let result = await searchSpotify(query);
    setSongs(result);
  };
  const onSongClicked = (song: Song) => {
    addSong(song);
  };

  const debounced = useRef(debounce((q) => search(q), 500)).current;

  const onTextChange = (e: any) => {
    setText(e.target.value);
    debounced(e.target.value);
  };

  const TitleBar = () => {
    return (
      <div className="flex flex-row align-bottom justify-between content-evenly">
        <h3
          className="flex text-lg leading-6 mt-3 font-medium text-gray-900 dark:text-white"
          id="modal-title"
        >
          Add to Queue
        </h3>
        {/* <div className="flex-grow"></div> */}
        <button
          type="button"
          className="flex-none justify-center rounded-md shadow-sm px-3 bg-purple-400 text-base font-medium text-white hover:bg-purple-500"
          onClick={dismiss}
        >
          X
        </button>
      </div>
    );
  };

  const Background = () => {
    return (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"
        aria-hidden="true"
        onClick={dismiss}
      />
    );
  };

  return (
    <div
      className="fixed z-10 inset-0"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className=" items-end justify-center h-full pt-4 px-4 pb-20 text-center">
        <Background />
        <div className="inline-block align-bottom h-full bg-white dark:bg-black rounded-lg text-left shadow-xl transform transition-all my-8 align-middle max-w-lg w-full  mt-14 overflow-y-auto">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
            <TitleBar />
            <input
              type="text"
              placeholder="Search Spotify"
              className="mt-2 px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white dark:bg-black rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full dark:text-white"
              value={text}
              onChange={onTextChange}
            />
            <div className="overflow-y-auto">
              <ul style={{ overflowY: "scroll" }}>
                {songs.map((song) => (
                  <li key={song.id}>
                    <button
                      className="w-full my-3"
                      onClick={() => onSongClicked(song)}
                    >
                      <SongCell song={song} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
