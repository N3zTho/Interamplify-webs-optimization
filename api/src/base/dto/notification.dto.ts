export class NotificationDto {
    title: string;
    text: string;
    to: Array<number>;
    store: boolean;
    link?: string;
    type: string;
    btnText?: string;
}
