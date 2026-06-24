import { Bars, Spinner, Wrapper } from "./styles";

export default function Loading() {
  return (
    <Wrapper>
      <Spinner>
        <Bars id="a"></Bars>
        <Bars id="b"></Bars>
        <Bars id="c"></Bars>
      </Spinner>
    </Wrapper>
  );
}

// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import { GroupButtons, GroupInfo, InfoSection, InfoTop, Return, Section } from "../../styles";

// export default function Loading() {
//   // Or a custom loading skeleton component
//   return (
//     <SkeletonTheme baseColor="#202020" highlightColor="#444">
//       <Section>
//         <InfoSection>
//           <InfoTop>
//             <Skeleton count={1} height={15} width={140} />
//             <Skeleton count={1} height={15} width={80} />
//           </InfoTop>
//           <GroupButtons>
//             <Skeleton count={1} height={43} width={43} borderRadius={12} />
//             <Skeleton count={1} height={43} width={43} borderRadius={12} />
//           </GroupButtons>
//         </InfoSection>
//         <Return>
//           <Skeleton count={1} height={25} width={90} />
//           <Skeleton count={1} height={15} width={120} />
//         </Return>
//         <GroupInfo>
//           <Return>
//             <Skeleton count={1} height={15} width={70} />
//             <Skeleton count={1} height={20} width={40} />
//           </Return>
//           <Return>
//             <Skeleton count={1} height={15} width={70} />
//             <Skeleton count={1} height={20} width={90} />
//           </Return>
//         </GroupInfo>
//       </Section>
//     </SkeletonTheme>
//   )
// }
