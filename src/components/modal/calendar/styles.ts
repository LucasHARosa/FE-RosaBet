import styled from "styled-components";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // estilos padrão
import "react-date-range/dist/theme/default.css"; // tema padrão

export const DataContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 400px;
  width: 100%;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledDateRangePicker = styled(DateRangePicker)`
  background-color: transparent;
  width: 100%; 

  .rdrMonth,
  .rdrDateRangePickerWrapper,
  .rdrCalendarWrapper {
    background-color: transparent;
    width: 100% !important;
    border: 0px; 
  }

  /* Display header */
  .rdrDateDisplayWrapper {
    display: none;
  }

  /* Display de pre definições de datas */
  .rdrDefinedRangesWrapper {
    display: none;
  }

  /* Botao de trocar de mes */
  .rdrNextPrevButton {
    background-color: ${({ theme }) => theme.misc.modal} !important;
    border: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]} !important;
    width: 40px !important;
    height: 40px !important;
    justify-content: center;
    align-items: center;
    text-align: -webkit-center !important;
  }
  .rdrNextButton i {
    margin: 0 !important;
    border-color: #0000 #0000 #0000 ${({ theme }) => theme.text.dynamic.whiteDynamic[100]} !important;
  }

  .rdrPprevButton i {
    margin: 0 !important;
    border-color: #0000 ${({ theme }) => theme.text.dynamic.whiteDynamic[100]} #0000 #0000 !important;
  }

  /* Seletores de mes e ano */
  .rdrMonthAndYearPickers {
    border: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]};
    border-radius: 4px;
  }
  .rdrMonthAndYearPickers select {
    color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
    background-color: ${({ theme }) => theme.misc.modal};
    path {
      color: ${({ theme }) => theme.brand.secondary[100]};
    }
    
  }


  /* Dias da semana */
  .rdrWeekDay {
    text-transform: capitalize;
    color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  }

  .rdrStartEdge ~ .rdrDayNumber span {
    color: ${({ theme }) => theme.text.absolute.whiteAbsolute[100]} !important;
  }

  .rdrEndEdge ~ .rdrDayNumber span{
    color: ${({ theme }) => theme.text.absolute.whiteAbsolute[100]} !important;
  }
 
  /* Cor dos dias do mes */
  .rdrDayNumber span {
    color: ${({ theme }) => theme.brand.secondary[100]} !important;
  }

  .rdrDay span{
    color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]} !important;
  }

  /* Cor do dia atual */
  .rdrDayNumber span:after {
    background-color: ${({ theme }) => theme.brand.secondary[100]};
    color: ${({ theme }) => theme.brand.secondary[100]} !important;
  }

  /* Cor do dia selecionado in range */
  .rdrInRange {
    background-color: ${({ theme }) => theme.brand.secondary[24]};
    color: ${({ theme }) => theme.text.absolute.blackAbsolute[100]} !important;
  }
  

  /* Cor do dia selecionado */
  .rdrStartEdge,
  .rdrEndEdge {
    background-color: ${({ theme }) => theme.brand.primary[100]};
  }

  

  /* Cor dos dias que não são do mês atual */
  .rdrDayPassive span {
    color: ${({ theme }) => theme.text.dynamic.dynamicDisabled} !important;
  }

  .rdrDayDisabled {
    background-color: transparent;
    span {
      color:  ${({ theme }) => theme.text.dynamic.dynamicDisabled} !important;
      
    }
  }

`;
