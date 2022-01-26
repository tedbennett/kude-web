export const AddSong = (props: { handler: () => void }) => {
  return (
    <button className="w-full" onClick={props.handler}>
      <div className="flex bg-gray-100 dark:bg-dark_bg rounded-lg h-24 items-center">
        <div className="flex justify-center text-5xl font-semibold w-28 dark:text-white">
          +
        </div>
        <div className="text-lg font-semibold dark:text-white">
          Add to Queue
        </div>
      </div>
    </button>
  );
};
