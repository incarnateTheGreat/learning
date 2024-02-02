"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "learning/@/components/ui/Input/Input";
import { PredictionDataResponse } from "learning/app/lib/types";

import PlayerSearchResults from "./PlayerSearchResults";

type PlayerSearchInputProps = {
  data: PredictionDataResponse[];
};

const PlayerSearchInput = ({ data }: PlayerSearchInputProps) => {
  const [searchResults, setSearchResults] = useState<PredictionDataResponse[]>(
    [],
  );
  const inputRef = useRef(null);

  const listNavigation = (e: KeyboardEvent) => {
    const searchResults = document.getElementById("searchResults")?.children;

    switch (e.key) {
      case "Escape":
        setSearchResults([]);
        inputRef.current.value = "";

        e.preventDefault();

        break;
      case "ArrowUp": {
        const previousElem = document.activeElement
          .previousSibling as HTMLElement;

        if (!previousElem) {
          inputRef.current.focus();
        } else {
          previousElem.focus();
        }

        e.preventDefault();

        break;
      }
      case "ArrowDown":
        if (document.activeElement.tagName !== "BUTTON") {
          const nextelem = searchResults[0] as HTMLElement;

          nextelem.focus();
        } else {
          const nextElem = document.activeElement.nextSibling as HTMLElement;

          if (nextElem) {
            nextElem.focus();
          }
        }

        e.preventDefault();

        break;
      default:
        return;
    }
  };

  const closeSearchResults = (e: MouseEvent) => {
    const container = document.getElementById("searchResults");
    const target = e.target as HTMLElement;

    if (!container?.contains(target)) {
      setSearchResults([]);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", listNavigation);
    document.addEventListener("mouseup", closeSearchResults);

    return () => {
      document.removeEventListener("keydown", listNavigation);
      document.removeEventListener("mouseup", closeSearchResults);
    };
  }, []);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Search for Player"
        className="mb-2"
        onChange={(e) => {
          const res = data.filter((elem) => {
            return elem.searchTerm
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });

          setSearchResults(res);
        }}
      />
      {searchResults.length > 0 ? (
        <PlayerSearchResults data={searchResults} />
      ) : null}
    </div>
  );
};

export default PlayerSearchInput;
