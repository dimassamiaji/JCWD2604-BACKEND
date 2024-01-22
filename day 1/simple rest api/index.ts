/** @format */
import http, { IncomingMessage, ServerResponse } from "http";
const PORT = 2002;

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    console.log(method, url);

    if (method == "GET" && url == "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write("hi there, this is vanilla node.js");
      res.end();
    } else if (method == "GET" && url == "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write("welcome to GET user ");
      res.end();
    } else if (method == "POST" && url == "/api") {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write("ini adalah POST user");
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      //   res.write("page not found");
      res.end("page not found");
    }
  }
);

server.listen(PORT, () => {
  console.log("application runs on port " + PORT);
});
