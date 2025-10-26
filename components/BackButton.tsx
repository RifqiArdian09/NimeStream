"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Always go to home page instead of browser back
    router.push('/');
  };

  return (
    <Button 
      onClick={handleBack} 
      variant="outline" 
      size="sm"
    >
      <ArrowLeftIcon className="mr-2 size-4" />
      Kembali ke Home
    </Button>
  );
}
