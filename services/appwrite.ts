import { Client, Databases, ID, Query } from "react-native-appwrite";

// INITIALIZE APPWRITE
const PROJECT_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client().setEndpoint(PROJECT_ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

// TRACK THE USER SEARCHES AND UPDATE RECORDS
export const updateSearchCount = async (query: string, movie: Movie) => {
  // browse the db if the searched movie record already exists?
  // yes? increment the movie search count
  // no? create a new record and increment its count to 1

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("search_term", query),
    ]);

    // console.log("RESULT", result);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        search_term: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Set Trending Movie Error: ", error);
    throw error;
  }
};
