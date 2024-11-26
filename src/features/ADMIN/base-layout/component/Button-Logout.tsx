import { Button } from "@chakra-ui/react";
import { LOGOUT } from "../../../../stores/auth/slice";
import { useAppDispatch } from "../../../../stores/stores";
import { useNavigate } from "react-router-dom";

export default function ButtonLogout(): React.ReactNode {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function LogOut() {
    alert("Logged out,please login again");
    dispatch(LOGOUT());
    navigate("/login");
  }

  return (
    <Button bg={"transparent"} _hover={{ bg: "transparent" }} padding="0px" w={"full"} onClick={LogOut} justifyContent={"start"}>
      Logout
    </Button>
  );
}
