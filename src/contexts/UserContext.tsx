import React, { createContext, useContext, useState, useEffect } from "react";

type Usuario = {
  Id: number;
  Nome: string;
  Email: string;
  FotoPerfil: string;
  Papel: string;
  Slug: string;
  UrlPublica: string;
  accessToken: string;
  qrCode: string;
};

type UserContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const capitalizeName = (nome: string) => {
  return nome
    .toLowerCase()
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuarioState] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      setUsuarioState(JSON.parse(usuarioStr));
    }
  }, []);

  const setUsuario = (novoUsuario: Usuario | null) => {
    if (novoUsuario) {
      const usuarioFormatado = {
        ...novoUsuario,
        Nome: capitalizeName(novoUsuario.Nome),
        Email: novoUsuario.Email.toLowerCase(),
      };
      setUsuarioState(usuarioFormatado);
      localStorage.setItem("usuario", JSON.stringify(usuarioFormatado));
    } else {
      localStorage.removeItem("usuario");
      setUsuarioState(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuarioState(null);
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }
  return context;
}
