import { connect } from "mongoose";
import { env } from "../env/index";

export const run = async (): Promise<void> => {
  try {
    await connect(env.DATABASE_URI);
  } catch (error) {
    throw new Error(error.message);
  }
};
