import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypeDefs = loadFilesSync("src/graphql/schema/**/*.graphql");

export const typeDefs = mergeTypeDefs(loadedTypeDefs);