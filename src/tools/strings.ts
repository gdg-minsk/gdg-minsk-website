export const isNotEmpty = (value: string): boolean => {
    return value && value.trim().length > 0;
};

export const getCompanyInfo = (jobTitle: string, companyName: string): string => {
    if (!jobTitle && !companyName) {
        return null;
    }

    if (jobTitle && companyName) {
        return `${jobTitle} @ ${companyName}`;
    }

    return jobTitle || companyName;
};
