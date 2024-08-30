import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const translateText = async (text: string): Promise<string> => {
  const TRANSLATION_API_URL = process.env.NEXT_PUBLIC_TRANSLATION_API_URL;
  const TRANSLATION_API_KEY = process.env.NEXT_PUBLIC_TRANSLATION_API_KEY_1;
  const TRANSLATION_API_REGION = process.env.NEXT_PUBLIC_TRANSLATION_API_REGION;

  if (!TRANSLATION_API_URL || !TRANSLATION_API_KEY || !TRANSLATION_API_REGION) {
    throw new Error("API URL, API Key, or API Region is missing");
  }

  try {
    const response = await axios({
      method: "post",
      url: `${TRANSLATION_API_URL}/translate`,
      params: {
        "api-version": "3.0",
        from: "en",
        to: "ne",
      },
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": TRANSLATION_API_KEY,
        "Ocp-Apim-Subscription-Region": TRANSLATION_API_REGION,
        "X-ClientTraceId": uuidv4().toString(),
      },
      data: [{ text }],
    });

    if (response.status !== 200) {
      throw new Error(`Translation API error: ${response.statusText}`);
    }

    return response.data[0].translations[0].text;
  } catch (error: any) {
    console.error(`Error during translation request: ${error.message}`);
    throw error;
  }
};

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string" },
        { status: 400 }
      );
    }

    const translatedText = await translateText(text);
    return NextResponse.json({ translatedText }, { status: 200 });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 }
    );
  }
}
