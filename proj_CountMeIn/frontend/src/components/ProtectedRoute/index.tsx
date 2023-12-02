import { useAuthContext } from "@/contexts/auth";
import React from "react";
import { Navigate } from "react-router-dom";

export const CustomRoute = ({ 
    page, 
    isPublic = false, // Adicionando uma propriedade para indicar se a rota é pública
    redirectTo = "/" // Caminho padrão para redirecionamento
}: { 
    page: React.ComponentType, 
    isPublic?: boolean, 
    redirectTo?: string 
}): React.ReactElement => {
    const { isLogged } = useAuthContext();

    // Se a rota for pública e o usuário estiver logado, redirecione-o para o 'redirectTo'
    if (isPublic && isLogged()) {
        return <Navigate to={redirectTo} replace />;
    }

    // Se a rota for protegida e o usuário não estiver logado, redirecione-o para o login
    if (!isPublic && !isLogged()) {
        return <Navigate to="/login" replace />;
    }

    // Renderize a página se não houver necessidade de redirecionamento
    return React.createElement(page, {});
};
