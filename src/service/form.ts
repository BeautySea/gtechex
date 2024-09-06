/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const FormHandler = (event: any, fieldsArray: Readonly<string[]>, number = false) => {
    event?.preventDefault();
    const obj: { [key: string]: any } = {};
    for (let i = 0; i < fieldsArray?.length; i++) {
        try {
            const target = event?.target[fieldsArray[i]]
            const type = target?.attributes?.type?.value
            const value = type === 'checkbox' ? target?.checked : target?.value;
            if (value || type === 'checkbox') {
                obj[fieldsArray[i]] = number && !isNaN(value) ? Number(value) : value;
            }
        } catch (e) { }
    }
    return obj;
}