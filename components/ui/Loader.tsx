export function Loader() {
  return (
    <div className="flex h-32 w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  );
}

// Alternate
export function LoaderSmall() {
  return (
    <div className="flex h-16 w-full items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  );
}

// Full page loader with backdrop
export function LoaderFullPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>
  );
}
