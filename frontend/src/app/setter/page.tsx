"use client";
import { useState } from "react";
import { InputForm } from "../components/setproblem/inputform";
import { IOForm, IOPair } from "../components/setproblem/ioform";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [showIODialog, setShowIODialog] = useState(false);
  const [cnt, setCnt] = useState<number>(0);
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  const handleProceed = (id: string) => {
    setId(id);
    setShowIODialog(true);
    setIsDisable(true);
  };

  const handleAddIOPair = () => {
    setCnt(cnt + 1);
  };

  const handleSubmitIO = () => {
    toast.success("Problem Created Successfully");
    setShowIODialog(false);
		router.push(`/problems/${id}`);
  };

  return (
    <main className="p-4">
      <InputForm onProceed={handleProceed} isDisable={isDisable} />
      <Dialog  open={showIODialog} onOpenChange={setShowIODialog}>
        <DialogContent 
            onInteractOutside={(e)=> e.preventDefault()}
            className="min-w-3/4 !max-w-fit">
          <DialogHeader>
            <DialogTitle>Input & Expected Output : {cnt} for id = {id} </DialogTitle>
          </DialogHeader>
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <IOForm onAdd={handleAddIOPair} onSubmit={handleSubmitIO} cnt={cnt} id={id as string}/>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </DialogContent>
      </Dialog>
    </main>
  );
}