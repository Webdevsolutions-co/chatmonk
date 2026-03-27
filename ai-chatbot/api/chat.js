import fetch from "node-fetch";

export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const response = await fetch("https://api.google.com/gemini/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        input: message,
      }),
    });

    const data = await response.json();

    res.status(200).json({ reply: data.output_text || "Sorry, I couldn't answer." });
  } catch (err) {
    res.status(500).json({ reply: "Error contacting AI API." });
  }
}