import { Quiz, QuizDifficulty } from "@/type/quiz";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanMarkdownJSON } from "./utils";
import { validateQuestionsJson } from "./validations/jsonValidation";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const createQuiz = async ({
  theme,
  numberQuestion,
  context = "",
  difficulty,
}: {
  theme: string;
  numberQuestion: number;
  context: string | undefined;
  difficulty: QuizDifficulty;
}): Promise<Quiz | { error: string }> => {
  const prompt = `
  Crée un quiz composé de ${numberQuestion} questions sur le thème suivant : "${theme}".
  Pour chaque question, génère :
    1. Le contenu de la question, rédigé clairement.
    2. Un tableau "answers" contenant :
        - Une ou deux bonnes réponses (avec "is_correct": true).
        - Une ou plusieurs propositions de réponses incorrectes (avec "is_correct": false), pouvant être moins de 4.

  La position des bonnes réponses dans le tableau "answers" doit être aléatoire (elles ne doivent pas toujours apparaître en première position).

  Le résultat final doit être renvoyé sous forme de JSON, en respectant exactement le format suivant (les uuid peuvent être des chaînes fictives ou omis si non nécessaires) :

  [
    {
      "content": "Contenu de la question 1",
      "answers": [
        {
          "content": "Une proposition de réponse",
          "is_correct": false
        },
        {
          "content": "La bonne réponse pour la question 1",
          "is_correct": true
        }
        // ... d'autres réponses incorrectes si nécessaire
      ]
    },
    // ... ${numberQuestion - 1} autres questions
  ]

  Voici un peu plus de contexte pour mieux orienter tes questions : ${context}

  Assure-toi que :
  - La difficulté du quiz soit : ${difficulty}.
  - Toutes les questions et réponses restent fidèles au thème choisi, même si le contexte fourni par l'utilisateur est une simple phrase ou une explication.
  - Le format JSON retourné respecte exactement le schéma ci-dessus, sans informations ou commentaires supplémentaires.
`;


  const { response } = await model.generateContent(prompt);

  const cleanedResponse = cleanMarkdownJSON(response.text());

  const quizValidation = validateQuestionsJson(cleanedResponse);

  if (quizValidation.valid) {
    return { questions: JSON.parse(cleanedResponse) };
  }

  return {
    error:
      quizValidation.error ||
      "Une erreur s'est produite lors de la génération du quiz",
  };
};
