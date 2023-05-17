import "./loadEnvironments";
import createDebug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";
import app from "./server";

const debug = createDebug("items-api:root");

const mongoDbConnection = process.env.MONGODB_CONNECTION;

const port = process.env.PORT ?? 4000;

mongoose.set("debug", true);

mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  },
});

if (!mongoDbConnection) {
  debug(
    `${chalk.redBright(`an Error has ocurred`)} and cant connect to the server`
  );
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});

try {
  await mongoose.connect(mongoDbConnection);
} catch (error: unknown) {
  debug(
    `Error connecting to database ${chalk.redBright((error as Error).message)}`
  );
}
