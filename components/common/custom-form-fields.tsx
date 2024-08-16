import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormFieldContextProvider, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useController, useFieldArray, useFormContext } from "react-hook-form";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Check, ChevronDown, ChevronsUpDown, PlusCircle, Search, Trash, UploadCloud, User } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { debounce } from 'lodash';
import { createClient } from "@/lib/supabase/client";

type CommonProps = {
    name: string,
    label?: string,
    description?: string,
    disabled?: boolean,
    showError?: boolean,
}

export type CommonObjectProps = {
    label: string,
    value: string
}

type CustomFieldWrapperProps = CommonProps & {
    className?: string,
    children?: React.ReactNode
}

type TextInputProps = CommonProps & {
    icon?: React.ElementType,
    placeHolder?: string
}
type NumberInputProps = CommonProps & {
    placeHolder?: string,
    min?: number,
    max?: number
}

type SliderRangeInputProps = CommonProps & {
    max?: number,
}

type CheckListInputProps = CommonProps & {
    list: string[]
}

type SelectInputProps = CommonProps & {
    list: CommonObjectProps[],
    placeHolder?: string,
    defaultvalue?: string
}

type ImageInputProps = CommonProps & {
}

type ImageListInputProps = CommonProps & {

}

type ComboInputProps = CommonProps & {
    list: {
        id: string,
        label: string
    }[],
    placeHolder?: string,
    searchPlaceHolder?: string,
    emptyText?: string,
    isLoading?: boolean,
}

type TextareaInputProps = CommonProps & {
    placeHolder?: string,
    cols?: number,
    rows?: number
}

type RadioGroupInputProps = CommonProps & {
    options: string[],
    defaultValue?: string,
}

type DateInputProps = CommonProps & {}

type TimeInputProps = CommonProps & {}

type SwitchInputProps = CommonProps & {}

type SelectUserInputProps = CommonProps & {}

const CustomFieldWrapper = (props:CustomFieldWrapperProps) => {
    const {name, label, className, description, showError = false, children } = props;
    return (
        <FormFieldContextProvider name={name}>
            <FormItem className={cn(className)}>
                {(label || description) &&(
                    <div>
                        {label && (<FormLabel className="text-sm font-normal text-secondary-foreground"> {label} </FormLabel>)}
                        {description && (<FormDescription> {description} </FormDescription>)}
                    </div>
                )}
                {children}
                {showError && (<FormMessage />)}
            </FormItem>
        </FormFieldContextProvider>
    )
};

export const TextInput = (props: TextInputProps) => {
    const { icon, name,  label,  disabled=false, description,  showError,  placeHolder } = props;
    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});
    const IconComponent = icon;

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <div className="relative space-y-0 z-0">
                <FormControl>
                    <Input {...field} placeholder={placeHolder} disabled={disabled} className={cn(IconComponent && "pl-8")}/>
                </FormControl>
                {IconComponent && (
                    <IconComponent 
                        className={cn("w-5 h-5 text-muted-foreground space-y-1", 
                                    "absolute top-1/2 left-1.5 -translate-y-1/2")} 
                    />
                )}
            </div>
        </CustomFieldWrapper>
    )
};

export const SliderRangeInput = (props: SliderRangeInputProps) => {
    const {
        max = 10000,
        name, 
        label, 
        disabled=false,
        description, 
        showError,
    } = props;

    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <div className="px-2 h-10 flex_center rounded-sm border">
                <FormControl>
                    <Slider
                        value={field.value} 
                        disabled={disabled}
                        max={max} 
                        step={1} 
                        minStepsBetweenThumbs={100}
                        onValueChange={field.onChange}
                    />
                </FormControl>
            </div>
        </CustomFieldWrapper>
    )
};

export const CheckListInput = (props: CheckListInputProps) => {
    const {
        list,
        name, 
        label, 
        disabled=false,
        description, 
        showError,
    } = props;

    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <div className="flex flex-wrap gap-2 justify-start">
                {list.map((item, _id) => (
                    <CustomFieldWrapper 
                        key={_id} 
                        name={name} 
                        className="group flex_center px-2 py-1.5 rounded-full bg-secondary/80 space-y-0 border border-transparent has-[:checked]:border-border cursor-pointer transition-all"
                    >
                        <FormControl>
                            <Checkbox
                                id={item}
                                className="hidden"
                                disabled={disabled}
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked: boolean) => ( checked ? 
                                    field.onChange([...field.value, item]) :
                                    field.onChange( field.value.filter( (value:any) => value !== item))
                                )}
                            />
                        </FormControl>
                        <Label htmlFor={item} className="text-xs font-normal text-secondary-foreground capitalize cursor-pointer">
                            {item}
                        </Label>
                        <Check className="size-3 hidden ml-1.5 group-has-[:checked]:block"/>
                    </CustomFieldWrapper>
                ))}
            </div>
        </CustomFieldWrapper>
    )
};

