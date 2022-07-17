import React from "react";
import { RiErrorWarningFill, RiInformationFill, RiThumbUpFill } from 'react-icons/ri';
import { fixMessage } from "./helpers";
import { ColorConfig, GradientConfig, NotifyConfig } from "./types";

export const defaultColors: ColorConfig = {
  error: 'red',
  info: 'violet',
  primary: 'blue',
  secondary: 'pink',
  success: 'teal',
  warn: 'yellow'
};

export const defaultGradients: GradientConfig = {
  error: { from: 'red', to: 'pink' },
  info: { from: 'grape', to: 'violet' },
  primary: { from: 'cyan', to: 'indigo' },
  secondary: { from: 'pink', to: 'grape' },
  success: { from: 'cyan', to: 'green' },
  warn: { from: 'orange', to: 'yellow' },
};

export const defaultNotify: NotifyConfig = {
  autoClose: 5000,
  limit: 5,
  position: 'bottom-center',
  icons: {
    error: <RiErrorWarningFill />,
    info: <RiInformationFill />,
    success: <RiThumbUpFill />
  },
  messageWrappers: {
    error: (message: string) => `${fixMessage(message)} If issue persists contact support`,
    info: (message: string) => `${fixMessage(message)}`,
    loading: (message: string) => `${fixMessage(message)}`,
    success: (message: string) => `${fixMessage(message)}`,
  }
}