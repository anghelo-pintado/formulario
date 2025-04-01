export interface Candidate {
    id: number;
    name: string;
}

export type TemplateType = 'Invitacion' | 'Recordatorio' | 'Personalizado';

export type ChannelType = 'Sms' | 'Correo electronico' | 'Whatsapp';