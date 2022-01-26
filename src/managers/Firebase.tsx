import { Unsubscribe } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { v4 as uuidv4 } from "uuid";

import { db } from "../firebase-config";
import { Session } from "../types/Session";
import { Song } from "../types/Song";
import { User } from "../types/User";

export const fetchSession = async (
  sessionId: string
): Promise<Session | undefined> => {
  const docRef = doc(db, "sessions", sessionId);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    let data = snapshot.data() as Session;
    return data;
  } else {
    return undefined;
  }
};

export const fetchSessionByKey = async (
  key: string
): Promise<Session | undefined> => {
  const req = query(collection(db, "sessions"), where("key", "==", key));
  const snapshot = await getDocs(req);
  if (snapshot.docs.length === 0) return undefined;
  return snapshot.docs[0].data() as Session;
};

export const createUser = async (
  name: string,
  sessionId: string
): Promise<User> => {
  const id = uuidv4().toUpperCase();
  const user = {
    name,
    id,
    session: sessionId,
  };
  await setDoc(doc(db, "users", id), user);
  return user;
};

export const changeUserName = async (name: string, user: User) => {
  await updateDoc(doc(db, "users", user.id), { name });

  const session = await fetchSession(user.session);

  if (session) {
    const members = session.members.map((m) =>
      m.id === user.id ? { name, id: user.id } : m
    );

    await updateDoc(doc(db, "sessions", session.id), { members });
  }
};

export const joinSession = async (id: string, user: User): Promise<boolean> => {
  const session = await fetchSession(id);

  if (!session) return false;

  // Makes sure no duplicates
  const members = [...session.members, { name: user.name, id: user.id }].filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  await updateDoc(doc(db, "sessions", id), { members });
  if (session.id !== user.session) {
    await updateDoc(doc(db, "users", user.id), { session: session.id });
  }
  return true;
};

export const leaveSession = async (user: User) => {
  const session = await fetchSession(user.session);

  if (!session) return;

  const members = session.members.filter((m) => m.id !== user.id);

  await updateDoc(doc(db, "sessions", user.session), { members });
  await updateDoc(doc(db, "users", user.id), { session: null });

  return true;
};

export const listenToSession = (
  id: string,
  onChange: (session: Session) => void
): Unsubscribe => {
  const unsubscribe = onSnapshot(doc(db, "sessions", id), (doc) => {
    let session = doc.data() as Session;
    onChange(session);
  });
  return unsubscribe;
};

export const searchSpotify = async (query: string): Promise<Song[]> => {
  const functions = getFunctions();
  const searchSpotify = httpsCallable<object, Song[]>(
    functions,
    "searchSpotify"
  );
  const result = await searchSpotify({ query });
  return result.data;
};

export const addSongToQueue = async (song: Song, sessionId: string) => {
  const functions = getFunctions();
  const addSongToQueue = httpsCallable<object, boolean>(
    functions,
    "addSongToQueue"
  );
  const result = await addSongToQueue({ song, sessionId });
  if (!result.data) throw Error;
  return;
};

export const checkCurrentlyPlaying = async (sessionId: string) => {
  const functions = getFunctions();
  const checkCurrentlyPlaying = httpsCallable<object, boolean>(
    functions,
    "checkCurrentlyPlaying"
  );
  await checkCurrentlyPlaying({ sessionId });
};
