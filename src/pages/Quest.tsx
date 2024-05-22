import { CreateObjective } from '@/components/CreateObjective'
import ObjectiveCard from '../components/ObjectiveCard'
import Header from "@/components/Header"

const Quest = () => {
    return (
        <>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
            </div>
            <div className='flex-col justify-center items-center'>
                <ObjectiveCard />
                <CreateObjective className='mt-2'
                />
            </div>
        </>
    )
}

export default Quest