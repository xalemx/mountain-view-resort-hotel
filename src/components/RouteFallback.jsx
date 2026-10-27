export default function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center" aria-busy="true">
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-hidden="true"
      />
    </div>
  );
}