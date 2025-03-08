export interface Team {
  id: number;
  name: string;
  code?: string;
  country: string;
  founded?: number;
  logo: string;
}

export interface Venue {
  id?: number;
  name: string;
  address?: string;
  city: string;
  capacity?: number;
  surface?: string;
  image?: string;
}

export interface TeamDetail extends Team {
  venue?: Venue;
  national: boolean;
}
