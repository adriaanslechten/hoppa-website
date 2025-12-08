import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (req.method === "GET") {
      const response = await axios.get(`${API_URL}/blog/articles/${id}/related`, {
        params: req.query,
        headers,
      });
      return res.status(200).json(response.data);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error: any) {
    console.error("Blog API Error:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: "Internal server error" },
    });
  }
}
