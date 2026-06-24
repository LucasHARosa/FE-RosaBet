"use client";
import { useState, useRef, useEffect } from "react";
import { Box, GroupDownload, Header, Line, PDF, Year, Content, Row, GroupRow } from "./styles";
import Text from "@/components/common/text";
import { BiSolidFilePdf } from "react-icons/bi";
import { PDFExport } from "@progress/kendo-react-pdf";
import MessageError from "@/components/messageError";
import { ReportIncomeI } from "@/interfaces/client";
import { reportIncome } from "@/service/client";
import Loading from "./loading";
import notifyPopup from "@/utils/toast";

export default function Income() {
  const pdfExportComponent = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [yearActive, setYearActive] = useState<number>(new Date().getFullYear());
  const [income, setIncome] = useState<ReportIncomeI>({
    data: [],
    total: {
      totalBets: 0,
      totalGain: 0,
      totalPrize: 0,
      totalStaked: 0,
    },
    dataDetailed: [],
  } as ReportIncomeI);

  const currentYear = new Date().getFullYear();
  const lastFiveYears = [];
  for (let i = 0; i < 5; i++) {
    lastFiveYears.push(currentYear - i);
  }
  const handleIncome = async (year: number) => {
    setLoading(true);
    setYearActive(year);

    try {
      const response = await reportIncome(year);
      setIncome(response);
    } catch (err: any) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  const total = [
    {
      label: "Apostas",
      value: income.total.totalBets || 0,
    },
    {
      label: "Apostado(R$)",
      value: income.total.totalStaked || 0,
    },
    {
      label: "Prêmio(R$)",
      value: income.total.totalPrize || 0,
    },
    {
      label: "Ganho(R$)",
      value: income.total.totalGain || 0,
    },
  ];

  const downloadPDF = () => {
    notifyPopup("Download do PDF iniciado", "success");
    pdfExportComponent?.current.save();
  };

  useEffect(() => {
    handleIncome(currentYear);
  }, []);

  return (
    <Box>
      <PDFExport ref={pdfExportComponent} paperSize="A4" margin="1cm" keywords="" scale={0.8}>
        <Header>
          <Line>
            <Text htmlTag="h1" font="heading/m/bold">
              Informe de Rendimentos
            </Text>
            <GroupDownload>
              {/* <PDF onClick={() => { }}>CSV <IoDocumentText size={18} /></PDF> */}
              <PDF onClick={downloadPDF}>
                PDF <BiSolidFilePdf color="brand.secondary.100" size={18} />
              </PDF>
            </GroupDownload>
          </Line>
          <Line>
            {lastFiveYears.map((year, id) => (
              <Year key={id} active={year === yearActive} onClick={() => handleIncome(year)}>
                {year}
              </Year>
            ))}
          </Line>
        </Header>
        {loading ? (
          <Loading />
        ) : (
          <Content>
            {currentYear === yearActive && (
              <MessageError
                type="ALERT"
                message="O ano selecionado é o atual, os dados podem alterar caso haja movimentação na conta."
              />
            )}
            <GroupRow>
              <Text htmlTag="h2" font="heading/s/bold">
                TOTAL
              </Text>
              {total.map((item, id) => (
                <Row key={id} isEven={id % 2 !== 0}>
                  <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
                    {item.label}
                  </Text>
                  <Text htmlTag="h3" font="label/body/m/bold">
                    {item.value}
                  </Text>
                </Row>
              ))}
            </GroupRow>

            {income.data.map((item, id) => (
              <GroupRow key={id}>
                <Text htmlTag="h2" font="label/body/m/regular">
                  Mês {item.month}
                </Text>
                <Row>
                  <Text htmlTag="small" font="label/body/m/bold" color="text.dynamic.whiteDynamic.80">
                    Apostas
                  </Text>
                  <Text htmlTag="h3" font="label/body/m/bold">
                    {item.totalBets}
                  </Text>
                </Row>
                <Row isEven>
                  <Text htmlTag="small" font="label/body/m/bold" color="text.dynamic.whiteDynamic.80">
                    Apostado(R$)
                  </Text>
                  <Text htmlTag="h3" font="label/body/m/bold">
                    {item.totalStaked.toFixed(2)}
                  </Text>
                </Row>
                <Row>
                  <Text htmlTag="small" font="label/body/m/bold" color="text.dynamic.whiteDynamic.80">
                    Prêmio(R$)
                  </Text>
                  <Text htmlTag="h3" font="label/body/m/bold">
                    {item.totalPrize.toFixed(2)}
                  </Text>
                </Row>
                <Row isEven>
                  <Text htmlTag="small" font="label/body/m/bold" color="text.dynamic.whiteDynamic.80">
                    Ganho(R$)
                  </Text>
                  <Text htmlTag="h3" font="label/body/m/bold">
                    {item.totalGain.toFixed(2)}
                  </Text>
                </Row>
              </GroupRow>
            ))}
          </Content>
        )}
      </PDFExport>
    </Box>
  );
}
