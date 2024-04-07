import { ObjectId } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUserSchema;
  accessToken: string;
}

export interface ICreateAnnotation {
  userId: string;
  annotationName: string;
  annotationDate: string;
}

export interface IDeleteAnnotation {
  userId: string;
  annotationId: string;
}

export interface IPatchAnnotation {
  userId: string;
  annotationName: string;
  annotationDate: string;
  annotationId: string;
}
