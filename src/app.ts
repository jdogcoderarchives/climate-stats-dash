import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import correlator from "express-correlation-id";
import health from "express-ping";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

import errorLogger from "./logger";
/*
import { hasLockedAccess } from "./middleware/hasLockedAccess";
import { isAdmin } from "./middleware/isAdmin";
import { authToken } from "./middleware/middleware";
*/
import routes from "./routes/router"


const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(health.ping());
app.use(cors());
app.use(correlator());
app.use(limiter)

app.use("/", routes)

// catch all errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    const errorID = uuidv4();
    errorLogger(err, errorID, req);
    res.status(500).json({
      message:
        "Please contact a developer in our discord support server, and provide the information below.",
      error: err.message,
      errorID,
      requestID: req.correlationId(),
    });
  });

  export default app;