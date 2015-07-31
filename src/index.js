// Hack for unit testing the handler function
// TODO figure out hot to rewire dependencies when there is no default export
import exportedHandler from "./handler";

export var handler = exportedHandler;
