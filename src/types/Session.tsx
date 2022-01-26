import { Song } from "./Song";

export type Session = {
  name: string;
  members: {
    name: string;
    id: string;
  }[];
  queue: Song[];
  id: string;
  key: string;
  delay: number;
  currentlyPlaying: number;
  host: string;
};
