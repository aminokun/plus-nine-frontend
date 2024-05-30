import { ModeToggle } from '../components/mode-toggle'
import { navigation } from '../constants/navigation'
import MenuSvg from '@/assets/MenuSvg'
import { useState } from 'react'
import { Button } from './ui/button'

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false)
    const toggleNav = () => {
        setNavOpen(!navOpen)
    }

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg opacity-95 border-b border-blue">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <a href='/'>
                        <div className="flex items-center flex-shrink-0">
                            <img src="src\assets\p9_light.svg" alt="logo" className="hidden dark:block w-16 h-16 mr-2" />
                            <img src="src\assets\p9_dark.svg" alt="logo" className="dark:hidden block w-16 h-16 mr-2" />
                        </div>
                    </a>
                    <ul className="hidden lg:flex ml-14 space-x-12 font-medium text-md">
                        < div className="block lg:hidden" >
                            <ModeToggle />
                        </div >
                        {navigation.map((item, index) => (
                            <li
                                key={index}
                                className={`${item.mobile ? "hidden" : "block"}`}>
                                <a
                                    href={item.url}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-2 items-center">
                        <a
                            href='/login'
                            className='py-[8px] px-[24px] border-2 rounded-md font-medium text-md'
                        >
                            Login
                        </a>

                        <a
                            href='/register'
                            className='text-white font-medium text-md bg-gradient-to-r from-blue-500 to-blue-800 py-[8px] px-5 rounded-md'
                        >
                            Register
                        </a>
                        <div className="hidden lg:block">
                            <ModeToggle />
                        </div>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <Button
                            className='ml-auto lg:hidden'
                            onClick={toggleNav}
                        >
                            <MenuSvg openNavigation={navOpen} />
                        </Button>
                    </div>
                </div>
                {navOpen && (
                    <div className="fixed font-semibold text-lg right-0 top-[89px] z-50 bg-slate-950 backdrop-blur-lg w-full p-12 flex flex-col justify-center items-center lg:hidden border-b border-blue">
                        <ul className="">
                            {navigation.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex py-4 px-3 border-b border-blue">
                                    <a
                                        href={item.url}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
