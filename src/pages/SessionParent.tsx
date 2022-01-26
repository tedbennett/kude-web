import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JoinSessionModal } from "../components/Modals/JoinSessionModal";
import {
  createUser,
  fetchSession,
  joinSession,
  leaveSession,
} from "../managers/Firebase";
import { Session } from "../types/Session";
import { User } from "../types/User";
import { SessionView } from "./Session";
import CSS from "csstype";
import { Navbar } from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { SettingsModal } from "../components/Modals/SettingsModal";

export const SessionParent = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [userCreated, setUserCreated] = useState(false);
  const [userInSession, setUserInSession] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const setup = async () => {
      if (!sessionId) {
        navigate("/");
        return;
      }

      const session = await fetchSession(sessionId);
      if (!session) {
        // Session isn't valid
        navigate("/");
        return;
      }

      setSession(session);
      const data = localStorage.getItem("user");
      if (!data) {
        // Show dialog with name
        setUserCreated(false);
        setIsLoading(false);
        return;
      }

      const user = JSON.parse(data) as User;
      if (!user) return;
      setUser(user);
      if (user.session !== session.id) {
        if (user.session !== undefined) {
          leaveSession(user);
        }
        // Show dialog
        setUserCreated(true);
        setIsLoading(false);
        return;
      }

      if (!session.members.find((m) => m.id === user.id)) {
        setUserCreated(true);
        setIsLoading(false);
        return;
      }
      // All good, user exists and is in the session
      setUserInSession(true);
      setIsLoading(false);
    };
    setup();
  }, [navigate, sessionId]);

  const createUserAndJoinSession = async (name: string) => {
    if (!session) return;
    const user = await createUser(name, session.id);

    localStorage.setItem("user", JSON.stringify(user));

    await joinSession(session.id, user);
    setUser(user);
    setUserInSession(true);
  };

  const addUserToSession = async () => {
    if (!session || !user) return;
    await joinSession(session.id, user);
    let newUser = { ...user, session: session.id };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUserInSession(true);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const Body = () => {
    if (isLoading) {
      return <h3>Loading...</h3>;
    }
    if (user && session && userInSession) {
      return <SessionView session={session} user={user} />;
    }
    return (
      <JoinSessionModal
        sessionName={session?.name ?? "Session"}
        showNameField={!userCreated}
        joinSession={addUserToSession}
        createUserAndJoinSession={createUserAndJoinSession}
      />
    );
  };

  const styles: CSS.Properties = {
    position: "sticky",
    top: 0,
  };

  return (
    <>
      <Toaster />
      <div style={styles}>
        <Navbar session={session} user={user} toggleSettings={toggleSettings} />
      </div>
      <Body />
      {session && user && showSettings ? (
        <SettingsModal session={session} user={user} dismiss={toggleSettings} />
      ) : null}
    </>
  );
};
