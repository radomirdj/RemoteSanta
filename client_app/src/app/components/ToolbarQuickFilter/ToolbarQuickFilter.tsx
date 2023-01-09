import { Box } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

const ToolbarQuickFilter = () => {
  return (
    <Box
      sx={{
        p: 2,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
};

export default ToolbarQuickFilter;
