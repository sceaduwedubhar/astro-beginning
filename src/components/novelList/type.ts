export const GENRE: Record<number, string> = {
    101: "Another World (Romance)",
    102: "Real World (Romance)",
    201: "High Fantasy (Fantasy)",
    202: "Low fantasy (Fantasy)",
    301: "Pure Literature (Literature)",
    302: "Drama (Literature)",
    303: "Historical (Literature)",
    304: "Detective (Literature)",
    305: "Horror (Literature)",
    306: "Action (Literature)",
    307: "Comedy (Literature)",
    401: "VR Game (SF)",
    402: "Space (SF)",
    403: "Science (SF)",
    404: "Panic (SF)",
    9901: "Fairy Tale (Other)",
    9902: "poem (Other)",
    9903: "Essay (Other)",
    9904: "Replay (Other)",
    9999: "Other (Other)",
    9801: "No Genre (No Genre)",
};

export const STATE: Record<number, string> = {
    0: "Completed",
    1: "Serial",
};

export interface NovelData {
    title: string;
    ncode: string;
    userid: number;
    writer: string;
    story: string;
    genre: number;
    general_lastup: string;
    end: number;
    general_all_no: number;
    allcount: number;
}
