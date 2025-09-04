import { GoogleGenAI, Type } from "@google/genai";
import { type AnalysisResult, type MarketType, type MarketMoversResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    prediction: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A short, catchy title for the prediction (e.g., 'Bullish Outlook', 'High-Risk Volatility')."
        },
        direction: {
          type: Type.STRING,
          enum: ['UP', 'DOWN', 'NEUTRAL'],
          description: "The predicted primary direction of the assets in this strategy."
        },
      },
    },
    summary: {
      type: Type.STRING,
      description: "A concise, 2-3 sentence summary of the analysis."
    },
    pros: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of 3-4 bullet points highlighting the potential upsides or strengths of the strategy."
    },
    cons: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of 3-4 bullet points highlighting the potential downsides or weaknesses of the strategy."
    },
    stats: {
      type: Type.OBJECT,
      properties: {
        potentialRoi: {
          type: Type.STRING,
          description: "Estimated potential Return on Investment as a percentage range (e.g., '5% - 15%')."
        },
        riskLevel: {
          type: Type.STRING,
          enum: ['Low', 'Medium', 'High', 'Very High'],
          description: "The assessed risk level of this strategy."
        },
        marketSentiment: {
          type: Type.STRING,
          enum: ['Bullish', 'Bearish', 'Neutral'],
          description: "The current general market sentiment for the selected market."
        },
        confidence: {
            type: Type.INTEGER,
            description: "A confidence score for this analysis, from 0 to 100."
        }
      },
    },
  },
};

export const analyzeStrategy = async (strategy: string, market: MarketType): Promise<AnalysisResult> => {
  const prompt = `
    Act as an expert financial market analyst. I will provide you with a trading strategy and a target market.
    Your task is to conduct a thorough analysis and provide a structured JSON response based on the provided schema.
    Do not include any introductory text like "Here is the analysis". Just return the raw JSON object.

    Market for Analysis: ${market}
    Trading Strategy to Analyze: "${strategy}"

    Provide your analysis in the specified JSON format. The analysis should be plausible and based on common financial principles and market behavior for the given market type.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult: AnalysisResult = JSON.parse(jsonText);
    return parsedResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};

const marketMoversSchema = {
    type: Type.OBJECT,
    properties: {
        gainers: {
            type: Type.ARRAY,
            description: "A list of the top 3 market gainers.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Company or asset name." },
                    symbol: { type: Type.STRING, description: "Stock ticker or crypto symbol." },
                    price: { type: Type.STRING, description: "Current price, formatted with currency symbol." },
                    change: { type: Type.STRING, description: "Percentage change, prefixed with + or -." },
                },
            },
        },
        losers: {
            type: Type.ARRAY,
            description: "A list of the top 3 market losers.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Company or asset name." },
                    symbol: { type: Type.STRING, description: "Stock ticker or crypto symbol." },
                    price: { type: Type.STRING, description: "Current price, formatted with currency symbol." },
                    change: { type: Type.STRING, description: "Percentage change, prefixed with + or -." },
                },
            },
        },
        ipos: {
            type: Type.ARRAY,
            description: "A list of 2-3 upcoming IPOs.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Company name." },
                    date: { type: Type.STRING, description: "Expected IPO date." },
                    valuation: { type: Type.STRING, description: "Expected valuation, e.g., '$5B'." },
                },
            },
        },
    },
};

export const fetchMarketMovers = async (market: MarketType): Promise<MarketMoversResult> => {
  const prompt = `
    Act as a financial data provider. Your task is to generate a plausible, but fictional, list of today's market movers for the specified market.
    The data should look realistic and current.
    
    Provide a list for:
    1.  Top 3 Gainers ("hot stocks")
    2.  Top 3 Losers ("cooling off")
    3.  2-3 Upcoming IPOs (or equivalent for crypto, like major token launches)

    Do not include any introductory text. Just return the raw JSON object based on the schema.

    Market for Data: ${market}
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: marketMoversSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult: MarketMoversResult = JSON.parse(jsonText);
    return parsedResult;

  } catch (error) {
    console.error("Error calling Gemini API for market movers:", error);
    throw new Error("Failed to get market movers data from Gemini API.");
  }
};
