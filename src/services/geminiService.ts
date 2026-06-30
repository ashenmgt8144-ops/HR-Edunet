export interface Attachment {
  data: string; // base64
  mimeType: string;
  name: string;
}

export async function getChatResponse(
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  attachments: Attachment[] = []
) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history, attachments }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get AI response');
    }

    const data = await response.json();
    return data.text || "I processed your request but didn't generate any text. Could you try rephrasing?";
  } catch (error) {
    console.error("Gemini AI API Error:", error);
    return "I apologize, but I encountered an technical issue while processing your request. Please try again in a few moments.";
  }
}
