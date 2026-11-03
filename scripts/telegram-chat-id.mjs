// Finds your Telegram chat id for lead alerts.
// 1. Create a bot with @BotFather and put its token in .env.local as TELEGRAM_BOT_TOKEN=...
// 2. Open your bot in Telegram and send it any message (e.g. "hi").
// 3. Run: npm run telegram:chat-id
// The token stays on this machine; only the chat id is printed.
import { readFileSync } from "node:fs";

function tokenFromEnvFile() {
  try {
    const line = readFileSync(".env.local", "utf8")
      .split(/\r?\n/)
      .find((l) => l.startsWith("TELEGRAM_BOT_TOKEN="));
    return line?.slice("TELEGRAM_BOT_TOKEN=".length).trim().replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

const token = process.env.TELEGRAM_BOT_TOKEN || tokenFromEnvFile();
if (!token) {
  console.error("No TELEGRAM_BOT_TOKEN found in your environment or .env.local.");
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const body = await res.json();
if (!body.ok) {
  console.error("Telegram said:", body.description ?? res.status);
  process.exit(1);
}
const chats = new Map();
for (const u of body.result ?? []) {
  const chat = (u.message ?? u.channel_post ?? u.my_chat_member)?.chat;
  if (chat) chats.set(chat.id, chat.title ?? [chat.first_name, chat.last_name].filter(Boolean).join(" ") ?? chat.username);
}
if (chats.size === 0) {
  console.log("No messages yet. Open your bot in Telegram, send it any message, then run this again.");
} else {
  for (const [id, name] of chats) console.log(`TELEGRAM_CHAT_ID=${id}   (${name})`);
}
