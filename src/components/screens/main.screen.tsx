import { Box } from "@mui/material";
import MainHeader from "../molecules/main-header.molecule";
import MainContent from "../molecules/main-content.molecule";
import { useEffect, useState } from "react";
import { ICardData } from "../../interfaces/card-data.interfaces";
import cardData from "../../assets/data";
import { OrderType } from "../../interfaces/filters.interfaces";
import moment from "moment";

const MainScreen = () => {
  const [filter, setFilter] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState<OrderType>("desc");
  const [orderOption, setOrderOption] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<ICardData[]>([]);
  const [slicedData, setSlicedData] = useState<ICardData[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [numberPages, setNumberPages] = useState<number>(0);
  const numberItems = 3;

  useEffect(() => {
    let filteredDataCopy = cardData;
    if (!!filter) {
      filteredDataCopy = cardData.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const orderedData = handleOrderLogic(filteredDataCopy);

    setFilteredData(orderedData);
    setSlicedData(orderedData.slice(0, numberItems));
    setNumberPages(getNumberPages(orderedData.length));
    setCurrentPage(1);
  }, [filter, orderOption, orderDirection]);

  const handleOrderLogic = (data: ICardData[]) => {
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
  };

  const getNumberPages = (items: number) => {
    const numberOfPages =
      items % numberItems === 0
        ? items / numberItems
        : Math.floor(items / numberItems) + 1;
    return numberOfPages;
  };

  const changePage = (event: any, value: number) => {
    const from = (value - 1) * numberItems;
    const to = from + numberItems;
    const newData = filteredData.slice(from, to);
    setSlicedData(newData);
    setCurrentPage(value);
  };

  const changeOrderOption = (id: number) => {
    setOrderOption(id);
  };

  const changeOrderDirection = () => {
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  const changeFilter = (input: string) => {
    setFilter(input);
  };

  return (
    <Box className="flex flex-1 items-center flex-col p-5 h-screen">
      <MainHeader
        filter={filter}
        orderDirection={orderDirection}
        orderValue={orderOption}
        changeOrder={changeOrderOption}
        changeOrderDirection={changeOrderDirection}
        changeFilter={changeFilter}
      />
      <MainContent
        dataInfo={slicedData}
        currentPage={currentPage}
        numberPages={numberPages}
        handleChangePage={changePage}
      />
    </Box>
  );
};

export default MainScreen;
