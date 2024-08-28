"use client";
import { Button, cn } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { LuLoader2 } from "react-icons/lu";

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  className,
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
	  size="lg"
	  color="primary"
	  radius="sm"
      className={cn(className)}
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  );
}