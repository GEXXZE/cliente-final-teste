import { Servico } from "@/types/servico";

export interface FormattedServiceData {
    id: number;
    name: string;
    profileImage: string;
    services: Servico[] | any[]; 
    disponibilidade?: any[];
    profissionais?: any[];
    isAutonomous?: boolean;
    isEmpresa?: boolean;
}
