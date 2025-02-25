export default function LoaderComponent({ text }: { text?: string }) {
  return (
    <div
      className="absolute bg-transparent top-0 left-0  w-full h-full flex justify-center items-center 
    text-xl font-semibold"
    >
      {text ?? "Chargement..."}
    </div>
  );
}
