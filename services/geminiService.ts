import { GoogleGenAI } from "@google/genai";
import { Perspective } from "../types";

// Helper to check environment variable
export const analyzeVideo = async (
  apiKey: string,
  base64Data: string,
  mimeType: string,
  perspective: Perspective,
  onProgress?: (message: string) => void
): Promise<string> => {
  try {
    if (!apiKey) throw new Error("Vui lòng nhập Gemini API Key.");
    const ai = new GoogleGenAI(apiKey);

    // Using gemini-3-flash-preview as recommended in guidelines.
    const modelId = "gemini-3-flash-preview";

    if (onProgress) onProgress("Đang kết nối với Gemini AI...");

    const prompt = `
      ${perspective.promptFocus}
      
      Yêu cầu đầu ra:
      1. Ngôn ngữ: Tiếng Việt.
      2. Định dạng: Markdown rõ ràng, sử dụng tiêu đề, gạch đầu dòng, và in đậm các từ khóa quan trọng.
      3. Giọng văn: Chuyên nghiệp, sâu sắc, đúng chuyên môn của vai trò ${perspective.name}.
      4. Hãy phân tích chi tiết, tránh nói chung chung.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
        ],
      },
      config: {
        // Temperature helps with creative analysis but not too random
        temperature: 0.7,
      }
    });

    if (onProgress) onProgress("Đang xử lý kết quả...");

    return response.text || "Không nhận được phản hồi từ AI.";

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    if (error.message && error.message.includes("413")) {
      throw new Error("Video quá lớn để xử lý trực tiếp. Vui lòng thử video ngắn hơn hoặc dung lượng nhỏ hơn (dưới 20MB).");
    }
    throw new Error(`Lỗi phân tích: ${error.message || "Đã có lỗi xảy ra."}`);
  }
};