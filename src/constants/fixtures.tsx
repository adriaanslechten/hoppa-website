// src/constants/fixtures.ts
const allData = [
  {
    title: "Example Community",
    description: "Description of the community or product.",
    link: "https://example.com",
    stats: [
      { label: "Followers", value: "1.8K" },
      { label: "Posts", value: "186" },
    ],
  },
  {
    title: "Innovators Hub",
    description: "A platform for creative minds to share and innovate.",
    link: "https://innovatorshub.com",
    stats: [
      { label: "Members", value: "3K" },
      { label: "Ideas Shared", value: "1.2K" },
    ],
  },
  {
    title: "Tech Pioneers",
    description: "Leading discussions on the latest in technology.",
    link: "https://techpioneers.com",
    stats: [
      { label: "Subscribers", value: "5K" },
      { label: "Videos", value: "500" },
    ],
  },
  {
    title: "Health Community",
    description: "Advancing wellness and health awareness.",
    link: "https://healthcommunity.com",
    stats: [
      { label: "Followers", value: "800" },
      { label: "Posts", value: "150" },
    ],
  },
  {
    title: "Eco Warriors",
    description: "Dedicated to promoting sustainability and eco-friendly living.",
    link: "https://ecowarriors.com",
    stats: [
      { label: "Activists", value: "2.5K" },
      { label: "Projects", value: "89" },
    ],
  },
  {
    title: "Art Collective",
    description: "A collective of artists sharing and selling their work.",
    link: "https://artcollective.com",
    stats: [
      { label: "Artists", value: "1K" },
      { label: "Art Pieces", value: "3K" },
    ],
  },
  // Add more data if necessary to simulate multiple pages
];

export const fetchData = async (page = 1, limit = 2) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = allData.slice(startIndex, endIndex);

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (paginatedData.length === 0) {
    throw new Error("No more data available");
  }

  return paginatedData;
};
