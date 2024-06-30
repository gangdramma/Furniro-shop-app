import React from "react";
import { Types } from "./types";

const AuthContext = React.createContext<Types.IContext>({} as Types.IContext);

export default AuthContext;
