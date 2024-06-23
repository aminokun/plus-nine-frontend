import { CreateObjective } from '@/components/CreateObjective'
import ObjectiveCard from '@/components/ObjectiveCard'
import { useState } from 'react';
import { Button } from "@/components/ui/button"


const Quest = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleOpen = async () => {
        setIsEditModalOpen(true);
    };
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <ObjectiveCard />
                <CreateObjective
                    className='mt-2'
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />
                <Button variant="outline" onClick={handleOpen} >Add Objective</Button>
            </div>
        </>
    )
}

export default Quest