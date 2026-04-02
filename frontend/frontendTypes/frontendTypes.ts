import type React from "react";
import { Application } from "../../sharedTypes/sharedTypes";

export type LocationOption = {
  label: string;
  city: string;
  latitude: number;
  longitude: number;
};

export type GeoapifyFeature = {
  bbox: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    formatted: string;
    city?: string;
    name?: string;
    lat: number;
    lon: number;
    country?: string;
  };
  type: string;
};

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

export type MyApplicationCardProps = {
  data: Application;
  onDelete: (id: string) => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

export type AuthSkelletonProps = {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  loading?: boolean;
  children?: React.ReactNode;
};

export type LogInProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  data: any;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};
