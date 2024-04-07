import { env } from "../env";
import { User } from "../database/models/User";
import {
  IAuth,
  ICreateAnnotation,
  IDeleteAnnotation,
  IPatchAnnotation,
  IUser,
  IUserSchema,
} from "../interfaces/user";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { randomUUID } from "crypto";

export class UserService {
  async create({ name, email, password }: IUser) {
    const alreadyCreated = await User.findOne({ email: email });

    if (alreadyCreated) throw new Error("User already exists");

    const user = await User.create({ name, email, password });

    return user;
  }

  async authorize({
    email,
    password,
  }: IAuth): Promise<{ user: IUserSchema; accessToken: string }> {
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) throw new Error("Invalid email or password");

    const isValid = await compare(password, user.password);

    if (!isValid) throw new Error("Invalid email or password");

    const accessToken = sign({ id: user._id }, env.JWT_SECRET_KEY, {
      expiresIn: "1 day",
    });

    return { user: user.toObject({ getters: true }), accessToken };
  }

  async findUserById(id: string): Promise<IUserSchema | unknown> {
    const user = await User.findById(id);

    return user;
  }

  async createAnnotation({
    userId,
    annotationName,
    annotationDate,
  }: ICreateAnnotation) {
    const annotation = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          lembretes: {
            annotationId: randomUUID(),
            annotationName,
            annotationDate,
          },
        },
      },
      { new: true }
    );

    return annotation;
  }

  async deleteAnnotation({ userId, annotationId }: IDeleteAnnotation) {
    const user = await User.findById(userId);

    if (user) {
      user.lembretes.map(async (annotation, index) => {
        if (annotation.annotationId === annotationId) {
          user.lembretes.splice(index, 1);
          await user.save();
        }
      });
    }

    return user;
  }

  async patchAnnotation({
    userId,
    annotationId,
    annotationDate,
    annotationName,
  }: IPatchAnnotation) {
    const user = await User.findById(userId);

    if (user) {
      user.lembretes.map(async (annotation, index) => {
        if (annotation.annotationId === annotationId) {
          user.lembretes[index].annotationName = annotationName;
          user.lembretes[index].annotationDate = annotationDate;
          await user.save();
        }
      });
    }

    return user;
  }
}
