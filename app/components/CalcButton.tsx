import { Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isCalculateDone: boolean;
  setIsCalculateDone: Dispatch<SetStateAction<boolean>>;
};

export default function DateOfItems({
  isCalculateDone,
  setIsCalculateDone,
}: Props) {
  return (
    <>
      <Button
        width={"60%"}
        margin={"15px 20%"}
        onClick={() => setIsCalculateDone(!isCalculateDone)}
      >
        計算
      </Button>
    </>
  );
}
