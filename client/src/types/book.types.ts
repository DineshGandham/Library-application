export interface BookData {
    title: string;
    author: string;
    coverImage: File | null;
}

export interface BookFormEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & {
        name: string;
        value: string;
        files?: FileList;
    };
}

export interface BookFormSubmitEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
} 