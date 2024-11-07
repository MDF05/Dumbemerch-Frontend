import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { ModalEditProfileProps } from "../types/modal-edit-profile-props";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "./../../../../stores/stores";
import { ProfileState } from "./../../../../stores/profile/slice.-profile";
import { EditProfileSchema, editProfileSchema } from "./../../../../schemas/edit-profile-schema";
import { putProfileUpdate } from "./../../../../stores/profile/async-profile";
import { ProfileResponseDTO } from "./../../../../DTO/profile-DTO";

export default function ModalEditProfile({ isOpen, onClose, profile, setProfile }: ModalEditProfileProps): React.ReactNode {
  const { register, handleSubmit, reset } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: profile?.content.profile.name,
      email: profile?.content.profile.user?.email,
      gender: profile?.content.profile.gender || "",
      phone: profile?.content.profile.phone || "",
      address: profile?.content.profile.address || "",
    },
  });

  const dispatch = useAppDispatch();

  async function onSubmitEditProfile(event: EditProfileSchema) {
    try {
      const profileUpdate: ProfileResponseDTO = await dispatch(putProfileUpdate({ profile: event, profileId: profile.content.profile.id })).unwrap();
      if (profileUpdate.succes) {
        setProfile(profileUpdate);
        onClose();
      }
    } catch (e) {}
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit((event) => onSubmitEditProfile(event))}>
          <ModalHeader>Edit Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} color={"brand.baseColor"} gap={"5px"} display={"grid"} as={"form"}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type={"text"} {...register("name")} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type={"email"} {...register("email")} />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input type={"number"} {...register("phone")} />
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select placeholder="Select option" {...register("gender")}>
                <option value="male">Male</option>
                <option value="female">female</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input type={"text"} {...register("address")} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type={"submit"}>
              Save
            </Button>
            <Button onClick={() => reset()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
