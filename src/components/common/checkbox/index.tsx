import Text from "../text";
import { Box, Label } from "./styles";

export default function CheckBox({
  check,
  handleCheck,
  title,
  description,
  ...rest
}: CheckBoxProps) {
  return (
    <Label>
      <input type="checkbox" id="check" onChange={handleCheck} checked={check} {...rest} />
      <Box>
        <Text font="paragraph/m/bold" htmlTag="strong">
          {title}
        </Text>
        {description && (
          <Text font="label/body/xs/regular" htmlTag="small" color="text.dynamic.whiteDynamic.40">
            {description}
          </Text>
        )}
      </Box>
    </Label>
  );
}

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleCheck: () => void;
  check: boolean;
  title: string;
  description?: string;
}
