import { FC } from "react";
import CardInfo from "../atoms/card-info.atom";
import { ICardData } from "../../interfaces/card-data.interfaces";
import { Pagination, Stack } from "@mui/material";

interface IContent {
  dataInfo: ICardData[];
  currentPage: number;
  numberPages: number;
  handleChangePage: (event: any, value: number) => void;
}

const MainContent: FC<IContent> = (props) => {
  return (
    <>
      {props.dataInfo.map((item) => (
        <CardInfo cardData={item} />
      ))}
      <Stack spacing={2}>
        <Pagination
          variant="text"
          shape="rounded"
          count={props.numberPages}
          page={props.currentPage}
          onChange={props.handleChangePage}
        />
      </Stack>
    </>
  );
};

export default MainContent;
