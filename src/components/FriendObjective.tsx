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
    TooltipProvider,
} from "@/components/ui/tooltip"
import { IObjectiveDataResponse } from '@/types/objective.type';


export function FriendObjective({ className = "", isOpen, onClose, friendObjective, friendName }: { className?: string; isOpen: boolean; onClose: () => void; friendObjective: IObjectiveDataResponse[]; friendName: string; }) {
    return (
        <div className={`${className}`}>
            <TooltipProvider>
                <Tooltip delayDuration={300}>
                    <Dialog open={isOpen} onOpenChange={onClose}>
                        <DialogContent className="2xs:max-w-[370px] xs:max-w-[555px] flex flex-col items-center justify-center">
                            <DialogHeader>
                                <DialogTitle className="flex flex-row" >These are &nbsp;
                                    <div className="text-orange-200">
                                        {friendName}'s &nbsp;
                                    </div>
                                    objectives</DialogTitle>
                                {/* <DialogDescription>

                                </DialogDescription> */}
                            </DialogHeader>
                            <div className="container flex items-center justify-center">
                                <div className='relative rounded-sm border border-opacity-30 h-[40rem] min-w-[23rem] w-[25rem] border-solo bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#27486B] from-20% via-[#1F3044] via-60% to-[#121A22]' >
                                    <div className='absolute h-[1.5rem] w-[90%] bg-gradient-to-b from-solo from-1% blur-md left-5 top-[3rem]  ' />
                                    <div className='absolute h-[1.5rem] w-[90%] bg-gradient-to-t from-solo from-1% blur-md left-5 top-[4.9rem]  ' />
                                    <div className="text-primary-foreground pt-[3rem] px-[2rem]">
                                        <div className="relative">
                                            <div className="relative flex flex-col items-center justify-center">
                                                <h3 className='flex justify-center w-full text-shadow-xl dark:text-white shadow-black'>
                                                    <div className="border-2 dark:border-white mt-1 mr-4 pl-[11px] rounded-full text-lg w-[2rem] h-[2rem] text-red-200">!</div>
                                                    Quest Info
                                                </h3>
                                                <p className="mt-[2rem] uppercase font-medium text-sm text-shadow-lg dark:text-white shadow-black">
                                                    Daily Quest - Train to become<br /> a formidable combatant
                                                </p>
                                                <div className="mt-[2rem] font-bold text-green-500 text-shadow-lg shadow-black text-lg">
                                                    Goals
                                                </div>
                                                <ul className="overflow-hidden container overflow-y-auto scroll-smooth rounded-sm border-y-2 border-opacity-30 max-h-[14.5rem] min-h-[10.5rem] border-solo">
                                                    {friendObjective.map((item,) => (
                                                        <li
                                                            key={item.objectiveId}
                                                            className="text-shadow-xl dark:text-white  shadow-black xs:text-md 2xs:text-sm font-normal uppercase"
                                                        >
                                                            <div className="mt-4 flex justify-between">
                                                                <div>
                                                                    - {item.objectiveName}
                                                                </div>
                                                                <div>
                                                                    [{item.currentAmount}{`/`}{item.amountToComplete}]
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <p className="absolute 2xs:left-[2.5rem] xs:left-[3.5rem] top-[27rem] dark:text-white text-shadow-xl shadow-black text-sm uppercase"><span className='text-red-500 font-bold'>CAUTION!</span>- if the daily quest <br />remains incomplete, penalties,<br /> will be given accordingly</p>
                                            <svg className='absolute 2xs:left-[8rem] xs:left-[9rem] top-[32rem]' width={50} height={50} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </DialogContent>
                    </Dialog>
                </Tooltip>
            </TooltipProvider>
        </div >
    )
}
