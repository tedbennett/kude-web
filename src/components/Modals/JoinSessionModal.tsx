import { useState } from "react";

export const JoinSessionModal = (props: {
  sessionName: string;
  showNameField: boolean;
  joinSession: () => void;
  createUserAndJoinSession: (name: string) => void;
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const onJoinClicked = () => {
    if (props.showNameField) {
      if (name.length === 0) {
        setError(true);
      } else {
        props.createUserAndJoinSession(name);
      }
    } else {
      props.joinSession();
    }
  };

  const onNameChanged = (e: any) => {
    if (e.target.value.length > 0 && error) {
      setError(false);
    }
    setName(e.target.value);
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className=" items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        {/* Background */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white dark:bg-dark_bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm  sm:w-full  mt-14">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left  w-full">
                <h3
                  className="text-lg text-center font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  {props.sessionName}
                </h3>
                {props.showNameField ? (
                  <div className="mt-2 ">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full"
                      value={name}
                      onChange={onNameChanged}
                    />
                  </div>
                ) : null}
                <div className="flex justify-center">
                  {error ? (
                    <h3 className="text-red-500">Name cannot be empty</h3>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-dark_bg px-4 py-3 px-6 flex justify-center">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-400 text-base font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onJoinClicked}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
