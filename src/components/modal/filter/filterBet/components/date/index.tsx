import Text from "@/components/common/text";
import { DateLabel, GroupDate } from "./styles";
import { GroupInput } from "../../styles";
import ModalCalendar from "@/components/modal/calendar";
import { Range } from "react-date-range";

export default function DateFilter({ modalRefCalendar, ranges, handleSelect }: DateFilterProps) {
  return (
    <GroupInput>
      <Text htmlTag="h1" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
        DATA
      </Text>
      <GroupDate onClick={() => modalRefCalendar.current.openModal()}>
        <DateLabel>
          <Text htmlTag="h2" font="label/body/m/regular">
            {ranges.startDate ? ranges.startDate.toLocaleDateString("pt-br") : "Data início"}
          </Text>
        </DateLabel>
        <DateLabel>
          <Text htmlTag="h2" font="label/body/m/regular">
            {ranges.endDate ? ranges.endDate.toLocaleDateString("pt-br") : "Data final"}
          </Text>
        </DateLabel>
      </GroupDate>

      <ModalCalendar ref={modalRefCalendar} ranges={ranges} handleSelect={handleSelect} />
    </GroupInput>
  );
}

interface DateFilterProps {
  modalRefCalendar: any;
  ranges: Range;
  handleSelect: React.Dispatch<React.SetStateAction<Range>>;
}
