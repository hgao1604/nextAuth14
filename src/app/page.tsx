import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-background">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-primary drop-shadow-md">
          🔐 Auth
        </h1>
        <p className="text-muted-foreground">
          A simple authentication system using NextAuth
        </p>
        <LoginButton mode="modal">
          <Button size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
