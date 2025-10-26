import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { commentId } = req.query;

  if (!commentId || typeof commentId !== "string") {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (req.method === "PATCH") {
      // Update comment
      const response = await axios.patch(`${API_URL}/comments/update`, { commentId, ...req.body }, { headers });
      return res.status(200).json(response.data);
    } else if (req.method === "DELETE") {
      // Delete comment
      const response = await axios.delete(`${API_URL}/comments`, {
        headers,
        data: { commentId, userId: req.body.userId },
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
