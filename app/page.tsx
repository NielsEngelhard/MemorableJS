import Button from "@/components/ui/Button";
import FadedText from "@/components/ui/text/FadedText";
import UspBulletPoint from "@/components/ui/UspBulletPoint";
import { APP_NAME } from "@/lib/global-constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-4xl gap-4 text-center mt-20">
      <FadedText>
        <h1 className="text-6xl font-bold">Welcome to {APP_NAME}</h1>
      </FadedText>

      <p className="text-2xl text-foreground-muted">
        Challenge your mind with premium word games and trivia. Clean, modern gaming designed for the sophisticated player.        
      </p>

      <div className="flex gap-4">
        <Button variant="fade">Start</Button>
        <Button variant="skeleton">Learn More</Button>
      </div>

      <div className="flex flex-row flex-1">
        <UspBulletPoint icon="flash" description="Jump right into games with no downloads required." title="Instant Play" color="primary" />
        <UspBulletPoint icon="flash" description="Jump right into games with no downloads required." title="Instant Play" color="secondary" />
        <UspBulletPoint icon="flash" description="Jump right into games with no downloads required." title="Instant Play" color="accent" />
      </div>
    </div>
  );
}
