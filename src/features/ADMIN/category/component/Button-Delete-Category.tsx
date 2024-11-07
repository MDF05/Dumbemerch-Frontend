import { Box, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../stores/stores";
import { DeleteCategoryAsync } from "../../../../stores/category/async-category";

export default function ButtonDeleteCategory({ id }: { id: number | undefined }): React.ReactNode {
  const { handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  function onDeleteCategory() {
    {
      const confirmDelete = confirm("Are you sure you want to delete this data");
      const res = id && confirmDelete && dispatch(DeleteCategoryAsync({ id }));
    }
  }
  return (
    <Box as="form" onSubmit={handleSubmit(() => onDeleteCategory())}>
      <Button bg={"brand.danger"} padding={"10px 30px"} borderRadius={"5px"} type="submit">
        Delete
      </Button>
    </Box>
  );
}
