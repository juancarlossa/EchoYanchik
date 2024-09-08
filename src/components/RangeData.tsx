import { usePersonStore } from "@/lib/personStore";

export function RangeData ({
  medida,
  data,
  lowerValueMan,
  higherValueMan,
  lowerValueWoman,
  higherValueWoman,
}: {
  medida: string;
  data: number | undefined;
  lowerValueMan: number;
  higherValueMan: number;
  lowerValueWoman: number;
  higherValueWoman: number;
}) {
  const gender = usePersonStore((state) => state.gender);

  if (data === undefined || isNaN(data)) {
    return undefined; // No renderizar nada si data es undefined
  }

  const isMan = gender === "man";
  const isWoman = gender === "woman";

  if (
    (isMan && data >= lowerValueMan && data <= higherValueMan) ||
    (isWoman && data >= lowerValueWoman && data <= higherValueWoman)
  ) {
    return (
      <div className="flex flex-col">
        <h5 className="text-md font-medium text-green-600">
          {data} {medida}
        </h5>
        <h5 className="italic">
          {isMan ? `${parseFloat(lowerValueMan.toFixed(2))}-${parseFloat(higherValueMan.toFixed(2))}` : `${parseFloat(lowerValueWoman.toFixed(2))}-${parseFloat(higherValueWoman.toFixed(2))}`} {medida}
        </h5>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <h5 className="text-md font-medium text-red-600">
          {data} {medida}
        </h5>
        <h5 className="italic">
          {isMan ? `${parseFloat(lowerValueMan.toFixed(2))}-${parseFloat(higherValueMan.toFixed(2))}` : `${parseFloat(lowerValueWoman.toFixed(2))}-${parseFloat(higherValueWoman.toFixed(2))}`} {medida}
        </h5>
      </div>
    );
  }
}
