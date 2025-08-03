import { createLogger, format, transports } from "winston";
import path from "path";

export type LogLevel = "info" | "error";

const getDateString = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const logDir = path.join(process.cwd(), "logs");
const dateStr = getDateString();

const loggerCore = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDir, `info-${dateStr}.log`), level: "info" }),
    new transports.File({ filename: path.join(logDir, `error-${dateStr}.log`), level: "error" }),
  ],
});

const logger = {
  log: (message: string) => {
    loggerCore.info(message);
  },
  error: (message: string) => {
    loggerCore.error(message);
  },
};

export default logger; 