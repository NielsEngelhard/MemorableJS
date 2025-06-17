import Button from "@/components/ui/Button";
import { APP_NAME } from "@/lib/global-constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1>Welcome to {APP_NAME}</h1>

      <p>text</p>

      <div className="flex gap-4">
        <Button variant="fade">Start</Button>
        <Button variant="skeleton">Learn More</Button>
      </div>
    </div>
  );
}
