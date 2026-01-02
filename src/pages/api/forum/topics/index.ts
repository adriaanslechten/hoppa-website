import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token && req.method !== "GET") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (req.method === "GET") {
      // List topics - use public endpoint (no auth required)
      const response = await axios.get(`${API_URL}/forum/topics`, {
        params: req.query,
      });
      return res.status(200).json(response.data);
    } else if (req.method === "POST") {
      // Create topic
      const response = await axios.post(`${API_URL}/topics`, req.body, { headers });
      return res.status(201).json(response.data);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: "Internal server error" },
    });
  }
}
