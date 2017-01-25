import "./loading/page";
import { bootstrapAsync } from "./app";
bootstrapAsync(location.pathname.replace(/^\/|\.html$/g, ""));
