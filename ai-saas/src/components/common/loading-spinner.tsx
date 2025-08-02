import { Loader2 } from "lucide-react";

const LoadingSpinner= () => {
    return (
        <div className="flex items-center">
            <Loader2 className="animate-spin mr-2" />
            <span>Processing ...</span>
        </div>
    );
}

export default LoadingSpinner;