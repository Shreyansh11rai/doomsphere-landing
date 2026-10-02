"use client";

import { useTheme } from "next-themes";
import { Button, type ButtonProps } from "@/components/shared/Button";
import { themeTokenSamples } from "@/data/theme-review";
import { isThemeName, themeNames, type ThemeName } from "@/lib/theme";

const glassTokens = ["ui-surface", "ui-modal", "ui-card"] as const;

type ButtonVariant = NonNullable<ButtonProps["variant"]>;
type ButtonSize = NonNullable<ButtonProps["size"]>;
type ButtonRadius = NonNullable<ButtonProps["radius"]>;

const buttonVariants: readonly ButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
];
const buttonSizes: readonly ButtonSize[] = ["sm", "md", "lg", "icon"];
const buttonRadii: readonly ButtonRadius[] = ["md", "lg", "xl", "full"];

export function ThemeReviewView() {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = isThemeName(resolvedTheme) ? resolvedTheme : "light";

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
          Design system
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Theme review
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Choose a theme and inspect the semantic colour tokens used across the
          interface.
        </p>
      </div>

      <section
        className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-[0_18px_50px_-30px_rgb(var(--theme-shadow))] sm:p-8"
        aria-labelledby="theme-selector-title"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="theme-selector-title"
              className="text-lg font-semibold text-foreground"
            >
              Appearance
            </h2>
            <p className="mt-1 text-sm text-muted">
              Your selection is saved on this device.
            </p>
          </div>
          <div
            className="inline-flex rounded-lg bg-surface-muted p-1"
            role="group"
            aria-label="Select color theme"
          >
            {themeNames.map((theme) => (
              <ThemeSelectionButton
                key={theme}
                theme={theme}
                currentTheme={currentTheme}
                onSelect={setTheme}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="tokens-title">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="tokens-title"
            className="text-xl font-semibold text-foreground"
          >
            Semantic tokens
          </h2>
          <p className="text-sm text-muted">
            {themeTokenSamples.length} Variable classes available for review
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {themeTokenSamples.map((sample) => (
            <article
              key={sample.label}
              className={`overflow-hidden rounded-xl border border-border ${sample.utilityClass.startsWith("text-") && "bg-surface px-3 py-5"}`}
            >
              <div
                className={`flex h-24 items-center justify-center border-b border-border ${sample.utilityClass.startsWith("text-") ? "bg-surface px-3 py-5" : sample.utilityClass}`}
              >
                {sample.utilityClass.startsWith("text-") && (
                  <div className="flex flex-col gap-1">
                    <span
                      className={`${sample.utilityClass} text-3xl font-extrabold `}
                    >
                      {sample.label}
                    </span>
                    <span className={`${sample.utilityClass} text lowercase`}>
                      This is sample text to visualize the text
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-foreground">
                  {sample.label}
                </p>
                <p className="mt-1 text-xs font-medium tracking-[0.12em] text-subtle uppercase">
                  {sample.cssVariable}
                </p>
                <p className="mt-2 text-sm text-muted">{sample.utilityClass}</p>
              </div>
            </article>
          ))}
          {glassTokens.map((token) => (
            <div key={token}>
              <div className="relative w-50 bg-surface p-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis dolorem, doloremque fuga voluptate incidunt eum! Vel
                veritatis modi dolore dolores.
                <div
                  className={`absolute top-0 left-0 z-10 h-full w-full ${token}`}
                ></div>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">
                {token}
              </h3>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className={`border border-border ${token}`}
              >
                Demo buttons
              </Button>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-8" aria-labelledby="buttons-title">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="buttons-title"
            className="text-xl font-semibold text-foreground"
          >
            Buttons
          </h2>
          <p className="text-sm text-muted">
            {buttonVariants.length} variants, {buttonSizes.length} sizes, and{" "}
            {buttonRadii.length} radii available for review
          </p>
        </div>
        <div className="mt-4 grid gap-4">
          <ButtonReviewGroup label="Variants">
            {buttonVariants.map((variant) => (
              <Button key={variant} type="button" variant={variant}>
                {formatTokenLabel(variant)}
              </Button>
            ))}
          </ButtonReviewGroup>

          <ButtonReviewGroup label="Sizes">
            {buttonSizes.map((size) => (
              <Button
                key={size}
                type="button"
                size={size}
                aria-label={size === "icon" ? "Icon size button" : undefined}
              >
                {size === "icon" ? (
                  <span aria-hidden="true">+</span>
                ) : (
                  `${formatTokenLabel(size)} button`
                )}
              </Button>
            ))}
          </ButtonReviewGroup>

          <ButtonReviewGroup label="Radii">
            {buttonRadii.map((radius) => (
              <Button key={radius} type="button" radius={radius}>
                {formatTokenLabel(radius)}
              </Button>
            ))}
          </ButtonReviewGroup>

          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Variant and size matrix
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {buttonVariants.map((variant) => (
                <div key={variant} className="space-y-3">
                  <p className="text-xs font-semibold tracking-[0.12em] text-subtle uppercase">
                    {variant}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {buttonSizes.map((size) => (
                      <Button
                        key={`${variant}-${size}`}
                        type="button"
                        variant={variant}
                        size={size}
                        aria-label={
                          size === "icon"
                            ? `${formatTokenLabel(variant)} icon button`
                            : undefined
                        }
                      >
                        {size === "icon" ? (
                          <span aria-hidden="true">+</span>
                        ) : (
                          formatTokenLabel(size)
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface ThemeSelectionButtonProps {
  currentTheme: ThemeName;
  onSelect: (theme: string) => void;
  theme: ThemeName;
}

function ThemeSelectionButton({
  currentTheme,
  onSelect,
  theme,
}: ThemeSelectionButtonProps) {
  const isSelected = currentTheme === theme;

  return (
    <Button
      type="button"
      onClick={() => onSelect(theme)}
      aria-pressed={isSelected}
      variant={isSelected ? "secondary" : "ghost"}
      radius="md"
      className="capitalize"
    >
      {theme}
    </Button>
  );
}

function ButtonReviewGroup({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h3 className="text-sm font-semibold text-foreground">{label}</h3>
      <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function formatTokenLabel(token: string) {
  return token.charAt(0).toUpperCase() + token.slice(1);
}
