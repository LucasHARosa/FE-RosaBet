"use client";
import { Guide, GuideCategory } from "@/interfaces/support";
import { useState } from "react";
import { defaultSupport } from "./defaultSupport";

export default function useSupport() {
  const [isViewDetail, setIsViewDetail] = useState<boolean>(false);
  const [selectedGuide, setSelectedGuide] = useState<Guide | undefined>();
  const [guides, setGuides] = useState<GuideCategory[]>(defaultSupport);
  const [filterGuides, setFilterGuides] = useState<GuideCategory[]>(defaultSupport);
  const [search, setSearch] = useState<string>("");

  const handleFilterGuides = (search: string) => {
    setSearch(search);

    const filteredCategories = guides
      .map((category) => {
        const filteredGuides = category.guides.filter((guide) =>
          guide.title.toLowerCase().includes(search.toLowerCase()),
        );

        return { ...category, guides: filteredGuides };
      })
      .filter((category) => category.guides.length > 0);

    setFilterGuides(filteredCategories);
  };

  const handleCloseDetails = () => {
    setIsViewDetail(false);
    setSelectedGuide(undefined);
  };

  const handleOpenDetails = (guide: Guide) => {
    setIsViewDetail(true);
    setSelectedGuide(guide);
  };

  return {
    isViewDetail,
    selectedGuide,
    setGuides,
    handleCloseDetails,
    handleOpenDetails,
    handleFilterGuides,
    filterGuides,
    search,
  };
}
