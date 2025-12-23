import { createContext, useContext, useState, ReactNode } from "react";
import { ProfileDialog } from "@/components/ProfileDialog";

interface ProfileDialogContextType {
  openProfile: (userId: string) => void;
  closeProfile: () => void;
}

const ProfileDialogContext = createContext<ProfileDialogContextType | undefined>(undefined);

export function ProfileDialogProvider({ children }: { children: ReactNode }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openProfile = (userId: string) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  const closeProfile = () => {
    setIsOpen(false);
    setSelectedUserId(null);
  };

  return (
    <ProfileDialogContext.Provider value={{ openProfile, closeProfile }}>
      {children}
      <ProfileDialog
        userId={selectedUserId}
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setSelectedUserId(null);
        }}
      />
    </ProfileDialogContext.Provider>
  );
}

export function useProfileDialog() {
  const context = useContext(ProfileDialogContext);
  if (!context) {
    throw new Error("useProfileDialog must be used within a ProfileDialogProvider");
  }
  return context;
}
