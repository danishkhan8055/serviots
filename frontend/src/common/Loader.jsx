import { memo } from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex gap-2">
        <span className="h-5 w-5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="h-5 w-5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="h-5 w-5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.30s]" />
        <span className="h-5 w-5 bg-fuchsia-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default memo(Loader);
