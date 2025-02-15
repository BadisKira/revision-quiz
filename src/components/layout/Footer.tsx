export default function Footer() {
  return (
    <footer className="py-12 bg-secondary/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TechQuizAI</h3>
            <p className="text-sm text-muted-foreground">
{"              Préparez-vous efficacement aux entretiens avec l'IA"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Fonctionnalités</li>
              <li>Tarifs</li>
              <li>Témoignages</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Blog</li>
              <li>Guide</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{"Conditions d'utilisation"}</li>
              <li>{"Politique de confidentialité"}</li>
              <li>Mentions légales</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2024 InterviewAI. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}