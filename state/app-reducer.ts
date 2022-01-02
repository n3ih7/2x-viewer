import produce from "immer"

type DUMMY_ACTION = {
  type: "DUMMY_ACTION";
}

type SET_ROOT = {
  type: "SET_DIRECTORY";
  payload: FileSystemDirectoryHandle;
}

type SET_CURRENT = {
  type: "SET_CURRENT";
  payload: number;
}

type SET_CONTENT = {
  type: "SET_CONTENT";
  payload: Array<FileSystemHandle>;
}

type SET_PREFERENCES = {
  type: "SET_PREFERENCES";
  payload: Record<string, boolean>;
}

export type AppAction = DUMMY_ACTION
  | SET_ROOT
  | SET_CURRENT
  | SET_CONTENT
  | SET_PREFERENCES

export type AppState = {
  current?: number;
  root?: FileSystemDirectoryHandle;
  content?: Array<FileSystemHandle>;
  preferences?: Record<string, boolean>;
}

const AppReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_DIRECTORY": return produce(state, draft => {
      draft.root = action.payload
    })
    case "SET_CURRENT": return produce(state, draft => {
      draft.current = action.payload
    })
    case "SET_CONTENT": return produce(state, draft => {
      draft.content = action.payload
    })
    case "SET_PREFERENCES": return produce(state, draft => {
      draft.preferences = {
        ...state.preferences,
        ...action.payload
      }
    })
    default: return state
  }
}
export default AppReducer