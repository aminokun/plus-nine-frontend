import React from 'react'

const Success = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide mt-20">
                Thankyou for becoming a
                <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
                    {" "}
                    premium member
                </span>
            </h1>
            <img src="https://images.squarespace-cdn.com/content/v1/62320b187920cc3ec38ece5f/e9de0e2e-e28a-444d-b833-9f06f5cfd3b3/sl1.jpg" alt="" className="mt-20 max-w-[30rem] h-auto" />
        </div>
    )
}

export default Success