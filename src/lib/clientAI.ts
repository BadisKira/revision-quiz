import { Quiz, QuizDifficulty } from "@/type/quiz";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanMarkdownJSON } from "./utils";
import { validateQuestionsJson } from "./validations/jsonValidation";
import { IACorrection, VoicedQuestion } from "@/type/voice";

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
3. Une explication brève et pertinente pour expliquer la bonne réponse (sous le champ "explanation").

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
    ],
    "explanation": "Une explication brève pour la ou les  bonne réponse à cette question."
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

export const createQuestion = async ({
  theme,
  context = "",
  difficulty,
}: {
  theme: string;
  context: string | undefined;
  difficulty: QuizDifficulty;
}): Promise<VoicedQuestion | { error: string }> => {
  try {
    const prompt = `Génère une question de quiz unique sur le thème "${theme}" avec un niveau de difficulté "${difficulty}". ${
      context ? "Contexte: " + context : ""
    }.
    Réponds uniquement avec un objet JSON de la forme: { "content": "texte de la question" }`;

    
    const { response } = await model.generateContent(prompt);

    const cleanedResponse = cleanMarkdownJSON(response.text());
    
    return  JSON.parse(cleanedResponse) as VoicedQuestion ;

  } catch (error) {
    console.error("Erreur lors de la création de la question:", error);
    return { error: "Erreur lors de la génération de la question." };
  }
};

export const CorrectingAnswers = async ({
  question,
  userAnswer,
}: {
  question: string;
  userAnswer: string;
}): Promise<IACorrection | { error: string }> => {
  try {
    const prompt = `Analyse la situation suivante :
          Question : "${question}"
          Réponse de l'utilisateur : "${userAnswer}"

          Ta mission est de :
          1. Fournir une correction approfondie et détaillée de la réponse de l'utilisateur.
          2. Expliquer clairement les points forts, les points faibles et les erreurs éventuelles.
          3. Proposer la réponse exacte ou la méthode correcte en justifiant tes corrections.

          Réponds exclusivement avec un objet JSON conforme exactement au format ci-dessous, sans aucun texte supplémentaire :

          {
            "resumeAnswer": "Un résumé concis de la réponse de l'utilisateur.",
            "verdict": "Une évaluation synthétique indiquant si la réponse est correcte, partiellement correcte ou incorrecte.",
            "correction": "La réponse corrigée, avec explications détaillées des points clés et des erreurs relevées."
          }`
    ;


    const { response } = await model.generateContent(prompt);
    const cleanedResponse = cleanMarkdownJSON(response.text());
    
    return  JSON.parse(cleanedResponse) as IACorrection ;
  } catch (error) {
    console.error("Erreur lors de la correction de la réponse:", error);
    return { error: "Erreur lors de la correction de la réponse." };
  }
};
