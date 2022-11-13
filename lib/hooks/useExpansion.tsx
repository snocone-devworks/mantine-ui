import React from "react";
import { useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import ThemedActionIcon from "../components/ThemedActionIcon";
import { ExpansionButtonProps, ThemeColor } from "../types";

export const useExpansion = (initialState?: 'collapsed' | 'expanded') => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useEffect(() => {
    if (hasChanged) {
      setExpanded(initialState === 'expanded');
    } else {
      setHasChanged(true);
    }
  }, [initialState]);

  const ExpandButton = (props: ExpansionButtonProps) => {
    return (
      <ThemedActionIcon
        className={props.className}
        color={props.color}
        radius={props.radius}
        size={props.size}
        style={props.style}
        tooltip={expanded ? 'Collapse' : 'Expand'}
        variant={props.variant}
        onClick={() => setExpanded(!expanded)}
      >
        {
          expanded
          ? <MdExpandLess size={props.iconSize ?? '1.2rem'} />
          : <MdExpandMore size={props.iconSize ?? '1.2rem'} />
        }
      </ThemedActionIcon>
    )
  }

  return { expanded, setExpanded, hasChanged, ExpandButton };
}