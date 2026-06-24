import Text from "../text";
import { Box, Label } from "./styles";

export default function Radio({
  check,
  handleCheck,
  value,
  title,
  description,
  ...rest
}: CheckBoxProps) {
  return (
    <Label>
      <input
        type="radio"
        id="radio"
        value={value}
        onChange={handleCheck}
        checked={check}
        {...rest}
      />
      <Box>
        <Text font="paragraph/m/bold" htmlTag="strong">
          {title}
        </Text>
        {description && (
          <Text font="label/body/xs/regular" htmlTag="small" color="text.dynamic.whiteDynamic.64">
            {description}
          </Text>
        )}
      </Box>
    </Label>
  );
}

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  check: boolean;
  title: string;
  description?: string;
}
