/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { type ScalarsEnumsHash } from "gqty";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string };
}

export interface CreateUserInput {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}

export interface LoginInput {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}

export interface RefreshTokenInput {
  refreshToken: Scalars["String"]["input"];
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  DateTime: true,
  Int: true,
  String: true,
};
export const generatedSchema = {
  AllUsersResponse: {
    __typename: { __type: "String!" },
    data: { __type: "[UserResponse!]" },
    error: { __type: "Int!" },
    message: { __type: "String!" },
  },
  CreateUserInput: {
    email: { __type: "String!" },
    password: { __type: "String!" },
  },
  CreateUserResponse: {
    __typename: { __type: "String!" },
    data: { __type: "UserResponse" },
    error: { __type: "Int!" },
    message: { __type: "String!" },
  },
  LoginInput: { email: { __type: "String!" }, password: { __type: "String!" } },
  LoginResponse: {
    __typename: { __type: "String!" },
    accessToken: { __type: "String" },
    error: { __type: "Int!" },
    message: { __type: "String!" },
    refreshToken: { __type: "String" },
  },
  RefreshTokenInput: { refreshToken: { __type: "String!" } },
  RefreshTokenResponse: {
    __typename: { __type: "String!" },
    accessToken: { __type: "String" },
    error: { __type: "Int" },
    message: { __type: "String" },
    refreshToken: { __type: "String" },
  },
  UserResponse: {
    __typename: { __type: "String!" },
    created_at: { __type: "DateTime!" },
    email: { __type: "String!" },
    id: { __type: "Int!" },
    updated_at: { __type: "DateTime!" },
  },
  mutation: {
    __typename: { __type: "String!" },
    createUser: {
      __type: "CreateUserResponse!",
      __args: { input: "CreateUserInput!" },
    },
    login: { __type: "LoginResponse!", __args: { input: "LoginInput!" } },
    refreshToken: {
      __type: "RefreshTokenResponse!",
      __args: { input: "RefreshTokenInput!" },
    },
  },
  query: {
    __typename: { __type: "String!" },
    getMe: { __type: "UserResponse!" },
    getUser: { __type: "AllUsersResponse!" },
  },
  subscription: {},
} as const;

export interface AllUsersResponse {
  __typename?: "AllUsersResponse";
  data?: Maybe<Array<UserResponse>>;
  error: ScalarsEnums["Int"];
  message: ScalarsEnums["String"];
}

export interface CreateUserResponse {
  __typename?: "CreateUserResponse";
  data?: Maybe<UserResponse>;
  error: ScalarsEnums["Int"];
  message: ScalarsEnums["String"];
}

export interface LoginResponse {
  __typename?: "LoginResponse";
  accessToken?: Maybe<ScalarsEnums["String"]>;
  error: ScalarsEnums["Int"];
  message: ScalarsEnums["String"];
  refreshToken?: Maybe<ScalarsEnums["String"]>;
}

export interface RefreshTokenResponse {
  __typename?: "RefreshTokenResponse";
  accessToken?: Maybe<ScalarsEnums["String"]>;
  error?: Maybe<ScalarsEnums["Int"]>;
  message?: Maybe<ScalarsEnums["String"]>;
  refreshToken?: Maybe<ScalarsEnums["String"]>;
}

export interface UserResponse {
  __typename?: "UserResponse";
  created_at: ScalarsEnums["DateTime"];
  email: ScalarsEnums["String"];
  id: ScalarsEnums["Int"];
  updated_at: ScalarsEnums["DateTime"];
}

export interface Mutation {
  __typename?: "Mutation";
  createUser: (args: { input: CreateUserInput }) => CreateUserResponse;
  login: (args: { input: LoginInput }) => LoginResponse;
  refreshToken: (args: { input: RefreshTokenInput }) => RefreshTokenResponse;
}

export interface Query {
  __typename?: "Query";
  getMe: UserResponse;
  getUser: AllUsersResponse;
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type ScalarsEnums = {
  [Key in keyof Scalars]: Scalars[Key] extends { output: unknown }
    ? Scalars[Key]["output"]
    : never;
} & {};
