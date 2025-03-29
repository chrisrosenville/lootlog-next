import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default async function SignUpPage() {
  return (
    <main className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center gap-4 p-4">
      <SignUp appearance={{ baseTheme: dark }} />
    </main>
  );
}
