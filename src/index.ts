import * as dotenv from "dotenv";
dotenv.config();

import config from "./config";

import server from "./server";

server.listen(config.port, () => {
  console.log(`server is running on http://localhost:${config.port}`);
});
