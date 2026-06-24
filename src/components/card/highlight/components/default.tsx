import { Item } from "../styles";

export default function DefaultHighlight({ highlight }: any) {
  return <Item img={highlight.image_link}></Item>;
}
