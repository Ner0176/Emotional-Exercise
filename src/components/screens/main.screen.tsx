import { Box } from "@mui/material";
import MainHeader from "../molecules/main-header.molecule";
import MainContent from "../molecules/main-content.molecule";


const MainScreen = () => {
    return(
        <Box className="flex flex-1 border border-red">
            <MainHeader />
            <MainContent />
        </Box>
    )
}

export default MainScreen;