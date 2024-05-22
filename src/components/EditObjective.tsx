import { useEffect, useState } from "react"
import axios from "axios"
import { Icons } from "@/components/icons"
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IObjectiveItem } from "@/types/objective.type"


export function EditObjective({ className = "", id = "", isOpen, onClose, onUpdate }: { className?: string; id: string; isOpen: boolean; onClose: () => void; onUpdate: () => void; }) {
    const [progress, setProgress] = useState(0)
    const [currentAmount, setCurrentAmount] = useState(0)
    const [objectiveName, setObjectiveName] = useState("")
    const [objectiveId, setObjectiveId] = useState(id)
    const [amountToComplete, setAmountToComplete] = useState(100)
    const { toast } = useToast()
    const [objective, setObjective] = useState<IObjectiveItem>()

    const getObjective = async () => {
        try {
            const response = await axios.get(`https://asp.aminokun.com/api/objective/${id}`);
            console.log(response.data);
            const objective = response.data
            setObjective(objective)
            return objective
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        if (currentAmount > amountToComplete) {
            return toast({
                title: "Uh oh! Something went wrong",
                description: "The current amount cannot be larger than the total!",
                variant: "destructive"
            });
        }
        try {

            const response = await axios.delete(`https://asp.aminokun.com/api/objective/${objectiveId}`);
            console.log(response.data);
            onClose();
            onUpdate();
            return toast({
                description: "Item has been deleted succesfully",
            });

        } catch (error) {
            console.error(error);
        }
    };

    const handleChanges = async () => {
        if (currentAmount > amountToComplete) {
            return toast({
                title: "Uh oh! Something went wrong",
                description: "The current amount cannot be larger than the total!",
                variant: "destructive"
            });
        }
        try {
            const completed = Completed();

            const data = {
                objectiveId,
                objectiveName,
                currentAmount,
                amountToComplete,
                progress,
                completed
            };

            const response = await axios.put('https://asp.aminokun.com/api/objective', data);
            console.log(response.data);
            onClose();
            onUpdate();
            return toast({
                description: "Success, Item has been updated",
            })
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
        if (id) {
            getObjective();
        }
    }, [id]);

    useEffect(() => {
        if (objective) {
            setObjectiveId(objective.objectiveId)
            setObjectiveName(objective.objectiveName);
            setCurrentAmount(objective.currentAmount);
            setAmountToComplete(objective.amountToComplete);
            setProgress((objective.currentAmount / objective.amountToComplete) * 100);
        }
    }, [objective]);

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
                                <DialogTitle>Edit Objective</DialogTitle>
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
                                        value={objectiveName}
                                        placeholder={objective?.objectiveName}
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
                                        type="number"
                                        value={currentAmount.toString()}
                                        onChange={e => setCurrentAmount(parseInt(e.target.value, 10))}
                                        className="col-span-2"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="currentAmount" className="text-right">
                                        Amount to Complete
                                    </Label>
                                    <Input
                                        id="amountToComplete"
                                        type="number"
                                        value={amountToComplete.toString()}
                                        onChange={e => setAmountToComplete(parseInt(e.target.value, 10))}
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
                            <DialogFooter >
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Icons.trash className="mt-2 h-6 w-6" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently
                                                delete this objective.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Button variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={handleChanges}>
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Tooltip>
            </TooltipProvider>
        </div >
    )
}
