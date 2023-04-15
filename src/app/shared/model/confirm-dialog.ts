export interface GenericDialogModel {
    title: string;
    subtitle: string;
    message: string;
    cancelMessage: string;
    confirmMessage: string;
    type?: string;
    showCancelMessage: boolean;
}