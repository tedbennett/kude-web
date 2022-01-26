import { Song } from "../types/Song";

export const SongCell = (props: { song: Song }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-dark_bg rounded-lg">
      <img
        className="rounded-lg"
        alt="Album Cover"
        src={props.song.imageUrl}
        width={100}
        height={100}
      />
      <div className="grid grid-cols-1 content-center ml-3">
        <div className="text-lg text-left font-semibold dark:text-white">
          {props.song.name}
        </div>
        <div className="text-sm text-left text-gray-500 dark:text-white">
          {props.song.artist}
        </div>
      </div>
    </div>
  );
};
