import { Dispatch, SetStateAction } from "react";
import { ProfileResponseDTO } from "../../../DTO/profile-DTO";

export interface ModalEditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileResponseDTO;
  setProfile: Dispatch<SetStateAction<ProfileResponseDTO | undefined>>;
}
