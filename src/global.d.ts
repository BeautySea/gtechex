/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-faq-component';
interface RequestHookType<T = any> {
    loading?: 'false' | 'true' | 'done'
    error?: boolean
    errorMessage?: string | null
    data?: T | null
}

type LoadingHook = 'false' | 'true' | 'done'
type Method = "post" | "get" | "delete" | "put" | "patch" | 'delete';


interface Google {
    accounts: {
        id: {
            initialize: (input: IdConfiguration) => void;
            prompt: (
                momentListener?: (res: PromptMomentNotification) => void
            ) => void;
            renderButton: (
                parent: HTMLElement,
                options: GsiButtonConfiguration
            ) => void;
            disableAutoSelect: () => void;
            storeCredential: (credentials: Credential, callback: () => void) => void;
            cancel: () => void;
            onGoogleLibraryLoad: () => void;
            revoke: (
                hint: string,
                callback: (done: RevocationResponse) => void
            ) => void;
        };
    };
}

interface Window {
    google?: Google
}


interface API_RESPONSE<T = any> {
    status?: boolean
    message?: string
    data?: T
}

interface DEFAULT_RESPONSE {
    error?: boolean
    errorMessage?: string
    data?: any
}


