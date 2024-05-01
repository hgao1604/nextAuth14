import { signOut } from "next-auth/react";

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = async () => {
    await signOut();
  };

  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};
