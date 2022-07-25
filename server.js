const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const http = require("http").createServer(app);

app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
    credentials: true,
    "Access-Control-Allow-Headers": true,
  };
  app.use(cors(corsOptions));
}

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");
const port = process.env.PORT || 3030;
logger.debug('process.env.NODE_ENV', process.env.NODE_ENV)
http.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
