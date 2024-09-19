/** @format */

import axios from "axios";

// Define the type structure of a single project
interface Project {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
  // Add more fields as per your Firebase data structure
}

export type FirebaseResponse = Record<string, Project>;

const fetchMoreProjects = async (): Promise<FirebaseResponse> => {
  try {
    const response = await axios.get<FirebaseResponse>(
      "https://project1-0-83d5d-default-rtdb.firebaseio.com/projects.json"
    );

    return response.data; // Ensure you're returning the actual data
  } catch (error: any) {
    console.log("Error fetching projects:", error.message);
    throw new Error("Could not fetch projects"); // Re-throw the error if needed for further handling
  }
};

export default fetchMoreProjects;
