/**
 * 💬 WhatsApp Message Parser
 *
 * Chintu ek WhatsApp chat analyzer bana raha hai. Usse raw WhatsApp
 * exported message line parse karni hai aur usme se date, time, sender,
 * aur message alag alag extract karna hai.
 *
 * WhatsApp export format:
 *   "DD/MM/YYYY, HH:MM - Sender Name: Message text here"
 *
 * Rules:
 *   - Date extract karo: string ke start se pehle ", " (comma-space) tak
 *   - Time extract karo: ", " ke baad se " - " (space-dash-space) tak
 *   - Sender extract karo: " - " ke baad se pehle ": " (colon-space) tak
 *   - Message text extract karo: pehle ": " ke baad (after sender) sab kuch, trimmed
 *   - wordCount: message ke words count karo (split by space, filter empty strings)
 *   - Sentiment detection (case-insensitive check on message text):
 *     - Agar message mein "😂" ya ":)" ya "haha" hai => sentiment = "funny"
 *     - Agar message mein "❤" ya "love" ya "pyaar" hai => sentiment = "love"
 *     - Otherwise => sentiment = "neutral"
 *     - Agar dono match hote hain, "funny" gets priority
 *   - Hint: Use indexOf(), substring()/slice(), includes(), split(),
 *     trim(), toLowerCase()
 *
 * Validation:
 *   - Agar input string nahi hai, return null
 *   - Agar string mein " - " nahi hai ya ": " nahi hai (after sender), return null
 *
 * @param {string} message - Raw WhatsApp exported message line
 * @returns {{ date: string, time: string, sender: string, text: string, wordCount: number, sentiment: string } | null}
 *
 * @example
 *   parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Bhai party kab hai? 😂")
 *   // => { date: "25/01/2025", time: "14:30", sender: "Rahul",
 *   //      text: "Bhai party kab hai? 😂", wordCount: 5, sentiment: "funny" }
 *
 *   parseWhatsAppMessage("01/12/2024, 09:15 - Priya: I love this song")
 *   // => { date: "01/12/2024", time: "09:15", sender: "Priya",
 *   //      text: "I love this song", wordCount: 4, sentiment: "love" }
 */
export function parseWhatsAppMessage(message) {
  // Validate input
  if (typeof message !== 'string') return null;
  if (!message.includes(' - ') || !message.includes(': ')) return null;
  
  // Find the date/time separator
  const commaSpaceIdx = message.indexOf(', ');
  if (commaSpaceIdx === -1) return null;
  
  // Extract date
  const date = message.substring(0, commaSpaceIdx);
  
  // Find the " - " separator
  const dashIdx = message.indexOf(' - ');
  if (dashIdx === -1) return null;
  
  // Extract time
  const time = message.substring(commaSpaceIdx + 2, dashIdx);
  
  // Find the ": " separator after sender
  const colonIdx = message.indexOf(': ', dashIdx);
  if (colonIdx === -1) return null;
  
  // Extract sender
  const sender = message.substring(dashIdx + 3, colonIdx);
  
  // Extract message text
  const text = message.substring(colonIdx + 2);
  
  // Count words
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  // Detect sentiment
  const textLower = text.toLowerCase();
  let sentiment = 'neutral';
  
  // Check for funny
  if (text.includes('😂') || textLower.includes(':)') || textLower.includes('haha')) {
    sentiment = 'funny';
  }
  // Check for love
  else if (text.includes('❤') || textLower.includes('love') || textLower.includes('pyaar')) {
    sentiment = 'love';
  }
  
  return {
    date,
    time,
    sender,
    text,
    wordCount,
    sentiment
  };
}
