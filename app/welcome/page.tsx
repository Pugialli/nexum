
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to Nexum!</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            We're so excited to have you on board.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            You're all set to explore and connect. Feel free to look around and
            see what our platform has to offer.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Get Started</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
