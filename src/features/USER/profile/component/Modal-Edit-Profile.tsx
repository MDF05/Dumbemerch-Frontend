import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react";
import { ModalEditProfileProps } from "../types/modal-edit-profile-props";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "./../../../../stores/stores";
import { EditProfileSchema, editProfileSchema } from "./../../../../schemas/edit-profile-schema";
import { putProfileUpdate } from "./../../../../stores/profile/async-profile";
import { ProfileResponseDTO } from "./../../../../DTO/profile-DTO";
import { useEffect, useState } from "react";

export default function ModalEditProfile({ isOpen, onClose, profile, setProfile }: ModalEditProfileProps): React.ReactNode {
  const { register, handleSubmit, reset, watch } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: profile?.content.profile.name,
      email: profile?.content.profile.user?.email,
      gender: profile?.content.profile.gender || "",
      phone: profile?.content.profile.phone || "",
      address: profile?.content.profile.address || "",
    },
  });

  const watchImages = watch("image");
  const dispatch = useAppDispatch();
  const [imageURL, setImageURL] = useState<string>();

  useEffect(() => {
    if (watchImages) {
      setImageURL(URL.createObjectURL(watchImages[0]));
    }
  }, [watchImages]);

  async function onSubmitEditProfile(event: EditProfileSchema) {
    try {
      const formData = new FormData();
      formData.append("name", event.name);
      formData.append("email", event.email);
      formData.append("gender", event.gender);
      formData.append("phone", event.phone);
      formData.append("address", event.address);

      if (event.image) {
        formData.append("image", event.image[0]);
      }

      const profileUpdate: ProfileResponseDTO = await dispatch(putProfileUpdate({ profile: formData, profileId: profile.content.profile.id })).unwrap();
      if (profileUpdate.succes) {
        setProfile(profileUpdate);
        onClose();
      }
    } catch (err) { return err}
  }

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit((event) => onSubmitEditProfile(event))}>
          <ModalHeader>Edit Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} color={"brand.baseColor"} gap={"5px"} display={"grid"} as={"form"}>
            <HStack display={"grid"} gridTemplateColumns={"50% 50%"}>
              <VStack width={"100%"}>
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
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input type={"file"} {...register("image")} />
                </FormControl>
              </VStack>
              <VStack height={"100%"} justifyContent={"end"}>
                <Image src={imageURL ?? ""}></Image>
              </VStack>
            </HStack>
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
