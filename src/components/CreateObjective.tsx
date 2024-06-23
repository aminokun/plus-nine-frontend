import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "./ui/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import axiosInstance from "@/utils/axiosInstance"


export function CreateObjective({ className = "", isOpen, onClose }: { className?: string; isOpen: boolean; onClose: () => void; }) {
    const [progress, setProgress] = useState(0)
    const [currentAmount, setCurrentAmount] = useState(0)
    const [objectiveName, setObjectiveName] = useState("")
    const [amountToComplete, setAmountToComplete] = useState(100)
    const { toast } = useToast()

    const handleSubmit = async () => {
        if (currentAmount > amountToComplete) {
            return toast({
                title: "Uh oh! Something went wrong",
                description: "The current amount cannot be larger than the total!",
                variant: "destructive"
            });
        }
        if (objectiveName == "") {
            return toast({
                title: "Uh oh! Something went wrong",
                description: "The name of the objective can not be empty",
                variant: "destructive"
            });
        }
        try {
            const completed = Completed();

            const data = {
                objectiveName,
                currentAmount,
                amountToComplete,
                progress,
                completed
            };

            const response = await axiosInstance.post('/objective', data);
            console.log(response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }

    };


    const Completed = () => {
        return currentAmount == amountToComplete
    }

    const progressCalc = (currentAmount: number, amountToComplete: number) => {
        if (currentAmount < 0 || amountToComplete < 0) {
            return toast({
                title: "Uh oh! Something went wrong",
                description: "Values can not be negative",
                variant: "destructive"
            })
        }
        const progressPercentage = (currentAmount / amountToComplete) * 100;
        const timer = setTimeout(() => setProgress(progressPercentage), 500)
        return () => clearTimeout(timer)
    }


    useEffect(() => {
        progressCalc(currentAmount, amountToComplete);
    }, [currentAmount, amountToComplete]);

    return (
        <div className={`${className}`}>
            <TooltipProvider>
                <Tooltip delayDuration={300}>
                    <Dialog open={isOpen} onOpenChange={onClose}>
                        <DialogContent className="2xs:max-w-[370px] xs:max-w-[555px]">
                            <DialogHeader>
                                <DialogTitle>Add Objective</DialogTitle>
                                <DialogDescription>
                                    Add objectives to your daily quest here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="ObjectiveName" className="text-right">
                                        Objective Name
                                    </Label>
                                    <Input
                                        id="ObjectiveName"
                                        defaultValue=""
                                        placeholder="Example: Push ups"
                                        onChange={e => setObjectiveName(e.target.value)}
                                        className="col-span-2"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="currentAmount" className="text-right">
                                        Current Amount
                                    </Label>
                                    <Input
                                        id="currentAmount"
                                        defaultValue="0"
                                        type="number"
                                        onChange={e => setCurrentAmount(parseInt(e.target.value))}
                                        className="col-span-2"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="currentAmount" className="text-right">
                                        Amount to Complete
                                    </Label>
                                    <Input
                                        id="currentAmount"
                                        defaultValue="100"
                                        type="number"
                                        onChange={e => setAmountToComplete(parseInt(e.target.value))}
                                        className="col-span-2"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="currentAmount" className="text-right">
                                        Progress
                                    </Label>
                                    <Progress value={progress} className="w-[100%] col-span-2" />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="currentAmount" className="text-right">
                                        Completed
                                    </Label>
                                    <TooltipTrigger
                                        asChild
                                    >
                                        <Checkbox
                                            checked={Completed()}
                                            disabled
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>It is checked when the objective is completed</p>
                                    </TooltipContent>

                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Create Objective
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Tooltip>
            </TooltipProvider>
        </div >
    )
}
