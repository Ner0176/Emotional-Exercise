import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { OrderType, orderLabels } from "../../interfaces/filters.interfaces";

interface IHeader {
  filter: string;
  orderDirection: OrderType;
  orderValue: number;
  changeOrder: (id: number) => void;
  changeOrderDirection: () => void;
  changeFilter: (input: string) => void;
}

const MainHeader: FC<IHeader> = (props) => {
  const handleChangeFilter = (event: any) => {
    props.changeFilter(event.target.value as string);
  };

  const handleChangeOrder = (event: any) => {
    const key = Object.keys(orderLabels).find(
      (key: any) => orderLabels[key] === event.target.value
    );
    if (!!!key) return;
    props.changeOrder(+key);
  };

  return (
    <Box className="mb-5">
      <TextField
        select
        label="Ordenar por"
        size="medium"
        margin="normal"
        value={orderLabels[props.orderValue]}
        onChange={handleChangeOrder}
        sx={{ minWidth: "230px" }}
        InputProps={{
          startAdornment: (
            <IconButton
              type="button"
              onClick={props.changeOrderDirection}
              sx={{ marginRight: "5px" }}
            >
              {props.orderDirection === "desc" ? (
                <SortIcon />
              ) : (
                <SortIcon className="transform rotate-180 scale-x-[-1]" />
              )}
            </IconButton>
          ),
        }}
      >
        {Object.entries(orderLabels).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Buscador"
        placeholder="Encuentra tu vídeo..."
        size="medium"
        margin="normal"
        color="info"
        value={props.filter}
        onChange={handleChangeFilter}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ marginLeft: "2rem" }}
      />
    </Box>
  );
};

export default MainHeader;