export const SelectInput = (props: SelectInputProps) => {
    const { list, name,  label,  disabled=false, description, showError, placeHolder, defaultvalue = '' } = props;

    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    useEffect(() => {
        if(field.value === '') field.onChange(defaultvalue);
    }, [field])

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <Select onValueChange={(value) => field.onChange(value)} defaultValue={defaultvalue} value={field.value} disabled={disabled}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeHolder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {list.map((item, _id)=>(
                        <SelectItem key={_id} value={item.value}>{item.label}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
        </CustomFieldWrapper>
    )
};

export const ComboInput = (props: ComboInputProps) => {
    const {
        list,
        isLoading=false,
        name, 
        label, 
        disabled=false,
        description, 
        showError, 
        emptyText="No Data found.",
        placeHolder="Select",
        searchPlaceHolder="Search..."
    } = props;

    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeHolder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value="something">something</SelectItem>
                    <div className="something">Create An Organisation</div>
                </SelectContent>
            </Select>
        </CustomFieldWrapper>
    )
};

export const ImageInput = (props: ImageInputProps) => {
    const {
        name, 
        label, 
        disabled,
        description, 
        showError,
    } = props;

    const wrapperProps = {name, label, description, showError};
    const { field: { value, onChange, ref } } = useController({name});
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <div className="w-full max-w-screen-sm flex gap-3 items-center justify-start">
                <FormControl>
                    <input
                        type='file'
                        className="hidden"
                        ref={(e) => inputRef.current = e }
                        onChange={({ target: { files } }) =>onChange(files && files[0] ? files[0] : null)}
                    />
                </FormControl>
                <div 
                    onClick={()=>inputRef.current?.click()}
                    className={cn("relative overflow-hidden flex_center w-16 h-16 rounded-sm border border-dashed cursor-pointer",
                        !value? "bg-muted":""
                    )}>
                    {!value? 
                        (<UploadCloud className="text-muted-foreground" />) :
                        (<Image 
                            src={typeof value === 'string' ? value : URL.createObjectURL(value)} 
                            alt={label ?? "Avatar"} 
                            fill={true}
                            unoptimized
                        />)
                    }
                </div>
                <p className="text-base font-muted">Upload Image</p>
            </div>
        </CustomFieldWrapper>
    )
};

export const TextareaInput = (props: TextareaInputProps) => {
    const {
        cols=10,
        rows=7,
        name, 
        label, 
        disabled=false,
        description, 
        showError, 
        placeHolder="Text Here"
    } = props;

    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <FormControl>
                <Textarea
                    disabled={disabled}
                    placeholder={placeHolder}
                    cols={cols}
                    rows={rows}
                    className="resize-none"
                    {...field}
                />
            </FormControl>
        </CustomFieldWrapper>
    )
};

export const RadioGroupInput = (props: RadioGroupInputProps) => {
    const { name,  label,  options, disabled=false, description,  showError, defaultValue = "" } = props;

    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    useEffect(() => {
        if(field.value === "") field.value = defaultValue;
    }, [field]);

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={disabled}
                  className="w-full space-y-0 grid grid-cols-[repeat(3_,112px)] place-content-start gap-1.5"
                >  
                    {options.map((item, _id) => (
                        <FormItem key={_id} className="relative flex_center space-y-0 w-28 aspect-video rounded-sm border has-[:checked]:bg-muted/20">
                            <FormControl>
                                <RadioGroupItem value={item} className="absolute top-1 right-1 border-muted-foreground" />
                            </FormControl>
                            <FormLabel className="font-normal capitalize cursor-pointer">
                                {item}
                            </FormLabel>
                        </FormItem>
                    ))}
                </RadioGroup>
            </FormControl>
        </CustomFieldWrapper>
    )
};

export const DateInput = (props: DateInputProps) => {
    const { name,  label,  disabled=false, description,  showError } = props;
    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper {...wrapperProps}>
        <div className="relative space-y-0 z-0">
            <FormControl>
                <Input {...field} onChange={(e) => field.onChange(String(e.target.value))} disabled={disabled} type="date"/>
            </FormControl>
        </div>
        </CustomFieldWrapper>
    )
};

export const NumberInput = (props: NumberInputProps) => {
    const {
        min=0,
        max=250,
        name, 
        label, 
        disabled=false,
        description, 
        showError, 
        placeHolder
    } = props;

    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <FormControl>
                <Input {...field} onChange={(e) => field.onChange(Number(e.target.value))} type="number" placeholder={placeHolder} disabled={disabled} min={min} max={max}/>
            </FormControl>
        </CustomFieldWrapper>
    )
};

