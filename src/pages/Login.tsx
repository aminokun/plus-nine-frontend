import { UserAuthFormLogin } from "../components/UserAuthFormLogin"


const Login = () => {

    return (
        <>
            <div className="container z-0 relative h-[800px] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 mt-20">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login to your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                            </p>
                        </div>
                        <UserAuthFormLogin />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login