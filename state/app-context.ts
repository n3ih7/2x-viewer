import { createContext, Dispatch } from "react";
import { AppAction, AppState } from "./app-reducer";

type TAppContext = {
  state?: AppState;
  dispatch?: Dispatch<AppAction>;
}
const AppContext = createContext<TAppContext>({})
export default AppContext