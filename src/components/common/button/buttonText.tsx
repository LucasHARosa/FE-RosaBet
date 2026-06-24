interface ButtonIconProps {
  text: string;
}

export default function ButtonText({ text, ...rest }: ButtonIconProps) {
  return <small {...rest}>{text}</small>;
}
