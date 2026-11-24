interface ProductsStatusProps {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function ProductsStatus({ isLoading, isError, onRetry }: ProductsStatusProps) {
  if (isLoading) {
    return <p className="text-center text-muted-foreground py-12">Carregando produtos...</p>;
  }
  if (isError) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p className="mb-3">Não foi possível carregar os produtos.</p>
        <button onClick={onRetry} className="text-accent font-semibold hover:underline">
          Tentar novamente
        </button>
      </div>
    );
  }
  return null;
}
