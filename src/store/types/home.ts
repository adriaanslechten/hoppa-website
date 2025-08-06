// Define an interface for the data items
export interface HomeDataItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Define the type for the array of home data items
export type HomeData = HomeDataItem[];
