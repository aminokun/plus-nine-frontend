export interface IObjectiveItem {
    objectiveName: string;
    currentAmount: number;
    amountToComplete: number;
    get progress(): number;
    completed: boolean;

}

export const objective : IObjectiveItem[] = [
    {
        objectiveName: "Pushups",
        currentAmount: 20,
        amountToComplete: 100,
        get progress() {
            return (this.currentAmount / this.amountToComplete) * 100;
        },
        completed: false,
    }
]