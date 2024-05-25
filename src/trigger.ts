import { TriggerClient } from "@trigger.dev/sdk";

export const client = new TriggerClient({
  id: "linkpinch-1Z_7",
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