export const ImageListInput = (props: ImageListInputProps) => {
    const {
        name, 
        label, 
        disabled,
        description, 
        showError,
    } = props;

    const wrapperProps = {name, label, description, showError};
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ 
        control,
        name 
    })

    return (
        <CustomFieldWrapper {...wrapperProps}>
            <div className="w-full p-3 rounded-lg border flex gap-2 h-60">
                <div className="flex-1 flex_center h-full rounded-lg border border-dashed bg-muted/50 hover:bg-muted cursor-pointer">
                    <PlusCircle className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1 h-full flex flex-col gap-1">
                    {fields.map((field, index) => (
                        <div key={index} className="w-full h-14 flex rounded-sm border p-1 gap-1">
                            <div className="h-full aspect-video bg-muted"></div>
                            <div className="h-full flex-1"></div>
                            <Button variant="destructive" className="h-full aspect-square p-0">
                                <Trash className="size-5" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </CustomFieldWrapper>
    )
};

export const TimeInput = (props: TimeInputProps) => {
    const { name,  label,  disabled=false, description,  showError } = props;
    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper {...wrapperProps}>
        <div className="relative space-y-0 z-0">
            <FormControl>
                <Input {...field} disabled={disabled} type="time"/>
            </FormControl>
        </div>
        </CustomFieldWrapper>
    )
};

export const SwitchInput = (props: SwitchInputProps) => {
    const { name, label, disabled=false, description, showError } = props;
    const wrapperProps = {name, label, description, showError};
    const { field } = useController({name});

    return (
        <CustomFieldWrapper { ...wrapperProps} className="w-full flex justify-between items-center px-4 py-2 rounded-md border">
            <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
            </FormControl>
        </CustomFieldWrapper>
    )
        
};


export const SelectUserInput = (props: SelectUserInputProps) => {
    const { name, label, description, showError, disabled = false } = props;
    const wrapperProps = { name, label, description, showError };
    const { field } = useController({ name });
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<{ id: string; full_name: string; email: string; }[]>([]);
    const [selectedUser, setSelectedUser] = useState<{ id: string; full_name: string; email: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const supabase = createClient();

    const fetchUsers = useCallback(
        debounce(async (query) => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('id, full_name, email')
                .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`);
            
            if (error) {
                console.error(error);
                setUsers([]);
            } else {
                setUsers(data);
            }
            setIsLoading(false);
        }, 300), []
    );

    useEffect(() => {
        if (search.length > 2) {
            fetchUsers(search);
        } else {
            setUsers([]);
        }
    }, [search, fetchUsers]);

    useEffect(() => {
        if (isDropdownOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isDropdownOpen]);

    const handleSelect = (value: string) => {
        const selected = users.find(user => user.id === value);
        if (selected) {
            field.onChange(value);
            setSelectedUser(selected);
            setSearch('');
            setIsDropdownOpen(false);
        }
    };

    return (
        <div {...wrapperProps} className="relative font-sans">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    className={`w-full flex justify-between items-center px-4 py-2.5 border rounded-lg shadow-sm transition-all duration-200 ease-in-out
                        ${!field.value ? 'text-gray-500' : 'text-black'}
                        ${disabled ? 'cursor-not-allowed bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                    disabled={disabled}
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                >
                    <span className="flex items-center text-black">
                        <User className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-base">{selectedUser ? selectedUser.full_name : "Select User"}</span>
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            ref={searchInputRef}
                            className="w-full pl-10 pr-4 py-2.5 border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary-foreground transition-all duration-200 ease-in-out"
                        />
                    </div>
                    <ul className="max-h-60 overflow-auto py-1">
                        {isLoading && <li className="px-4 py-2 text-gray-500">Loading...</li>}
                        {!isLoading && users.length === 0 && <li className="px-4 py-2 text-gray-500">No Users Found</li>}
                        {!isLoading && users.length > 0 && (
                            <>
                                {users.map(user => (
                                    <li
                                        key={user.id}
                                        className={`px-4 py-2 cursor-pointer flex items-center justify-between
                                            ${user.id === field.value ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                                        onClick={() => handleSelect(user.id)}
                                    >
                                        <div>
                                            <p className="font-medium">{user.full_name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        {user.id === field.value && <Check className="w-5 h-5 text-blue-500" />}
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
            )}
            {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
            {showError && (
                <p className="mt-1 text-sm text-red-600">{showError}</p>
            )}
        </div>
    );
};
export const RadioSelectInput = () => {};

export const SliderInput = () => {};