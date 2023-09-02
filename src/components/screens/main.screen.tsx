import { Box } from "@mui/material";
import MainHeader from "../molecules/main-header.molecule";
import MainContent from "../molecules/main-content.molecule";
import { useCallback, useEffect, useState, useMemo } from "react";
import cardData from "../../assets/data";
import { OrderType } from "../../interfaces/filters.interfaces";
import { handleOrderLogic } from "../../assets/functions";

const MainScreen = () => {
  const [filter, setFilter] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState<OrderType>("desc");
  const [orderOption, setOrderOption] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const numberItems = 3;

  const filteredData = useMemo(() => {
    let filteredDataCopy = cardData;
    if (!!filter) {
      filteredDataCopy = cardData.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return handleOrderLogic(filteredDataCopy, orderDirection, orderOption);
  }, [filter, orderOption, orderDirection]);

  const getNumberPages = (items: number) => {
    const numberOfPages =
      items % numberItems === 0
        ? items / numberItems
        : Math.floor(items / numberItems) + 1;
    return numberOfPages;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, orderOption, orderDirection]);

  const changePage = (event: any, value: number) => {
    if (value >= 1 && value <= getNumberPages(filteredData.length)) {
      setCurrentPage(value);
    }
  };

  const changeOrderOption = useCallback((id: number) => {
    setOrderOption(id);
  }, []);

  const changeOrderDirection = useCallback(() => {
    setOrderDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  }, []);

  const changeFilter = useCallback((input: string) => {
    setFilter(input);
  }, []);

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
        dataInfo={filteredData.slice(
          (currentPage - 1) * numberItems,
          currentPage * numberItems
        )}
        currentPage={currentPage}
        numberPages={getNumberPages(filteredData.length)}
        handleChangePage={changePage}
      />
    </Box>
  );
};

export default MainScreen;
