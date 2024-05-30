import { CreateObjective } from '@/components/CreateObjective'
import ObjectiveCard from '@/components/ObjectiveCard'

const Quest = () => {
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <ObjectiveCard />
                <CreateObjective className='mt-2' />
            </div>
        </>
    )
}

export default Quest