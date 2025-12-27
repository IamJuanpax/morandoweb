export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-10 space-y-4">
                <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                <div className="h-5 w-96 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
            </div>

            <div className="space-y-8">
                {[1, 2].map((i) => (
                    <div key={i} className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900">
                        <div className="bg-neutral-50 dark:bg-neutral-900/50 p-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4 justify-between h-24" />
                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 w-48 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
                                        <div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
                                    </div>
                                    <div className="w-20 h-6 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
