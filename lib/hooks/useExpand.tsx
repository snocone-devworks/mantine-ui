import { MantineNumberSize, ThemeIconVariant } from "@mantine/core";
import React from "react";
import { useEffect, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import ThemedActionIcon from "../components/ThemedActionIcon";
import { ThemeColor } from "../theme/types"

export type ExpandButtonProps = {
  color?: ThemeColor;
  iconSize?: number | string;
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  variant?: ThemeIconVariant;
}

export const useExpand = (initialState?: boolean, color?: ThemeColor) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useEffect(() => {
    if (hasChanged){
      setExpanded(initialState === false ? false : true);
    } else {
      setHasChanged(true);
    }
  }, [initialState])

  const ExpandButton = ({ color, iconSize, radius, size, variant }: ExpandButtonProps) => {
    return (
      <ThemedActionIcon
        color={color ?? 'primary'}
        radius={radius ?? 'md'}
        size={size ?? 'md'}
        tooltip={expanded ? 'Collapse' : 'Expand'}
        variant={variant ?? 'filled'}
        onClick={() => setExpanded(!expanded)}
      >
        <>
        {expanded && (
          <RiArrowUpSFill style={{height: iconSize ?? '1.2rem', width: iconSize ?? '1.2rem'}} />
        )}
        {!expanded && (
          <RiArrowDownSFill style={{height: iconSize ?? '1.2rem', width: iconSize ?? '1.2rem'}} />
        )}
        </>
      </ThemedActionIcon>
    )
  }

  return { expanded, setExpanded, hasChanged, ExpandButton };
}