import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUserName, leaveSession } from "../../managers/Firebase";
import { Session } from "../../types/Session";
import { User } from "../../types/User";
import { ReactComponent as CopyImage } from "../../images/Copy.svg";
import toast from "react-hot-toast";

export const SettingsModal = (props: {
  session: Session;
  user: User;
  dismiss: () => void;
}) => {
  const [name, setName] = useState(props.user.name);
  const navigate = useNavigate();

  const onSaveClicked = async () => {
    await changeUserName(name, props.user);
    props.dismiss();
  };

  const onLeaveClicked = async () => {
    await leaveSession(props.user);
    navigate("/");
  };

  const copyKey = () => {
    navigator.clipboard.writeText(props.session.key);
    toast.success("Copied key to clipboard!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const dismiss = () => {
    props.dismiss();
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
          onClick={dismiss}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white dark:bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full  mt-14">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Session Settings
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {props.session.name}
              </p>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-900">
              <dl>
                <div className="bg-gray-50 dark:bg-dark_settings_bg px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 align-end">
                  <dt className="text-sm font-medium text-gray-500 self-center">
                    Your Name
                  </dt>

                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full sm:col-span-2 px-3 py-3 placeholder-gray-400 text-gray-600  dark:text-white relative bg-white dark:bg-dark_bg rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="bg-white dark:bg-black px-4 py-5 grid grid-cols-2 sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                  <dt className="text-sm font-medium text-gray-500 col-span-2 sm:col-span-1 self-center">
                    Session Key
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 self-center">
                    {props.session.key}
                  </dd>
                  {/* Font Awesome icon https://fontawesome.com/license */}
                  <button
                    className="justify-self-end p-2 rounded-md bg-purple-500"
                    onClick={copyKey}
                  >
                    <CopyImage className="" style={{ width: "18px" }} />
                  </button>
                </div>
                <div className="bg-gray-50  dark:bg-dark_settings_bg px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500  ">
                    Queue Delay
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {props.session.delay === 0
                      ? "None"
                      : `${props.session.delay}s`}
                  </dd>
                </div>
                <div className="bg-white dark:bg-black px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 self-center">
                    Members
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul>
                      {props.session.members.map((member) => {
                        return (
                          <li
                            key={member.id}
                            className="text-sm leading-6 font-small text-gray-900 dark:text-white mt-3"
                          >
                            {member.name}
                          </li>
                        );
                      })}
                    </ul>
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-dark_settings_bg px-4 py-3 px-6 flex justify-between">
                  <button
                    type="button"
                    className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onLeaveClicked}
                  >
                    Leave
                  </button>
                  <button
                    type="button"
                    className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-400 text-base font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mr-3 sm:w-auto sm:text-sm"
                    onClick={onSaveClicked}
                  >
                    Save
                  </button>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Attachments
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul
                      role="list"
                      className="border border-gray-200 rounded-md divide-y divide-gray-200"
                    >
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span className="ml-2 flex-1 w-0 truncate">
                            resume_back_end_developer.pdf
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span className="ml-2 flex-1 w-0 truncate">
                            coverletter_back_end_developer.pdf
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div> */}
        {/* <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full  mt-14">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left  w-full">
                <h2
                  className="text-xl leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Session Settings
                </h2>
                <h3
                  className="text-md leading-6 font-medium text-gray-900 mt-5"
                  id="modal-title"
                >
                  Edit Display Name
                </h3>
                <div className="mt-2 ">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="text-right px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <h3 className="text-md leading-6 font-medium text-gray-900 mt-5">
                    Session Key
                  </h3>
                  <div className="flex justify-end">
                    <h3 className="text-md leading-6 font-medium text-gray-900 mt-5">
                      {props.session.key}
                    </h3>
                    <button
              type="button"
              className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onLeaveClicked}
            >
              Leave
            </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-md leading-6 font-medium text-gray-900 mt-5">
                    Queue Delay
                  </h3>
                  <h3 className="text-md leading-6 font-medium text-gray-900 mt-5">
                    {props.session.delay}s
                  </h3>
                </div>
                <h3 className="text-md leading-6 font-medium text-gray-900 mt-5">
                  Session Members
                </h3>
                <div className="flex justify-end">
                  <ul>
                    {props.session.members.map((member) => {
                      return (
                        <li
                          key={member.id}
                          className="text-sm leading-6 font-small text-gray-900 mt-3"
                        >
                          {member.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 px-6 flex justify-between">
            <button
              type="button"
              className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onLeaveClicked}
            >
              Leave
            </button>
            <button
              type="button"
              className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-400 text-base font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mr-3 sm:w-auto sm:text-sm"
              onClick={onSaveClicked}
            >
              Save
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
