import { useContext, useEffect, useState } from "react";
import { Box, Card, Info} from "./styles";
import Text from "@/components/common/text";
import { StorageContext } from "@/contexts/StorageContext";
import Icon from "@/utils/icon";

export default function FilterSummary({ handleSearch }: FilterSummaryProps) {
  const [archivedFilters, setArchivedFilters] = useState([]);
  const { getStorage, setStorage } = useContext(StorageContext);

  useEffect(() => {
    const filters = getStorage("filters");
    if (filters) {
      const items = filters.slice(0, 5);
      setArchivedFilters(items);
      setStorage("filters", JSON.stringify(items));
    }
  }, []);

  const fillSearch = (filter: string) => {
    handleSearch(filter);
  };

  return (
    
    <Box>
      {archivedFilters.map((filter, id) => (
        <Card key={`archived-${id}`} onClick={() => fillSearch(filter)}>
          <Info>
            <Icon name="history" size={20} color="text.dynamic.whiteDynamic.64" /> 
            <Text htmlTag="small" font="label/button/s/bold">
              {filter}
            </Text>
          </Info>
          <Icon name="arrowUpLeft" size={20} color="text.dynamic.whiteDynamic.64" />
        </Card>
      ))}
    </Box>
    
  );
}

interface FilterSummaryProps {
  handleSearch: React.Dispatch<React.SetStateAction<string>>;
}
