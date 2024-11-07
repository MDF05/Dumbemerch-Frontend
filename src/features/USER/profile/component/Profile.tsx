import { Box, Button, Grid, HStack, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import profileImage from "../../../../assets/image/profile.png";
import { useEffect, useState } from "react";
import ModalEditProfile from "./Modal-Edit-Profile";
import { ProfileResponseDTO } from "./../../../../DTO/profile-DTO";
import { getProfileByIdUserLogin } from "./../../../../stores/profile/async-profile";
import { useAppDispatch } from "./../../../../stores/stores";
import ProfileTransaction from "./Profile-Transaction";

export default function Profile(): React.ReactNode {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<ProfileResponseDTO>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      try {
        const state = await dispatch(getProfileByIdUserLogin()).unwrap();
        setProfile(state);
      } catch (e) {}
    })();
  }, []);

  return (
    <Grid gridTemplateColumns={"55% 45%"} padding={"100px 50px"}>
      {profile && <ModalEditProfile isOpen={isOpen} onClose={onClose} profile={profile} setProfile={setProfile}></ModalEditProfile>}
      <HStack>
        <VStack width={"100%"} alignItems={"start"} h={"100%"}>
          <Text color={"brand.active"} textAlign={"start"} mb={"20px"}>
            <b>My Profile</b>
          </Text>
          <Grid gap={"20px"} width={"100%"} h={"100%"} templateColumns={"50% 50%"}>
            <Grid width={"100%"} h={"100%"}>
              <Image src={profileImage} width={"100%"} h={"100%"}></Image>
            </Grid>
            <VStack alignItems={"start"}>
              <VStack alignItems={"start"}>
                <Text color={"brand.active"}>Name</Text>
                <Text color={"brand.baseColor"}>{profile?.content.profile.name}</Text>
              </VStack>
              <VStack alignItems={"start"}>
                <Text color={"brand.active"}>Email</Text>
                <Text color={"brand.baseColor"}>{profile?.content.profile.user?.email}</Text>
              </VStack>
              <VStack alignItems={"start"}>
                <Text color={"brand.active"}>Phone</Text>
                <Text color={"brand.baseColor"}>{profile?.content.profile.phone}</Text>
              </VStack>
              <VStack alignItems={"start"}>
                <Text color={"brand.active"}>Gender</Text>
                <Text color={"brand.baseColor"}>{profile?.content.profile.gender}</Text>
              </VStack>
              <VStack alignItems={"start"}>
                <Text color={"brand.active"}>Address</Text>
                <Text color={"brand.baseColor"}>{profile?.content.profile.address}</Text>
              </VStack>
              <Button onClick={onOpen}>edit profile</Button>
            </VStack>
          </Grid>
        </VStack>
      </HStack>
      <VStack alignItems={"start"} p={"20px"}>
        <Text color={"brand.active"} textAlign={"start"} mb={"20px"}>
          <b>My Transaction</b>
        </Text>
        {profile?.content.profile.Transaction.length !== 0 &&
          profile?.content.profile.Transaction.map((trans) => {
            return <ProfileTransaction></ProfileTransaction>;
          })}
      </VStack>
    </Grid>
  );
}
