import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateAthleteStory(params: {
  name: string;
  sport: string;
  achievements: string[];
  goal: string;
  background: string;
}) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a professional sports journalist and storytelling expert. 
    Write a compelling, heart-moving, and inspiring campaign story for a student-athlete from India. 
    
    Athlete Details:
    Name: ${params.name}
    Sport: ${params.sport}
    Achievements: ${params.achievements.join(", ")}
    What the funds are for: ${params.goal}
    Student Background: ${params.background}
    
    The story should:
    1. Have a bold, catchy title.
    2. Focus on the struggle, resilience, and the dream of representating India.
    3. Use an emotional yet professional tone.
    4. Include a clear call to action for donors.
    5. Be formatted in clear paragraphs.
    
    Output only the story text.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Story Generation Error:", error);
    throw new Error("Could not generate story at this time.");
  }
}
