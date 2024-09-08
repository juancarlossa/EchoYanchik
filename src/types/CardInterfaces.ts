export interface BsavaluesType {
  male: {
    normalRange: {
      lowerValue: number;
      higherValue: number;
    };
  };
  female: {
    normalRange: {
      lowerValue: number;
      higherValue: number;
    };
  };
}

export interface DataType {
  bsa?: boolean;
  bsavalues?: BsavaluesType;
  [key: string]: any;
}