import { useState, useEffect } from "react";
import ErrorText from "../text/ErrorText";

interface Props {
    errors: any | undefined;
}

interface ErrorInfo {
    field: string;
    message: string;
}

export default function ShowFormErrors({ errors }: Props) {
    const [errorInfos, setErrorInfos] = useState<ErrorInfo[]>([]);
    
    useEffect(() => {
        if (errors) {
            const errorDetails = getAllErrorDetails(errors);
            setErrorInfos(errorDetails);
        } else {
            setErrorInfos([]);
        }
    }, [errors]);
    
    const getAllErrorDetails = (errObj: any, parentField: string = '') => {
        const errorDetails: ErrorInfo[] = [];
        
        const extractErrors = (obj: any, fieldPath: string = '') => {
            if (!obj) return;
            
            Object.entries(obj).forEach(([key, value]: [string, any]) => {
                const currentPath = fieldPath ? `${fieldPath}.${key}` : key;
                
                if (value?.message) {
                    // Format the field name for display (convert camelCase to Title Case)
                    const formattedField = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase());
                    
                    errorDetails.push({
                        field: formattedField,
                        message: value.message
                    });
                } else if (typeof value === 'object') {
                    extractErrors(value, currentPath);
                }
            });
        };
        
        extractErrors(errObj);
        return errorDetails;
    };
    
    return (
        <div className="form-errors-container">
            {errorInfos.map((errorInfo, index) => (
                <ErrorText 
                    key={index} 
                    text={`${errorInfo.field}: ${errorInfo.message}`} 
                />
            ))}
        </div>
    );
}