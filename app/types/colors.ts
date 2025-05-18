export interface CoordinatingColors {
  coord1ColorId: string;
  coord2ColorId: string;
  whiteColorId?: string;
}

export interface PaintColor {
  // Only type the fields we use
  name: string;
  hex: string;
  rgb?: [number, number, number];
  // Allow any other properties to exist without typing them
  [key: string]: any;
}

export interface ColorMatch {
  name: string;
  hex: string;
  distance: number;
}
