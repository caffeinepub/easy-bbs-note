import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, GraduationCap, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const DEMO_EMAIL = "student@bbsnote.com";
const DEMO_PASSWORD = "bbs2080";

const benefits = [
  "Free notes for all 4 years",
  "Past questions from 2070\u20132080 BS",
  "Exam tips from top students",
];

// Pre-computed dot positions to avoid array index keys
const dotPositions = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 6 }, (_, col) => ({
    id: `dot-${row}-${col}`,
    cx: col * 20 + 10,
    cy: row * 20 + 10,
  })),
).flat();

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      toast.success("Login successful! Welcome back.");
      navigate({ to: "/" });
    } else {
      toast.error("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-stretch bg-background">
      {/* Left decorative panel \u2014 desktop only */}
      <motion.aside
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between w-[42%] xl:w-[38%] relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.44 0.115 230) 0%, oklch(0.24 0.07 245) 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none"
        >
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <div
            className="absolute top-1/2 -left-20 w-56 h-56 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          <div
            className="absolute -bottom-16 right-8 w-40 h-40 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          {/* Dot grid — aria-hidden, no meaningful title needed */}
          <svg
            aria-hidden="true"
            className="absolute bottom-8 left-8 opacity-20"
            width="120"
            height="120"
            viewBox="0 0 120 120"
          >
            {dotPositions.map((dot) => (
              <circle key={dot.id} cx={dot.cx} cy={dot.cy} r="2" fill="white" />
            ))}
          </svg>
        </div>

        {/* Panel content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-10 py-12 gap-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap size={26} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-xl text-white leading-tight">
                Easy BBS Note
              </div>
              <div className="text-xs text-white/70 tracking-widest uppercase">
                Nepal
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <h2 className="text-3xl font-bold text-white leading-snug">
              Your free study companion for BBS in Nepal
            </h2>
            <p className="mt-3 text-white/70 text-sm leading-relaxed">
              Everything you need to ace your BBS exams \u2014 notes, past
              questions, solutions, and expert tips. All in one place,
              completely free.
            </p>
          </div>

          {/* Benefits */}
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-white shrink-0"
                  strokeWidth={2.5}
                />
                <span className="text-white font-medium text-sm">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom accent */}
        <div className="relative z-10 px-10 py-6 border-t border-white/10">
          <p className="text-white/50 text-xs">
            Trusted by thousands of BBS students across Nepal
          </p>
        </div>
      </motion.aside>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-8">
        {/* Mobile logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="lg:hidden flex items-center gap-2.5 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap size={22} className="text-primary-foreground" />
          </div>
          <div>
            <div className="font-display font-bold text-lg text-foreground leading-tight">
              Easy BBS Note
            </div>
            <div className="text-[10px] text-primary tracking-widest uppercase font-medium">
              Nepal
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full max-w-md"
          >
            <div className="bg-card rounded-2xl shadow-lift border border-border px-8 py-10">
              {/* Heading */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome Back!
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Log in to access your BBS study materials
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-ocid="login.modal"
              >
                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-background"
                    data-ocid="login.input"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </Label>
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline font-medium bg-transparent border-0 p-0 cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-background"
                    data-ocid="login.input"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold mt-2"
                  disabled={loading}
                  data-ocid="login.submit_button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>

              {/* Register link */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-semibold hover:underline"
                  data-ocid="login.link"
                >
                  Sign up for free
                </Link>
              </p>

              {/* Demo hint */}
              <div className="mt-5 rounded-lg bg-secondary/70 border border-border px-4 py-3">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  <span className="font-semibold text-foreground">Demo:</span>{" "}
                  student@bbsnote.com \u00b7 bbs2080
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
