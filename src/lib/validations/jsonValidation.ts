export function validateQuestionsJson(jsonString: string): { valid: boolean; error?: string } {
    try {
      const data = JSON.parse(jsonString);
      if (!Array.isArray(data)) return { valid: false, error: "Le JSON doit être un tableau." };
  
      for (let i = 0; i < data.length; i++) {
        const q = data[i];
        if (typeof q?.content !== "string" || !Array.isArray(q?.answers)) {
          return { valid: false, error: `La question à l'index ${i} est invalide.` };
        }
        for (let j = 0; j < q.answers.length; j++) {
          const a = q.answers[j];
          if (typeof a?.content !== "string" || typeof a?.is_correct !== "boolean") {
            return { valid: false, error: `La réponse à l'index ${j} de la question ${i} est invalide.` };
          }
        }
      }
      return { valid: true };
    } catch (e) {
      return { valid: false, error: "Erreur lors du parsing JSON: " + e };
    }
  }
  