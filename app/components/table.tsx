import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

type Item = {
  date: string,
  eat: string,
  dayOfHour: string,
};

type Props = {
  data: Item[];
};


  export default function MyTable({ data }: Props) {
    return (
        <>
        <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>何日</Th>
        <Th>なにを食べたか</Th>
        <Th>何時</Th>
      </Tr>
    </Thead>
    <Tbody>
        {
            data.map((item) => {
                return (
                    <>
                        <Tr>
                            <Td>{item.date}</Td>
                            <Td>{item.eat}</Td>
                            <Td>{item.dayOfHour}</Td>
                        </Tr>
                    </>
                );
            })
        }
    </Tbody>
  </Table>
</TableContainer>
        </>
    );
  }