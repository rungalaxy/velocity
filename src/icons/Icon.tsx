import * as React from "react";
import {
  HugeiconsIcon,
  type HugeiconsIconProps,
  type IconSvgElement,
} from "@hugeicons/react";

export type VelocityIconProps = Omit<HugeiconsIconProps, "icon"> & {
  icon: IconSvgElement;
};

export type VelocityNamedIconProps = Omit<VelocityIconProps, "icon">;

const DEFAULT_STROKE_WIDTH = 2;

export function Icon({
  icon,
  className,
  color = "currentColor",
  strokeWidth = DEFAULT_STROKE_WIDTH,
  ...props
}: VelocityIconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      className={className}
      color={color}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}

export function createIcon(icon: IconSvgElement, displayName: string) {
  function Component(props: VelocityNamedIconProps) {
    return <Icon icon={icon} {...props} />;
  }
  Component.displayName = displayName;
  return Component;
}
