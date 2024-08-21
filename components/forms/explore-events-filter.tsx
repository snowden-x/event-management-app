import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { EVENT_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/common/custom-form-fields";
import { useForm } from "react-hook-form";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

const FormSchema = z.object({
    search: z.string(),
    categories: z.array(z.string()),
});

export type ExploreEventsFilter = z.infer<typeof FormSchema>;

export default function Component({
    className,
    onFilterApply
}: {
    className?: string;
    onFilterApply: (data: ExploreEventsFilter) => void;
}) {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const INITIAL_CATEGORY_COUNT = 5;

    const form = useForm<ExploreEventsFilter>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            search: '',
            categories: [],
        },
    });

    const { handleSubmit, watch, setValue } = form;

    const searchValue = watch('search');
    const categories = watch('categories');

    function onSubmit(data: ExploreEventsFilter) {
        onFilterApply(data);
    }

    const handleCategoryToggle = (category: string) => {
        const newCategories = categories.includes(category)
            ? categories.filter(c => c !== category)
            : [...categories, category];
        setValue('categories', newCategories);
        handleSubmit(onSubmit)();
    };

    const handleReset = () => {
        form.reset({ search: '', categories: [] });
        onFilterApply({ search: '', categories: [] });
    };

    const visibleCategories = showAllCategories 
        ? EVENT_CATEGORIES 
        : EVENT_CATEGORIES.slice(0, INITIAL_CATEGORY_COUNT);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full space-y-4", className)}>
                <div className="relative">
                    <TextInput 
                        name="search" 
                        placeHolder="Search events by name, headline, location or description" 
                        icon={Search}
                    />
                    {searchValue && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => {
                                setValue('search', '');
                                handleSubmit(onSubmit)();
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {visibleCategories.map(category => (
                            <Button
                                key={category.value}
                                type="button"
                                className="rounded-full text-xs"
                                variant={categories.includes(category.value) ? "default" : "outline"}
                                size="xs"
                                onClick={() => handleCategoryToggle(category.value)}
                            >
                                {category.label}
                            </Button>
                        ))}
                    </div>
                    {EVENT_CATEGORIES.length > INITIAL_CATEGORY_COUNT && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="text-xs"
                        >
                            {showAllCategories ? (
                                <>
                                    <ChevronUp className="h-4 w-4 mr-1" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="h-4 w-4 mr-1" />
                                    Show More
                                </>
                            )}
                        </Button>
                    )}
                </div>
                {(searchValue || categories.length > 0) && (
                    <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                        Reset All
                    </Button>
                )}
            </form>
        </Form>
    );
}