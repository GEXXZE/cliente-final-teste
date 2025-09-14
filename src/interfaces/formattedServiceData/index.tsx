import { Servico } from "@/types/servico";

export interface FormattedServiceData {
    id: number;
    name: string;
    profileImage: string;
    services: Servico[] | any[]; 
    isEmpresa?: boolean;
    disponibilidade?: any[];
}
