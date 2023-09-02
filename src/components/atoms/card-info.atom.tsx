import { Box } from "@mui/system";
import { FC } from "react";
import { ICardData } from "../../interfaces/card-data.interfaces";
import { Chip } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

interface ICard {
  cardData: ICardData;
}

const CardInfo: FC<ICard> = ({ cardData }) => {
  return (
    <Box className="w-1/3 h-36 mb-6 flex flex-row rounded-3xl overflow-hidden border-2 drop-shadow-sm">
      <Box
        component="img"
        src={cardData.image}
        className="w-1/3 h-full object-cover"
      />
      <Box className="w-2/3 h-full flex-1 m-3">
        <div className="font-bold text-center text-md underline underline-offset-4">
          {cardData.title}
        </div>
        <Box className="my-4 flex justify-center">
          <Chip
            label={cardData.type}
            size="small"
            sx={{
              backgroundColor: "#FDF2F2",
              color: "#DF5958",
            }}
          />
        </Box>
        <Box className="mt-2 flex justify-center">
          <Chip
            label={`${Math.floor(
              cardData.coincidenceRate * 100
            )}% de coincidencia`}
            size="small"
            sx={{
              marginRight: "0.5rem",
              backgroundColor: "#EEFDF3",
              color: "#117B34",
            }}
          />
          <Chip
            icon={
              cardData.ratingRate >= 0.5 ? (
                <ThumbUpOffAltIcon />
              ) : (
                <ThumbDownOffAltIcon />
              )
            }
            label={`${Math.floor(cardData.ratingRate * 100)}%`}
            size="small"
            sx={{ backgroundColor: "#FDFFCC", color: "#6C7000" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CardInfo;
