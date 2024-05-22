import { Button } from "@/components/ui/button"
import { useLocation } from 'react-router-dom'
import { ModeToggle } from '../components/mode-toggle'
import { useState } from "react"
import { navigation } from '../constants/navigation'
import MenuSvg from "../assets/MenuSvg"
import { HamburgerMenu } from './HamburgerMenu'

const Header = () => {
    const pathname = useLocation()

    const [openNavigation, setOpenNavigation] = useState(false)
    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false)
        } else {
            setOpenNavigation(true)
        }
    }
    const handleClick = () => {
        if (!openNavigation) return;

        setOpenNavigation(false)
    }


    return (
        <div className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm 
        ${openNavigation
                ? 'bg-n-8'
                : 'bg-n-8/90 backdrop-blur-sm'
            }`
        }>
            <div className="flex items-center px-5 h-16 lg:px-7.5 xl:px-10 max-lg:py-4">
                <a className='block w-[12rem] xl:mr-8' href='/'>
                    <img src="src\assets\p9_light.svg" alt="logo" className="hidden dark:lg:block w-16 ml-10" />
                    <img src="src\assets\p9_dark.svg" alt="logo" className="dark:hidden lg:block w-16 ml-10" />
                </a>
                <nav className={`${openNavigation ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
                    <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
                        <div className="block lg:hidden">
                            <ModeToggle />
                        </div>
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                onClick={handleClick}
                                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 
                                ${item.onlyMobile
                                        ? 'lg:hidden'
                                        : ''} 
                                    px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold 
                                ${item.url === pathname.hash
                                        ? 'z-2 lg:text-n-1'
                                        : 'lg:text-n-1/50'}
                                    lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                            >
                                {item.title}

                            </a>
                        ))}
                    </div>
                    <HamburgerMenu />
                </nav>
                <a
                    href='/register'
                    className='button hidden mr-2 text-n-1/50 transition-colors hover:text-n-1 lg:block'
                >
                    <Button
                        type="button"
                    >
                        Register
                    </Button>
                </a>
                <a
                    href='/login'
                    className='button hidden mr-2 text-n-1/50 transition-colors hover:text-n-1 lg:block'
                >
                    <Button
                        type="submit"
                    >
                        Login
                    </Button>
                </a>
                <div className="hidden lg:block">
                    <ModeToggle />
                </div>
                <Button
                    className='ml-auto lg:hidden'
                    onClick={toggleNavigation}
                >
                    <MenuSvg openNavigation={openNavigation} />
                </Button>
            </div>
        </div>
    )
}

export default Header