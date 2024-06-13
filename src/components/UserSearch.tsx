import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axiosInstance from '@/utils/axiosInstance';

interface User {
    id: string;
    userName: string;
}

const UserSearch: React.FC = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<User[]>([]);

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get<User[]>(`/friend/search?username=${searchTerm}`);
            setSearchResults(response.data);
            setValue("");
            setSearchTerm("");
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleSendFriendRequest = async (id: string) => {
        try {
            await axiosInstance.post(`/friend/request?receiverId=${id}`);
            console.log('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? searchResults.find((user) => user.id === value)?.userName
                        : "Select user..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search users..."
                        value={searchTerm}
                        onValueChange={(value) => setSearchTerm(value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {searchResults.length === 0 ? "No user found." : null}
                        </CommandEmpty>
                        <CommandGroup>
                            {searchResults.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    value={user.id}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === user.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {user.userName}
                                        </div>
                                        <Button
                                            variant="link"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSendFriendRequest(user.id);
                                            }}
                                        >
                                            Send Friend Request
                                        </Button>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default UserSearch;