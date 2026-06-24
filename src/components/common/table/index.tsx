import { IoList } from "react-icons/io5";
import { Empty, Pagination, TableBox, Tbody, Td, Th, Thead, Tr } from "./styles";
import Text from "../text";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function Table({
  header,
  data,
  handleClick,
  handlePage,
  isNextPage,
  resetPage,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handle = (item: any) => {
    if (handleClick) {
      handleClick(item);
    }
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    if (handlePage) {
      handlePage(page);
    }
  };

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
    }
  }, [resetPage]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [data]);

  return (
    <>
      {data.length === 0 ? (
        <Empty>
          <IoList size={82} color="text.dynamic.whiteDynamic.40" />
          <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.40">
            Nenhum registro encontrado
          </Text>
        </Empty>
      ) : (
        <TableBox>
          <Thead>
            <tr>
              {header.map((item, index) => (
                <Th key={`th-${index}`}>{item}</Th>
              ))}
            </tr>
          </Thead>
          <Tbody>
            {data.map((extract, id) => {
              return (
                <Tr key={`tr-${id}`} isClick={!!handleClick}>
                  {extract.items.map((item, index) => (
                    <Td key={`td-${index}`} onClick={() => handle(extract._id)}>
                      {item}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </TableBox>
      )}
      {currentPage && handlePage && (
        <Pagination>
          <Button.Root
            bg="brand.secondary.24"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Button.Icon icon={MdKeyboardArrowLeft} size={22} color="brand.secondary.100" />
          </Button.Root>
          <Text font="label/body/m/regular">{currentPage}</Text>
          <Button.Root
            bg="brand.secondary.24"
            onClick={() => changePage(currentPage + 1)}
            disabled={!isNextPage || data.length === 0}
          >
            <Button.Icon icon={MdKeyboardArrowRight} size={22} color="brand.secondary.100" />
          </Button.Root>
        </Pagination>
      )}
    </>
  );
}

interface TableProps {
  header: string[];
  data: {
    _id: string;
    items: (string | number)[];
  }[];
  handleClick?: (id: string) => void;
  isNextPage?: boolean;
  handlePage?: (page: number) => void;
  resetPage?: boolean;
}
