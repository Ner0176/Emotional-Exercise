import moment from "moment";
import { ICardData } from "../interfaces/card-data.interfaces";
import { OrderType } from "../interfaces/filters.interfaces";

export function handleOrderLogic(
  data: ICardData[],
  orderDirection: OrderType,
  orderOption: number
) {
  const sortingFunctions = [
    function compareDates(a: ICardData, b: ICardData) {
      const formattedA = moment(a.createdAt, "DD/MM/YYYY").toDate().getTime();
      const formattedB = moment(b.createdAt, "DD/MM/YYYY").toDate().getTime();
      return orderDirection === "asc"
        ? formattedA - formattedB
        : formattedB - formattedA;
    },
    function compareTitle(a: ICardData, b: ICardData) {
      return orderDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    },
    function compareCoincidence(a: ICardData, b: ICardData) {
      return orderDirection === "asc"
        ? a.coincidenceRate - b.coincidenceRate
        : b.coincidenceRate - a.coincidenceRate;
    },
  ];

  const sortingFunction = sortingFunctions[orderOption];
  const newData: ICardData[] = [...data];
  newData.sort(sortingFunction);

  return newData;
}