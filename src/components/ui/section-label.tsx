type SectionLabelProps = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.25em] text-secondary ${className}`.trim()}
    >
      <span className="gold-line" aria-hidden="true" />
      {children}
    </p>
  );
}