import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";

export default function SignInButton() {
  return (
    <div className="px-3 py-2">
      <Link href={"/auth"}>
        <Button className="w-full" variant="default">
          Sign In with Google
        </Button>
      </Link>
    </div>
  );
}
