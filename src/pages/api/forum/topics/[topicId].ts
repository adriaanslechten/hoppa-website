import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { topicId } = req.query;

  if (!topicId || typeof topicId !== "string") {
    return res.status(400).json({ error: "Invalid topic ID" });
  }

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
      // Get topic details
      const response = await axios.get(`${API_URL}/topics/topicDetails`, {
        params: { topicId },
        headers,
      });
      return res.status(200).json(response.data);
    } else if (req.method === "PATCH") {
      // Update topic or vote
      const { value, userId, title, content } = req.body;

      // Check if this is a vote or an update
      if (value !== undefined) {
        // Vote on topic
        const response = await axios.patch(`${API_URL}/topics/vote`, { userId, topicId, value }, { headers });
        return res.status(200).json(response.data);
      } else {
        // Update topic
        const response = await axios.patch(
          `${API_URL}/topics/update`,
          { topicId, userId, title, content },
          { headers }
        );
        return res.status(200).json(response.data);
      }
    } else if (req.method === "DELETE") {
      // Delete topic
      const response = await axios.delete(`${API_URL}/topics`, {
        headers,
        data: { topicId, userId: req.body.userId },
      });
      return res.status(200).json(response.data);
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
