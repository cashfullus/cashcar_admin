import React from "react";
// import Filter from "components/filter/Filter";
// import { Spacer } from "components/common/Header";
import MainTemplate from "templates/MainTemplate";
// import { FilterItem, Option } from "types/common";
// import AccordionList from "components/list/AccordionList";
// import Pagination, { ITEM_COUNT_10 } from "components/common/Pagination";
// import usePagination from "hooks/usePagination";
// import { RootState } from "lib/modules";
// import { useSelector } from "react-redux";
// import useToggleDriving from "hooks/useToggleDriving";

// const CERTIFIED_APPLIED_AT_COLUMN = "5.75rem";
// const CERTIFIED_PERIOD_COLUMN = "5.75rem";
// const CERTIFIED_TITLE_COLUMN = "1fr";
// const CERTIFIED_MISSION_NAME_COLUMN = "1fr";
// const CERTIFIED_NAME_COLUMN = "4.5rem";
// const CERTIFIED_CONTACT_COLUMN = "6.5rem";
// const CERTIFIED_STATUS_COLUMN = "2.5rem";
// const CERTIFIED_MORE_COLUMN = "max-content";

// const options: Option[] = [
//   { label: "전체", value: 0 },
//   { label: "광고명", value: 1 },
//   { label: "미션명", value: 2 },
//   { label: "본명", value: 3 },
//   { label: "연락처", value: 4 },
// ];

// const filterItems: FilterItem[] = [
//   {
//     name: "status",
//     label: "상태",
//     filters: [
//       { label: "승인", value: "0" },
//       { label: "대기", value: "1" },
//       { label: "실패", value: "2" },
//     ],
//   },
// ];

const DrivingMissionPage = () => {
  // const driving = useSelector((state: RootState) => state.driving.allDriving);
  // const selectedDriving = useSelector(
  //   (state: RootState) => state.driving.selectedDriving
  // );
  // const {
  //   toggleDriving,
  //   selectAllDriving,
  //   deselectAllDriving,
  // } = useToggleDriving();
  // const [itemCount, setItemCount] = useState(ITEM_COUNT_10);
  // const totalPage = Math.ceil(driving.length / itemCount);
  // const { defaultPage, currentPage, onPageChange } = usePagination(totalPage);
  return (
    <MainTemplate>
      {/* <Spacer />
      <Filter filterItems={filterItems} options={options} target="driving" />
      <AccordionList
        onCheckboxClick={toggleDriving}
        selected={selectedDriving}
        headerChecked={
          selectedDriving.length === itemCount ||
          selectedDriving.length === driving.length
        }
        onHeaderCheckboxClick={() => {
          if (
            selectedDriving.length === itemCount ||
            selectedDriving.length === driving.length
          ) {
            deselectAllDriving();
          } else {
            selectAllDriving(currentPage, itemCount);
          }
        }}
        headerItems={[
          {
            label: "신청일",
            key: "appliedAt",
            column: CERTIFIED_APPLIED_AT_COLUMN,
          },
          {
            label: "인증기한",
            key: "certifiedPeriod",
            column: CERTIFIED_PERIOD_COLUMN,
          },
          {
            label: "광고명",
            key: "title",
            column: CERTIFIED_TITLE_COLUMN,
          },
          {
            label: "미션명",
            key: "missionName",
            column: CERTIFIED_MISSION_NAME_COLUMN,
            truncate: true,
          },
          {
            label: "본명",
            key: "name",
            column: CERTIFIED_NAME_COLUMN,
            truncate: true,
          },
          {
            label: "연락처",
            key: "contact",
            column: CERTIFIED_CONTACT_COLUMN,
          },
          { label: "상태", key: "status", column: CERTIFIED_STATUS_COLUMN },
          { label: "더보기", key: "", column: CERTIFIED_MORE_COLUMN },
        ]}
        items={driving.slice(
          (currentPage - 1) * itemCount,
          currentPage * itemCount
        )}
      />
      <Pagination
        defaultPage={defaultPage}
        totalPage={totalPage}
        onPageChange={onPageChange}
        onItemCountChange={option => setItemCount(+option)}
      /> */}
    </MainTemplate>
  );
};

export default DrivingMissionPage;
