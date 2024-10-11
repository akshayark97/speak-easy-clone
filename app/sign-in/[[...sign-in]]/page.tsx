import BgGradient from "@/components/common/bg-gradient";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex items-center justify-center py-16">
      <BgGradient>
        <SignIn />
      </BgGradient>
    </section>
  );
}
